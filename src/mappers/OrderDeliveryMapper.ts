import { Mapper } from './Mapper'
import OrderDelivery from '../models/OrderDelivery'
import { fromBinaryUUID, toBinaryUUID } from 'binary-uuid'
import OrderDeliveryDomain from '../domains/OrderDeliveryDomain'
import {
  OrderDeliveryCreateReqDTO,
  OrderDeliveryResDTO,
  OrderDeliveryStoreUpdateReqDTO,
} from '../dtos/OrderDeliveryDTO'

export class OrderDeliveryMapper implements Mapper<OrderDeliveryDomain> {
  toDomain(raw: OrderDelivery | OrderDeliveryCreateReqDTO): OrderDeliveryDomain {
    return OrderDeliveryDomain.create({
      ...('idOrderDelivery' in raw && { idOrderDelivery: raw.idOrderDelivery }),
      idStore: Buffer.isBuffer(raw.idStore) ? fromBinaryUUID(raw.idStore) : raw.idStore,
      idOrder: raw.idOrder,
      idSeller: raw.idSeller,
      sellerName: raw.sellerName,
      idCarrier: raw.idCarrier,
      idDeliveryType: raw.idDeliveryType,
      deliveryTypeName: raw.deliveryTypeName,
      idContract: raw.idContract,
      status: 'status' in raw ? raw.status : null,
      totalShippingTaxExcl: raw.totalShippingTaxExcl,
      totalShippingTaxIncl: raw.totalShippingTaxIncl,
      totalShipping: raw.totalShipping,
      trackingCode: 'trackingCode' in raw ? raw.trackingCode : null,
      trackingLink: 'trackingLink' in raw ? raw.trackingLink : null,
      customer: raw.customer,
      products: raw.products,
      addressDelivery: raw.addressDelivery,
      addressPickup: raw.addressPickup,
    })
  }

  toDTO(raw: OrderDeliveryDomain): OrderDeliveryResDTO {
    return {
      idOrderDelivery: <number>raw.idOrderDelivery,
      idStore: raw.idStore,
      idOrder: raw.idOrder,
      idSeller: raw.idSeller,
      sellerName: raw.sellerName,
      idCarrier: raw.idCarrier,
      idDeliveryType: raw.idDeliveryType,
      deliveryTypeName: raw.deliveryTypeName,
      ...(raw.idContract && { idContract: raw.idContract }),
      status: raw.status,
      totalShippingTaxExcl: raw.totalShippingTaxExcl,
      totalShippingTaxIncl: raw.totalShippingTaxIncl,
      totalShipping: raw.totalShipping,
      trackingCode: raw.trackingCode,
      trackingLink: raw.trackingLink,
      customer: raw.customer,
      products: raw.products,
      addressDelivery: raw.addressDelivery,
      addressPickup: raw.addressPickup,
    }
  }

  toPersistence(raw: OrderDeliveryDomain) {
    return {
      idStore: toBinaryUUID(raw.idStore),
      idOrder: raw.idOrder,
      idSeller: raw.idSeller,
      sellerName: raw.sellerName,
      idCarrier: raw.idCarrier,
      idDeliveryType: raw.idDeliveryType,
      deliveryTypeName: raw.deliveryTypeName,
      idContract: raw.idContract,
      status: raw.status,
      totalShippingTaxExcl: raw.totalShippingTaxExcl,
      totalShippingTaxIncl: raw.totalShippingTaxIncl,
      totalShipping: raw.totalShipping,
      trackingCode: raw.trackingCode,
      trackingLink: raw.trackingLink,
      customer: raw.customer,
      products: raw.products,
      addressDelivery: raw.addressDelivery,
      addressPickup: raw.addressPickup,
    }
  }

  toUpdate(raw: OrderDeliveryDomain) {
    return {
      idOrderDelivery: raw.idOrderDelivery,
      ...(raw.status && { status: raw.status }),
      ...(raw.trackingCode && { trackingCode: raw.trackingCode }),
      ...(raw.trackingLink && { trackingLink: raw.trackingLink }),
    }
  }

  toStoreUpdateDTO(raw: OrderDeliveryDomain): OrderDeliveryStoreUpdateReqDTO {
    return {
      status: raw.status,
      trackingCode: raw.trackingCode,
      trackingLink: raw.trackingLink,
    }
  }
}
