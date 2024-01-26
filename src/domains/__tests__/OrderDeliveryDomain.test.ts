import OrderDeliveryDomain from '../OrderDeliveryDomain'

describe('OrderDeliveryDomain', () => {
  afterEach(async () => {
    jest.clearAllMocks()
  })

  describe('create method', () => {
    it('should return new instance of CarrierDomain domain', () => {
      const orderDelivery = OrderDeliveryDomain.create({
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
  })

  describe('get idOrderDelivery method', () => {
    it('should return idOrderDelivery of OrderDeliveryDomain instance', () => {
      const orderDelivery = new OrderDeliveryDomain({
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
      })
      expect(orderDelivery.idOrderDelivery).toEqual(1)
    })
  })

  describe('set idOrderDelivery method', () => {
    it('should set idOrderDelivery of OrderDeliveryDomain instance', () => {
      const orderDelivery = new OrderDeliveryDomain({
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
      })
      orderDelivery.idOrderDelivery = 2
      expect(orderDelivery.idOrderDelivery).toEqual(2)
    })
  })

  describe('get idStore method', () => {
    it('should return idStore of OrderDeliveryDomain instance', () => {
      const orderDelivery = new OrderDeliveryDomain({
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
      })
      expect(orderDelivery.idStore).toEqual('071b7da4-66ad-11ed-bd50-0242ac180007')
    })
  })

  describe('get idOrder method', () => {
    it('should return idOrder of OrderDeliveryDomain instance', () => {
      const orderDelivery = new OrderDeliveryDomain({
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
      })
      expect(orderDelivery.idOrder).toEqual(1)
    })
  })

  describe('get idSeller method', () => {
    it('should return idSeller of OrderDeliveryDomain instance', () => {
      const orderDelivery = new OrderDeliveryDomain({
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
      })
      expect(orderDelivery.idSeller).toEqual(1)
    })
  })

  describe('get sellerName method', () => {
    it('should return sellerName of OrderDeliveryDomain instance', () => {
      const orderDelivery = new OrderDeliveryDomain({
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
      })
      expect(orderDelivery.sellerName).toEqual('Datasoft')
    })
  })

  describe('get idCarrier method', () => {
    it('should return idCarrier of OrderDeliveryDomain instance', () => {
      const orderDelivery = new OrderDeliveryDomain({
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
      })
      expect(orderDelivery.idCarrier).toEqual('40q1un9r6iut6017kuailaddss')
    })
  })

  describe('get idDeliveryType method', () => {
    it('should return idDeliveryType of OrderDeliveryDomain instance', () => {
      const orderDelivery = new OrderDeliveryDomain({
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
      })
      expect(orderDelivery.idDeliveryType).toEqual(1)
    })
  })

  describe('get deliveryTypeName method', () => {
    it('should return deliveryTypeName of OrderDeliveryDomain instance', () => {
      const orderDelivery = new OrderDeliveryDomain({
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
      })
      expect(orderDelivery.deliveryTypeName).toEqual('Envío gratis')
    })
  })

  describe('get status method', () => {
    it('should return status of OrderDeliveryDomain instance', () => {
      const orderDelivery = new OrderDeliveryDomain({
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
      })
      expect(orderDelivery.status).toEqual(2)
    })
  })

  describe('updateOrderDataFromCarrier method', () => {
    it(
      'should update status, tracking link and tracking code of OrderDeliveryDomain if actual status is ORDER_STATUS_APPROVED, ' +
        'trackingCode and trackingLink are received and status received is ORDER_STATUS_SENT or ORDER_STATUS_DELIVERED',
      () => {
        const orderDelivery = new OrderDeliveryDomain({
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
          trackingCode: null,
          trackingLink: null,
          customer: <JSON>{},
          products: <JSON>{},
          addressDelivery: <JSON>{},
          addressPickup: <JSON>{},
        })
        orderDelivery.updateOrderData(5, 'Some tracking code', 'www.tracking.com')
        expect(orderDelivery.status).toEqual(5)
        expect(orderDelivery.trackingCode).toEqual('Some tracking code')
        expect(orderDelivery.trackingLink).toEqual('www.tracking.com')
      }
    )

    it(
      'should not update status of OrderDeliveryDomain to ORDER_STATUS_SENT or ORDER_STATUS_DELIVERED if ' +
        'trackingCode and trackingLink are not set',
      () => {
        const orderDelivery = new OrderDeliveryDomain({
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
          trackingCode: null,
          trackingLink: null,
          customer: <JSON>{},
          products: <JSON>{},
          addressDelivery: <JSON>{},
          addressPickup: <JSON>{},
        })
        expect(() => orderDelivery.updateOrderData(5)).toThrow('Order Delivery cannot be updated')
      }
    )

    it('should not update status, tracking code or tracking link of OrderDeliveryDomain if order status is already cancelled or delivered', () => {
      const orderDelivery = new OrderDeliveryDomain({
        idOrderDelivery: 1,
        idStore: '071b7da4-66ad-11ed-bd50-0242ac180007',
        idOrder: 1,
        idSeller: 1,
        sellerName: 'Datasoft',
        idCarrier: '40q1un9r6iut6017kuailaddss',
        idDeliveryType: 1,
        deliveryTypeName: 'Envío gratis',
        idContract: null,
        status: 6,
        totalShipping: 100,
        totalShippingTaxExcl: 100,
        totalShippingTaxIncl: 100,
        trackingCode: 'Some tracking code',
        trackingLink: 'Some tracking link',
        customer: <JSON>{},
        products: <JSON>{},
        addressDelivery: <JSON>{},
        addressPickup: <JSON>{},
      })
      expect(() => orderDelivery.updateOrderData(4)).toThrow('Order Delivery cannot be updated')
    })
  })

  describe('get totalShippingTaxExcl method', () => {
    it('should return totalShippingTaxExcl of OrderDeliveryDomain instance', () => {
      const orderDelivery = new OrderDeliveryDomain({
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
      })
      expect(orderDelivery.totalShippingTaxExcl).toEqual(100)
    })
  })

  describe('get totalShippingTaxIncl method', () => {
    it('should return totalShippingTaxIncl of OrderDeliveryDomain instance', () => {
      const orderDelivery = new OrderDeliveryDomain({
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
      })
      expect(orderDelivery.totalShippingTaxIncl).toEqual(100)
    })
  })

  describe('get trackingCode method', () => {
    it('should return trackingCode of OrderDeliveryDomain instance', () => {
      const orderDelivery = new OrderDeliveryDomain({
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
      })
      expect(orderDelivery.trackingCode).toEqual('ABCDEFG23')
    })
  })

  describe('get trackingLink method', () => {
    it('should return trackingLink of OrderDeliveryDomain instance', () => {
      const orderDelivery = new OrderDeliveryDomain({
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
      })
      expect(orderDelivery.trackingLink).toEqual('www.tracking.com')
    })
  })

  describe('get customer method', () => {
    it('should return customer of OrderDeliveryDomain instance', () => {
      const orderDelivery = new OrderDeliveryDomain({
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
      })
      expect(orderDelivery.customer).toEqual({})
    })
  })

  describe('get products method', () => {
    it('should return products of OrderDeliveryDomain instance', () => {
      const orderDelivery = new OrderDeliveryDomain({
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
      })
      expect(orderDelivery.products).toEqual({})
    })
  })

  describe('get addressDelivery method', () => {
    it('should return addressDelivery of OrderDeliveryDomain instance', () => {
      const orderDelivery = new OrderDeliveryDomain({
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
      })
      expect(orderDelivery.addressDelivery).toEqual({})
    })
  })

  describe('get addressPickup method', () => {
    it('should return addressPickup of OrderDeliveryDomain instance', () => {
      const orderDelivery = new OrderDeliveryDomain({
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
      })
      expect(orderDelivery.addressPickup).toEqual({})
    })
  })
})
