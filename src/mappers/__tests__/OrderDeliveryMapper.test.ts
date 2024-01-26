jest.mock('binary-uuid')
import { fromBinaryUUID, toBinaryUUID } from 'binary-uuid'
import { OrderDeliveryMap } from '../index'

describe('OrderDeliveryMapper', () => {
  afterEach(async () => {
    jest.clearAllMocks()
  })

  describe('toDomain method', () => {
    it('should return new OrderDeliveryDomain instance', () => {
      ;(fromBinaryUUID as jest.Mock).mockReturnValue('071b7da4-66ad-11ed-bd50-0242ac180007')
      const orderDelivery = OrderDeliveryMap.toDomain({
        idOrderDelivery: 1,
        idStore: Buffer.isBuffer(true)
          ? fromBinaryUUID(toBinaryUUID('somevalue'))
          : '071b7da4-66ad-11ed-bd50-0242ac180007', //fromBinaryUUID(toBinaryUUID('somevalue')),
        idOrder: 1,
        idSeller: 1,
        sellerName: 'Datasoft',
        idCarrier: '40q1un9r6iut6017kuailaddss',
        idDeliveryType: 1,
        deliveryTypeName: 'Envío gratis',
        idContract: null,
        status: 2,
        totalShipping: 100,
        totalShippingTaxExcl: 100,
        totalShippingTaxIncl: 100,
        trackingCode: 'ABCDEFG23',
        trackingLink: 'www.tracking.com',
        customer: <JSON>{},
        products: <JSON>{},
        addressDelivery: <JSON>{},
        addressPickup: <JSON>{},
      })
      expect(orderDelivery).toEqual({
        idOrderDelivery: 1,
        idStore: '071b7da4-66ad-11ed-bd50-0242ac180007',
        idOrder: 1,
        idSeller: 1,
        sellerName: 'Datasoft',
        idCarrier: '40q1un9r6iut6017kuailaddss',
        idDeliveryType: 1,
        deliveryTypeName: 'Envío gratis',
        idContract: null,
        status: 2,
        totalShipping: 100,
        totalShippingTaxExcl: 100,
        totalShippingTaxIncl: 100,
        trackingCode: 'ABCDEFG23',
        trackingLink: 'www.tracking.com',
        customer: {},
        products: {},
        addressDelivery: {},
        addressPickup: {},
      })
    })

    it('should return new OrderDeliveryDomain instance with default values', () => {
      ;(fromBinaryUUID as jest.Mock).mockReturnValue('071b7da4-66ad-11ed-bd50-0242ac180007')
      const orderDelivery = OrderDeliveryMap.toDomain({
        idStore: '071b7da4-66ad-11ed-bd50-0242ac180007',
        idOrder: 1,
        idSeller: 1,
        sellerName: 'Datasoft',
        idCarrier: '40q1un9r6iut6017kuailaddss',
        idDeliveryType: 1,
        deliveryTypeName: 'Envío gratis',
        idContract: null,
        totalShipping: 100,
        totalShippingTaxExcl: 100,
        totalShippingTaxIncl: 100,
        customer: <JSON>{},
        products: <JSON>{},
        addressDelivery: <JSON>{},
        addressPickup: <JSON>{},
      })
      expect(Buffer.isBuffer(orderDelivery.idStore)).toBe(false)
      expect(orderDelivery).toEqual({
        idOrderDelivery: undefined,
        idStore: '071b7da4-66ad-11ed-bd50-0242ac180007',
        idOrder: 1,
        idSeller: 1,
        sellerName: 'Datasoft',
        idCarrier: '40q1un9r6iut6017kuailaddss',
        idDeliveryType: 1,
        deliveryTypeName: 'Envío gratis',
        idContract: null,
        status: null,
        totalShipping: 100,
        totalShippingTaxExcl: 100,
        totalShippingTaxIncl: 100,
        trackingCode: null,
        trackingLink: null,
        customer: {},
        products: {},
        addressDelivery: {},
        addressPickup: {},
      })
    })
  })

  describe('toDTO method', () => {
    it('should return response of type OrderDeliveryResDTO without idContract if is null', () => {
      const orderDeliveryDTO = OrderDeliveryMap.toDTO(<never>{
        idOrderDelivery: 1,
        idStore: '071b7da4-66ad-11ed-bd50-0242ac180007',
        idOrder: 1,
        idSeller: 1,
        sellerName: 'Datasoft',
        idCarrier: '40q1un9r6iut6017kuailaddss',
        idDeliveryType: 1,
        deliveryTypeName: 'Envío gratis',
        idContract: null,
        status: 2,
        totalShipping: 100,
        totalShippingTaxExcl: 100,
        totalShippingTaxIncl: 100,
        trackingCode: 'ABCDEFG23',
        trackingLink: 'www.tracking.com',
        customer: <JSON>{},
        products: <JSON>{},
        addressDelivery: <JSON>{},
        addressPickup: <JSON>{},
        updateOrderDataFromCarrier: jest.fn(),
      })
      expect(orderDeliveryDTO).toEqual({
        idOrderDelivery: 1,
        idStore: '071b7da4-66ad-11ed-bd50-0242ac180007',
        idOrder: 1,
        idSeller: 1,
        sellerName: 'Datasoft',
        idCarrier: '40q1un9r6iut6017kuailaddss',
        idDeliveryType: 1,
        deliveryTypeName: 'Envío gratis',
        status: 2,
        totalShipping: 100,
        totalShippingTaxExcl: 100,
        totalShippingTaxIncl: 100,
        trackingCode: 'ABCDEFG23',
        trackingLink: 'www.tracking.com',
        customer: {},
        products: {},
        addressDelivery: {},
        addressPickup: {},
      })
    })

    it('should return response of type OrderDeliveryResDTO with idContract if is not null', () => {
      const orderDeliveryDTO = OrderDeliveryMap.toDTO(<never>{
        idOrderDelivery: 1,
        idStore: '071b7da4-66ad-11ed-bd50-0242ac180007',
        idOrder: 1,
        idSeller: 1,
        sellerName: 'Datasoft',
        idCarrier: '40q1un9r6iut6017kuailaddss',
        idDeliveryType: 1,
        deliveryTypeName: 'Envío gratis',
        idContract: 15,
        status: 2,
        totalShipping: 100,
        totalShippingTaxExcl: 100,
        totalShippingTaxIncl: 100,
        trackingCode: 'ABCDEFG23',
        trackingLink: 'www.tracking.com',
        customer: <JSON>{},
        products: <JSON>{},
        addressDelivery: <JSON>{},
        addressPickup: <JSON>{},
        updateOrderDataFromCarrier: jest.fn(),
      })
      expect(orderDeliveryDTO).toEqual({
        idOrderDelivery: 1,
        idStore: '071b7da4-66ad-11ed-bd50-0242ac180007',
        idOrder: 1,
        idSeller: 1,
        sellerName: 'Datasoft',
        idCarrier: '40q1un9r6iut6017kuailaddss',
        idDeliveryType: 1,
        deliveryTypeName: 'Envío gratis',
        idContract: 15,
        status: 2,
        totalShipping: 100,
        totalShippingTaxExcl: 100,
        totalShippingTaxIncl: 100,
        trackingCode: 'ABCDEFG23',
        trackingLink: 'www.tracking.com',
        customer: {},
        products: {},
        addressDelivery: {},
        addressPickup: {},
      })
    })
  })

  describe('toPersistence method', () => {
    it('should return structured data for OrderDelivery persistence', () => {
      ;(toBinaryUUID as jest.Mock).mockReturnValue('Some binary value')
      const toPersistenceData = OrderDeliveryMap.toPersistence(<never>{
        idOrderDelivery: 0,
        idStore: '071b7da4-66ad-11ed-bd50-0242ac180007',
        idOrder: 1,
        idSeller: 1,
        sellerName: 'Datasoft',
        idCarrier: '40q1un9r6iut6017kuailaddss',
        idDeliveryType: 1,
        deliveryTypeName: 'Envío gratis',
        idContract: null,
        status: 2,
        totalShipping: 100,
        totalShippingTaxExcl: 100,
        totalShippingTaxIncl: 100,
        trackingCode: 'ABCDEFG23',
        trackingLink: 'www.tracking.com',
        customer: <JSON>{},
        products: <JSON>{},
        addressDelivery: <JSON>{},
        addressPickup: <JSON>{},
        updateOrderDataFromCarrier: jest.fn(),
      })
      expect(Buffer.isBuffer(toPersistenceData.idStore)).toBe(false)
      expect(toPersistenceData).toEqual({
        idStore: 'Some binary value',
        idOrder: 1,
        idSeller: 1,
        sellerName: 'Datasoft',
        idCarrier: '40q1un9r6iut6017kuailaddss',
        idDeliveryType: 1,
        deliveryTypeName: 'Envío gratis',
        idContract: null,
        status: 2,
        totalShipping: 100,
        totalShippingTaxExcl: 100,
        totalShippingTaxIncl: 100,
        trackingCode: 'ABCDEFG23',
        trackingLink: 'www.tracking.com',
        customer: {},
        products: {},
        addressDelivery: {},
        addressPickup: {},
      })
    })
  })

  describe('toUpdate method', () => {
    it('should return structured data for OrderDelivery update', () => {
      const toUpdateData = OrderDeliveryMap.toUpdate(<never>{
        idOrderDelivery: 1,
        idStore: '071b7da4-66ad-11ed-bd50-0242ac180007',
        idOrder: 1,
        idSeller: 1,
        sellerName: 'Datasoft',
        idCarrier: '40q1un9r6iut6017kuailaddss',
        idDeliveryType: 1,
        deliveryTypeName: 'Envío gratis',
        idContract: null,
        status: 2,
        totalShipping: 100,
        totalShippingTaxExcl: 100,
        totalShippingTaxIncl: 100,
        trackingCode: 'ABCDEFG23',
        trackingLink: 'www.tracking.com',
        customer: <JSON>{},
        products: <JSON>{},
        addressDelivery: <JSON>{},
        addressPickup: <JSON>{},
        updateOrderDataFromCarrier: jest.fn(),
      })
      expect(toUpdateData).toEqual({
        idOrderDelivery: 1,
        status: 2,
        trackingCode: 'ABCDEFG23',
        trackingLink: 'www.tracking.com',
      })
    })
  })

  describe('toStoreUpdateDTO method', () => {
    it('should return structured data for store order update', () => {
      const toStoreUpdateData = OrderDeliveryMap.toStoreUpdateDTO(<never>{
        idOrderDelivery: 1,
        idStore: '071b7da4-66ad-11ed-bd50-0242ac180007',
        idOrder: 1,
        idSeller: 1,
        sellerName: 'Datasoft',
        idCarrier: '40q1un9r6iut6017kuailaddss',
        idDeliveryType: 1,
        deliveryTypeName: 'Envío gratis',
        status: 2,
        totalShipping: 100,
        totalShippingTaxExcl: 100,
        totalShippingTaxIncl: 100,
        trackingCode: 'ABCDEFG23',
        trackingLink: 'www.tracking.com',
        customer: <JSON>{},
        products: <JSON>{},
        addressDelivery: <JSON>{},
        addressPickup: <JSON>{},
        updateOrderDataFromCarrier: jest.fn(),
        updateOrderDataFromStore: jest.fn(),
      })
      expect(toStoreUpdateData).toEqual({
        status: 2,
        trackingCode: 'ABCDEFG23',
        trackingLink: 'www.tracking.com',
      })
    })
  })
})
