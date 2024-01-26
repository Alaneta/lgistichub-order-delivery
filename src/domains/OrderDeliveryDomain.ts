import { Messages } from '../global'
import { FORBIDDEN } from 'http-status'
import { CustomError } from '../tools/customError'
import { ORDER_STATUS_CANCELLED, ORDER_STATUS_DELIVERED, ORDER_STATUS_SENT } from '../constants'

export interface OrderDeliveryProps {
  readonly idOrderDelivery?: number
  idStore: string
  idOrder: number
  idSeller: number
  sellerName: string
  idCarrier: string
  idDeliveryType: number
  deliveryTypeName: string
  idContract: number | null
  status: number | null
  totalShippingTaxExcl: number
  totalShippingTaxIncl: number
  totalShipping: number
  trackingCode: string | null
  trackingLink: string | null
  customer: JSON
  products: JSON
  addressDelivery: JSON
  addressPickup: JSON
}

export default class OrderDeliveryDomain implements OrderDeliveryProps {
  public static create(props: OrderDeliveryProps): OrderDeliveryDomain {
    return new OrderDeliveryDomain({
      ...props,
    })
  }

  idOrderDelivery?: number

  idStore: string

  idOrder: number

  idSeller: number

  sellerName: string

  idCarrier: string

  idDeliveryType: number

  deliveryTypeName: string

  idContract: number | null

  status: number | null

  totalShippingTaxExcl: number

  totalShippingTaxIncl: number

  totalShipping: number

  trackingCode: string | null

  trackingLink: string | null

  customer: JSON

  products: JSON

  addressDelivery: JSON

  addressPickup: JSON

  constructor(props: OrderDeliveryProps) {
    this.idOrderDelivery = props.idOrderDelivery
    this.idStore = props.idStore
    this.idOrder = props.idOrder
    this.idSeller = props.idSeller
    this.sellerName = props.sellerName
    this.idCarrier = props.idCarrier
    this.idDeliveryType = props.idDeliveryType
    this.deliveryTypeName = props.deliveryTypeName
    this.idContract = props.idContract
    this.status = props.status
    this.totalShippingTaxExcl = props.totalShippingTaxExcl
    this.totalShippingTaxIncl = props.totalShippingTaxIncl
    this.totalShipping = props.totalShipping
    this.trackingCode = props.trackingCode
    this.trackingLink = props.trackingLink
    this.customer = props.customer
    this.products = props.products
    this.addressDelivery = props.addressDelivery
    this.addressPickup = props.addressPickup
  }

  public updateOrderData(statusId?: number, trackingCode?: string, trackingLink?: string) {
    const orderIsDelivered = this.status === ORDER_STATUS_DELIVERED
    const orderIsCancelled = this.status === ORDER_STATUS_CANCELLED
    const updateTrackingData = !!(trackingCode && trackingLink)
    const updateStatusToSent = statusId === ORDER_STATUS_SENT
    const updateStatusToDelivered = statusId === ORDER_STATUS_DELIVERED
    const orderHasTrackingData = !!(this.trackingCode && this.trackingLink)

    if (orderIsCancelled || orderIsDelivered)
      throw new CustomError(Messages.statusCantBeUpdated, FORBIDDEN, 'Order delivery status is cancelled or delivered')

    if ((updateStatusToSent || updateStatusToDelivered) && !updateTrackingData && !orderHasTrackingData)
      throw new CustomError(
        Messages.statusCantBeUpdated,
        FORBIDDEN,
        'trackingCode and trackingLink must be updated first'
      )

    if (statusId) this.status = statusId
    if (trackingCode) this.trackingCode = trackingCode
    if (trackingLink) this.trackingLink = trackingLink
  }
}
