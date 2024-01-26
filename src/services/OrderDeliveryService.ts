import { Messages } from '../global'
import SqsService from './SqsService'
import { OrderDeliveryMap } from '../mappers'
import CarrierService, { CarrierNotificationData } from './CarrierService'
import { CustomError } from '../tools/customError'
import { OrderDeliveryRepo } from '../repositories'
import { NO_CONTENT, NOT_FOUND, OK } from 'http-status'
import { OrderDeliveryCreateReqDTO, OrderDeliveryResDTO, OrderDeliveryUpdateReqDTO } from '../dtos/OrderDeliveryDTO'
import StoreService from './StoreService'

class OrderDeliveryService {
  async create(reqBody: OrderDeliveryCreateReqDTO, token: string): Promise<number> {
    let orderDelivery = await OrderDeliveryRepo.findOneByIds(
      undefined,
      reqBody.idCarrier,
      reqBody.idStore,
      reqBody.idOrder
    )

    if (!orderDelivery) {
      const orderDeliveryDomain = OrderDeliveryMap.toDomain(reqBody)
      orderDelivery = await OrderDeliveryRepo.save(orderDeliveryDomain)
    }

    const orderDeliveryDataForCarrier = OrderDeliveryMap.toDTO(orderDelivery)
    this.notifyCarrier(reqBody.idCarrier, orderDeliveryDataForCarrier, token)

    return <number>orderDelivery.idOrderDelivery
  }

  async findAllByCarrier(idCarrier: string, page?: number, size?: number): Promise<OrderDeliveryResDTO[] | []> {
    const count = await OrderDeliveryRepo.countByCarrier(idCarrier)
    const pagination = this.paginate(count, page, size)
    const orderDeliveries = await OrderDeliveryRepo.findAllByCarrier(idCarrier, pagination.offset, pagination.limit)

    return orderDeliveries.map((orderDelivery) => OrderDeliveryMap.toDTO(orderDelivery))
  }

  async destroy(idOrderDelivery: number): Promise<number> {
    const orderDeliveryToDelete = await OrderDeliveryRepo.findOneByIds(idOrderDelivery)
    if (!orderDeliveryToDelete) throw new CustomError(Messages.notFound, NOT_FOUND)
    await OrderDeliveryRepo.delete(orderDeliveryToDelete)

    return NO_CONTENT
  }

  async getOne(idOrderDelivery: number): Promise<OrderDeliveryResDTO> {
    const orderDelivery = await OrderDeliveryRepo.findOneByIds(idOrderDelivery)
    if (!orderDelivery) throw new CustomError(Messages.notFound, NOT_FOUND)

    return OrderDeliveryMap.toDTO(orderDelivery)
  }

  async update(idOrderDelivery: number, reqBody: OrderDeliveryUpdateReqDTO, token: string): Promise<number> {
    const orderDeliveryDomain = await OrderDeliveryRepo.findOneByIds(idOrderDelivery)

    if (!orderDeliveryDomain) throw new CustomError(Messages.notFound, NOT_FOUND)

    orderDeliveryDomain.updateOrderData(reqBody.status, reqBody.trackingCode, reqBody.trackingLink)
    await OrderDeliveryRepo.update(orderDeliveryDomain)

    if (!hasCarrierScope) {
      const orderDeliveryDataForCarrier = OrderDeliveryMap.toDTO(orderDeliveryDomain)
      this.notifyCarrier(orderDeliveryDomain.idCarrier, orderDeliveryDataForCarrier, token)
    } else {
      const orderDeliveryDataForStore = OrderDeliveryMap.toStoreUpdateDTO(orderDeliveryDomain)
      StoreService.updateOrder(
        orderDeliveryDomain.idOrder,
        orderDeliveryDomain.idStore,
        orderDeliveryDataForStore,
        token
      )
    }

    return OK
  }

  notifyCarrier(idCarrier: string, orderData: OrderDeliveryResDTO, token: string) {
    CarrierService.getCarrier(idCarrier, token).then((carrierNotificationData: null | CarrierNotificationData) => {
      if (carrierNotificationData) {
        const notification = {
          order: JSON.stringify(orderData),
          carrierEndpoint: carrierNotificationData.order_status_endpoint,
          headers: carrierNotificationData.headers_auth,
        }
        SqsService.sendNotification(notification)
      }
    })
  }

  paginate(count: number, page?: number, size?: number) {
    const pageNumber = page || 1
    const pageSizeNumber = size || count
    const offset = (pageNumber - 1) * pageSizeNumber
    const limit = pageSizeNumber
    return {
      offset,
      limit,
    }
  }
}

export default new OrderDeliveryService()
