export type OrderDeliveryCreateReqDTO = {
  idStore: string
  idOrder: number
  idSeller: number
  sellerName: string
  idCarrier: string
  idDeliveryType: number
  deliveryTypeName: string
  idContract: number | null
  totalShippingTaxExcl: number
  totalShippingTaxIncl: number
  totalShipping: number
  customer: JSON
  products: JSON
  addressDelivery: JSON
  addressPickup: JSON
}

export type OrderDeliveryUpdateReqDTO = {
  status?: number
  trackingCode?: string
  trackingLink?: string
}

export type OrderDeliveryResDTO = {
  idOrderDelivery: number
  idStore: string
  idOrder: number
  idSeller: number
  sellerName: string
  idCarrier: string
  idDeliveryType: number
  deliveryTypeName: string
  idContract?: number
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

export type OrderDeliveryStoreUpdateReqDTO = {
  status: number | null
  trackingCode: string | null
  trackingLink: string | null
}
