import { Repository } from './Repository'
import { toBinaryUUID } from 'binary-uuid'
import { OrderDeliveryMap } from '../mappers'
import OrderDelivery from '../models/OrderDelivery'
import OrderDeliveryDomain from '../domains/OrderDeliveryDomain'
import { Models } from '../models'

export interface IOrderDeliveryRepository extends Repository<OrderDeliveryDomain> {
  findOneByIds(
    idOrderDelivery?: number,
    idCarrier?: string,
    idStore?: string,
    idOrder?: number
  ): Promise<OrderDeliveryDomain | null>
}

export class OrderDeliveryRepository implements IOrderDeliveryRepository {
  private models: typeof Models

  constructor(models: typeof Models) {
    this.models = models
  }

  public async findOneByIds(
    idOrderDelivery?: number,
    idCarrier?: string,
    idStore?: string,
    idOrder?: number
  ): Promise<OrderDeliveryDomain | null> {
    const query = {
      where: {
        ...(idCarrier && { idCarrier }),
        ...(idStore && { idStore: toBinaryUUID(idStore) }),
        ...(idOrder && { idOrder }),
        ...(idOrderDelivery && { idOrderDelivery }),
      },
    }
    const orderDelivery = await OrderDelivery.findOne(query)

    return orderDelivery ? OrderDeliveryMap.toDomain(orderDelivery) : null
  }

  public async findAllByCarrier(idCarrier: string, offset: number, limit: number): Promise<OrderDeliveryDomain[] | []> {
    const orderDeliveries = await OrderDelivery.findAll({
      where: {
        idCarrier,
      },
      offset,
      limit,
    })

    return orderDeliveries.map((orderDelivery) => OrderDeliveryMap.toDomain(orderDelivery))
  }

  public async countByCarrier(idCarrier: string) {
    const count = await OrderDelivery.count({
      where: {
        idCarrier,
      },
    })
    return count
  }

  public async save(orderDelivery: OrderDeliveryDomain): Promise<OrderDeliveryDomain> {
    const rawOrderDelivery = OrderDeliveryMap.toPersistence(orderDelivery)
    const newOrderDelivery = await this.models.OrderDelivery.create({ ...rawOrderDelivery })

    return OrderDeliveryDomain.create({ ...orderDelivery, idOrderDelivery: newOrderDelivery.idOrderDelivery })
  }

  public async update(orderDelivery: OrderDeliveryDomain): Promise<OrderDeliveryDomain> {
    const rawOrderDelivery = OrderDeliveryMap.toUpdate(orderDelivery)
    await this.models.OrderDelivery.update(
      { ...rawOrderDelivery },
      { where: { idOrderDelivery: orderDelivery.idOrderDelivery } }
    )

    return orderDelivery
  }

  public delete(orderDelivery: OrderDeliveryDomain): Promise<number> {
    return this.models.OrderDelivery.destroy({ where: { idOrderDelivery: orderDelivery.idOrderDelivery } })
  }
}
