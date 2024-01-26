import mocked = jest.mocked
import SqsService from '../SqsService'
import { OrderDeliveryMap } from '../../mappers'
import CarrierService from '../CarrierService'
import { OrderDeliveryRepo } from '../../repositories'
import { NO_CONTENT, NOT_FOUND, OK } from 'http-status'
import OrderDeliveryService from '../OrderDeliveryService'
import { OrderDeliveryProps } from '../../domains/OrderDeliveryDomain'

describe('OrderDeliveryService', () => {
  afterEach(async () => {
    jest.clearAllMocks()
  })

  describe('create method', () => {
    it('should not create new OrderDelivery instance if already exists and return existing id', async () => {
      const orderDeliveryRepo = mocked(OrderDeliveryRepo, true)
      const carrierService = mocked(CarrierService, true)
      const sqsService = mocked(SqsService, true)
      const reqBody = {
        idStore: '071b7da4-66ad-11ed-bd50-0242ac180007',
        idOrder: 1,
        idSeller: 1,
        sellerName: 'Datasoft',
        idCarrier: '343knha0oqio96avbm04fr0qa9',
        idDeliveryType: 1,
        deliveryTypeName: 'Envío gratis',
        idContract: null,
        status: 2,
        totalShippingTaxExcl: 100,
        totalShippingTaxIncl: 100,
        totalShipping: 100,
        customer: <JSON>{},
        products: <JSON>{},
        addressDelivery: <JSON>{},
        addressPickup: <JSON>{},
      }
      const orderDeliveryDomain = {
        props: <OrderDeliveryProps>{},
        idOrderDelivery: 1,
        idStore: '071b7da4-66ad-11ed-bd50-0242ac180007',
        idOrder: 1,
        idSeller: 1,
        sellerName: 'Datasoft',
        idCarrier: '343knha0oqio96avbm04fr0qa9',
        idDeliveryType: 1,
        deliveryTypeName: 'Envío gratis',
        idContract: null,
        status: 2,
        totalShippingTaxExcl: 100,
        totalShippingTaxIncl: 100,
        totalShipping: 100,
        trackingCode: 'ABCDEFG23',
        trackingLink: 'www.tracking.com',
        customer: <JSON>{},
        products: <JSON>{},
        addressDelivery: <JSON>{},
        addressPickup: <JSON>{},
        updateOrderData: jest.fn(),
      }

      const carrierNotificationData = {
        order_status_endpoint: 'endpoint',
        headers_auth: '{}',
      }
      const findOneByIds = jest.spyOn(orderDeliveryRepo, 'findOneByIds').mockResolvedValue(orderDeliveryDomain)
      const getCarrier = jest.spyOn(carrierService, 'getCarrier').mockResolvedValue(carrierNotificationData)
      const sendNotification = jest.spyOn(sqsService, 'sendNotification').mockReturnValue(void 0)

      const createResult = await OrderDeliveryService.create(reqBody, 'token')

      expect(findOneByIds).toHaveBeenCalledWith(
        undefined,
        '343knha0oqio96avbm04fr0qa9',
        '071b7da4-66ad-11ed-bd50-0242ac180007',
        1
      )
      expect(getCarrier).toHaveBeenCalledWith('343knha0oqio96avbm04fr0qa9', 'token')
      expect(sendNotification).toHaveBeenCalled()
      expect(createResult).toEqual(1)
    })

    it('should create new OrderDelivery instance, not send carrier notification if carriers endpoint does not exists and return created id', async () => {
      const orderDeliveryRepo = mocked(OrderDeliveryRepo, true)
      const carrierService = mocked(CarrierService, true)
      const sqsService = mocked(SqsService, true)
      const reqBody = {
        idStore: '071b7da4-66ad-11ed-bd50-0242ac180007',
        idOrder: 1,
        idSeller: 1,
        sellerName: 'Datasoft',
        idCarrier: '343knha0oqio96avbm04fr0qa9',
        idDeliveryType: 1,
        deliveryTypeName: 'Envío gratis',
        idContract: null,
        status: 2,
        totalShippingTaxExcl: 100,
        totalShippingTaxIncl: 100,
        totalShipping: 100,
        customer: <JSON>{},
        products: <JSON>{},
        addressDelivery: <JSON>{},
        addressPickup: <JSON>{},
      }
      const orderDeliveryDomain = {
        props: <OrderDeliveryProps>{},
        idOrderDelivery: 1,
        idStore: '071b7da4-66ad-11ed-bd50-0242ac180007',
        idOrder: 1,
        idSeller: 1,
        sellerName: 'Datasoft',
        idCarrier: '343knha0oqio96avbm04fr0qa9',
        idDeliveryType: 1,
        deliveryTypeName: 'Envío gratis',
        idContract: null,
        status: 2,
        totalShippingTaxExcl: 100,
        totalShippingTaxIncl: 100,
        totalShipping: 100,
        trackingCode: 'ABCDEFG23',
        trackingLink: 'www.tracking.com',
        customer: <JSON>{},
        products: <JSON>{},
        addressDelivery: <JSON>{},
        addressPickup: <JSON>{},
        updateOrderData: jest.fn(),
      }

      const findOneByIds = jest.spyOn(orderDeliveryRepo, 'findOneByIds').mockResolvedValue(orderDeliveryDomain)
      const getCarrier = jest.spyOn(carrierService, 'getCarrier').mockResolvedValue(null)
      const sendNotification = jest.spyOn(sqsService, 'sendNotification').mockReturnValue(void 0)

      const createResult = await OrderDeliveryService.create(reqBody, 'token')

      expect(findOneByIds).toHaveBeenCalledWith(
        undefined,
        '343knha0oqio96avbm04fr0qa9',
        '071b7da4-66ad-11ed-bd50-0242ac180007',
        1
      )
      expect(getCarrier).toHaveBeenCalledWith('343knha0oqio96avbm04fr0qa9', 'token')
      expect(sendNotification).not.toHaveBeenCalled()
      expect(createResult).toEqual(1)
    })

    it('should create new OrderDelivery instance, send carrier notification if carriers endpoint exists and return created id', async () => {
      const orderDeliveryRepo = mocked(OrderDeliveryRepo, true)
      const orderDeliveryMap = mocked(OrderDeliveryMap, true)
      const carrierService = mocked(CarrierService, true)
      const reqBody = {
        idStore: '071b7da4-66ad-11ed-bd50-0242ac180007',
        idOrder: 1,
        idSeller: 1,
        sellerName: 'Datasoft',
        idCarrier: '343knha0oqio96avbm04fr0qa9',
        idDeliveryType: 1,
        deliveryTypeName: 'Envío gratis',
        idContract: null,
        status: 2,
        totalShippingTaxExcl: 100,
        totalShippingTaxIncl: 100,
        totalShipping: 100,
        customer: <JSON>{},
        products: <JSON>{},
        addressDelivery: <JSON>{},
        addressPickup: <JSON>{},
      }
      const orderDeliveryDomain = {
        props: <OrderDeliveryProps>{},
        idOrderDelivery: undefined,
        idStore: '071b7da4-66ad-11ed-bd50-0242ac180007',
        idOrder: 1,
        idSeller: 1,
        sellerName: 'Datasoft',
        idCarrier: '343knha0oqio96avbm04fr0qa9',
        idDeliveryType: 1,
        deliveryTypeName: 'Envío gratis',
        idContract: null,
        status: 2,
        totalShippingTaxExcl: 100,
        totalShippingTaxIncl: 100,
        totalShipping: 100,
        trackingCode: 'ABCDEFG23',
        trackingLink: 'www.tracking.com',
        customer: <JSON>{},
        products: <JSON>{},
        addressDelivery: <JSON>{},
        addressPickup: <JSON>{},
        updateOrderData: jest.fn(),
      }

      const orderDeliverySaved = {
        props: <OrderDeliveryProps>{},
        idOrderDelivery: 1,
        idStore: '071b7da4-66ad-11ed-bd50-0242ac180007',
        idOrder: 1,
        idSeller: 1,
        sellerName: 'Datasoft',
        idCarrier: '343knha0oqio96avbm04fr0qa9',
        idDeliveryType: 1,
        deliveryTypeName: 'Envío gratis',
        idContract: null,
        status: 2,
        totalShippingTaxExcl: 100,
        totalShippingTaxIncl: 100,
        totalShipping: 100,
        trackingCode: 'ABCDEFG23',
        trackingLink: 'www.tracking.com',
        customer: <JSON>{},
        products: <JSON>{},
        addressDelivery: <JSON>{},
        addressPickup: <JSON>{},
        updateOrderData: jest.fn(),
      }

      const findOneByIds = jest.spyOn(orderDeliveryRepo, 'findOneByIds').mockResolvedValue(null)
      const toDomain = jest.spyOn(orderDeliveryMap, 'toDomain').mockReturnValue(orderDeliveryDomain)
      const save = jest.spyOn(orderDeliveryRepo, 'save').mockResolvedValue(orderDeliverySaved)
      const getCarrier = jest.spyOn(carrierService, 'getCarrier').mockResolvedValue(null)

      const createResult = await OrderDeliveryService.create(reqBody, 'token')

      expect(findOneByIds).toHaveBeenCalledWith(
        undefined,
        '343knha0oqio96avbm04fr0qa9',
        '071b7da4-66ad-11ed-bd50-0242ac180007',
        1
      )
      expect(toDomain).toHaveBeenCalledWith(reqBody)
      expect(save).toHaveBeenCalledWith(orderDeliveryDomain)
      expect(getCarrier).toHaveBeenCalledWith('343knha0oqio96avbm04fr0qa9', 'token')
      expect(createResult).toEqual(1)
    })
  })

  describe('findAllByCarrier method', () => {
    it('should find all OrderDelivery instances by idCarrier and return array with data of type OrderDeliveryResDTO', async () => {
      const orderDeliveryRepo = mocked(OrderDeliveryRepo, true)
      const orderDeliveryMap = mocked(OrderDeliveryMap, true)
      const orderDeliveryDomain = {
        props: <OrderDeliveryProps>{},
        idOrderDelivery: 1,
        idStore: '071b7da4-66ad-11ed-bd50-0242ac180007',
        idOrder: 1,
        idSeller: 1,
        sellerName: 'Datasoft',
        idCarrier: '343knha0oqio96avbm04fr0qa9',
        idDeliveryType: 1,
        deliveryTypeName: 'Envío gratis',
        idContract: null,
        status: 2,
        totalShippingTaxExcl: 100,
        totalShippingTaxIncl: 100,
        totalShipping: 100,
        trackingCode: 'ABCDEFG23',
        trackingLink: 'www.tracking.com',
        customer: <JSON>{},
        products: <JSON>{},
        addressDelivery: <JSON>{},
        addressPickup: <JSON>{},
        updateOrderData: jest.fn(),
      }
      const orderDeliveryResDTO = {
        idOrderDelivery: 1,
        idStore: '071b7da4-66ad-11ed-bd50-0242ac180007',
        idOrder: 1,
        idSeller: 1,
        sellerName: 'Datasoft',
        idCarrier: '343knha0oqio96avbm04fr0qa9',
        idDeliveryType: 1,
        deliveryTypeName: 'Envío gratis',
        status: 2,
        totalShippingTaxExcl: 100,
        totalShippingTaxIncl: 100,
        totalShipping: 100,
        trackingCode: 'ABCDEFG23',
        trackingLink: 'www.tracking.com',
        customer: <JSON>{},
        products: <JSON>{},
        addressDelivery: <JSON>{},
        addressPickup: <JSON>{},
      }
      const findAllByCarrier = jest
        .spyOn(orderDeliveryRepo, 'findAllByCarrier')
        .mockResolvedValue([orderDeliveryDomain])
      const toDTO = jest.spyOn(orderDeliveryMap, 'toDTO').mockReturnValue(orderDeliveryResDTO)
      const count = jest.spyOn(orderDeliveryRepo, 'countByCarrier').mockResolvedValue(100)
      const findAllByCarrierResult = await OrderDeliveryService.findAllByCarrier('343knha0oqio96avbm04fr0qa9', 1, 1)

      expect(findAllByCarrier).toHaveBeenCalledWith('343knha0oqio96avbm04fr0qa9', 0, 1)
      expect(toDTO).toHaveBeenCalledWith(orderDeliveryDomain)
      expect(findAllByCarrierResult).toEqual([orderDeliveryResDTO])
    })
  })

  describe('destroy method', () => {
    it('Should find OrderDelivery instance by id received in req params and delete it', async () => {
      const orderDeliveryRepo = mocked(OrderDeliveryRepo, true)
      const orderDeliveryDomain = {
        props: <OrderDeliveryProps>{},
        idOrderDelivery: 1,
        idStore: '071b7da4-66ad-11ed-bd50-0242ac180007',
        idOrder: 1,
        idSeller: 1,
        sellerName: 'Datasoft',
        idCarrier: '343knha0oqio96avbm04fr0qa9',
        idDeliveryType: 1,
        deliveryTypeName: 'Envío gratis',
        idContract: null,
        status: 2,
        totalShippingTaxExcl: 100,
        totalShippingTaxIncl: 100,
        totalShipping: 100,
        trackingCode: 'ABCDEFG23',
        trackingLink: 'www.tracking.com',
        customer: <JSON>{},
        products: <JSON>{},
        addressDelivery: <JSON>{},
        addressPickup: <JSON>{},
        updateOrderData: jest.fn(),
      }
      const findOneByIds = jest.spyOn(orderDeliveryRepo, 'findOneByIds').mockResolvedValue(orderDeliveryDomain)
      const deleteMethod = jest.spyOn(orderDeliveryRepo, 'delete').mockResolvedValue(1)

      const destroyResult = await OrderDeliveryService.destroy(1)

      expect(findOneByIds).toHaveBeenCalledWith(1)
      expect(deleteMethod).toHaveBeenCalledWith(orderDeliveryDomain)
      expect(destroyResult).toEqual(NO_CONTENT)
    })

    it('Should return error NOT_FOUND if no OrderDelivery is found', async () => {
      const orderDeliveryRepo = mocked(OrderDeliveryRepo, true)
      const findOneByIds = jest.spyOn(orderDeliveryRepo, 'findOneByIds').mockResolvedValue(null)
      try {
        await OrderDeliveryService.destroy(1)
      } catch (error: any) {
        expect(findOneByIds).toHaveBeenCalledWith(1)
        expect(error.status).toBe(NOT_FOUND)
      }
    })
  })

  describe('getOne method', () => {
    it('Should find OrderDelivery instance by id received in req params and return structured data of type OrderDeliveryResDTO', async () => {
      const orderDeliveryRepo = mocked(OrderDeliveryRepo, true)
      const orderDeliveryMap = mocked(OrderDeliveryMap, true)
      const orderDeliveryDomain = {
        props: <OrderDeliveryProps>{},
        idOrderDelivery: 1,
        idStore: '071b7da4-66ad-11ed-bd50-0242ac180007',
        idOrder: 1,
        idSeller: 1,
        sellerName: 'Datasoft',
        idCarrier: '343knha0oqio96avbm04fr0qa9',
        idDeliveryType: 1,
        deliveryTypeName: 'Envío gratis',
        idContract: null,
        status: 2,
        totalShippingTaxExcl: 100,
        totalShippingTaxIncl: 100,
        totalShipping: 100,
        trackingCode: 'ABCDEFG23',
        trackingLink: 'www.tracking.com',
        customer: <JSON>{},
        products: <JSON>{},
        addressDelivery: <JSON>{},
        addressPickup: <JSON>{},
        updateOrderData: jest.fn(),
      }
      const orderDeliveryResDTO = {
        idOrderDelivery: 1,
        idStore: '071b7da4-66ad-11ed-bd50-0242ac180007',
        idOrder: 1,
        idSeller: 1,
        sellerName: 'Datasoft',
        idCarrier: '343knha0oqio96avbm04fr0qa9',
        idDeliveryType: 1,
        deliveryTypeName: 'Envío gratis',
        status: 2,
        totalShippingTaxExcl: 100,
        totalShippingTaxIncl: 100,
        totalShipping: 100,
        trackingCode: 'ABCDEFG23',
        trackingLink: 'www.tracking.com',
        customer: <JSON>{},
        products: <JSON>{},
        addressDelivery: <JSON>{},
        addressPickup: <JSON>{},
      }
      const findOneByIds = jest.spyOn(orderDeliveryRepo, 'findOneByIds').mockResolvedValue(orderDeliveryDomain)
      const toDTO = jest.spyOn(orderDeliveryMap, 'toDTO').mockReturnValue(orderDeliveryResDTO)

      const getOneResult = await OrderDeliveryService.getOne(1)

      expect(findOneByIds).toHaveBeenCalledWith(1)
      expect(toDTO).toHaveBeenCalledWith(orderDeliveryDomain)
      expect(getOneResult).toEqual(orderDeliveryResDTO)
    })

    it('Should return error NOT_FOUND if no OrderDelivery is found', async () => {
      const orderDeliveryRepo = mocked(OrderDeliveryRepo, true)
      const findOneByIds = jest.spyOn(orderDeliveryRepo, 'findOneByIds').mockResolvedValue(null)
      try {
        await OrderDeliveryService.getOne(1)
      } catch (error: any) {
        expect(findOneByIds).toHaveBeenCalledWith(1)
        expect(error.status).toBe(NOT_FOUND)
      }
    })
  })

  describe('update method', () => {
    it('Should find OrderDelivery instance by id received in req params, update with info received in req body and return status OK', async () => {
      global.hasCarrierScope = false
      const orderDeliveryRepo = mocked(OrderDeliveryRepo, true)
      const orderDeliveryDomain = {
        props: {
          idOrderDelivery: 1,
          idStore: '071b7da4-66ad-11ed-bd50-0242ac180007',
          idOrder: 1,
          idSeller: 1,
          sellerName: 'Datasoft',
          idCarrier: '343knha0oqio96avbm04fr0qa9',
          idDeliveryType: 1,
          deliveryTypeName: 'Envío gratis',
          idContract: null,
          status: 2,
          totalShippingTaxExcl: 100,
          totalShippingTaxIncl: 100,
          totalShipping: 100,
          trackingCode: 'ABCDEFG23',
          trackingLink: 'www.tracking.com',
          customer: <JSON>{},
          products: <JSON>{},
          addressDelivery: <JSON>{},
          addressPickup: <JSON>{},
        },
        idOrderDelivery: 1,
        idStore: '071b7da4-66ad-11ed-bd50-0242ac180007',
        idOrder: 1,
        idSeller: 1,
        sellerName: 'Datasoft',
        idCarrier: '343knha0oqio96avbm04fr0qa9',
        idDeliveryType: 1,
        deliveryTypeName: 'Envío gratis',
        idContract: null,
        status: 2,
        totalShippingTaxExcl: 100,
        totalShippingTaxIncl: 100,
        totalShipping: 100,
        trackingCode: 'ABCDEFG23',
        trackingLink: 'www.tracking.com',
        customer: <JSON>{},
        products: <JSON>{},
        addressDelivery: <JSON>{},
        addressPickup: <JSON>{},
        updateOrderData: jest.fn().mockImplementation((status: number, trackingCode: string, trackingLink: string) => {
          orderDeliveryDomain.props.trackingCode = trackingCode
          orderDeliveryDomain.props.trackingLink = trackingLink
          orderDeliveryDomain.props.status = status
        }),
      }
      const updatedOrderDeliveryDomain = {
        props: {
          idOrderDelivery: 1,
          idStore: '071b7da4-66ad-11ed-bd50-0242ac180007',
          idOrder: 1,
          idSeller: 1,
          sellerName: 'Datasoft',
          idCarrier: '343knha0oqio96avbm04fr0qa9',
          idDeliveryType: 1,
          deliveryTypeName: 'Envío gratis',
          idContract: null,
          status: 4,
          totalShippingTaxExcl: 100,
          totalShippingTaxIncl: 100,
          totalShipping: 100,
          trackingCode: 'ABCDEFG',
          trackingLink: 'www.tracking.com.ar',
          customer: <JSON>{},
          products: <JSON>{},
          addressDelivery: <JSON>{},
          addressPickup: <JSON>{},
        },
        idOrderDelivery: 1,
        idStore: '071b7da4-66ad-11ed-bd50-0242ac180007',
        idOrder: 1,
        idSeller: 1,
        sellerName: 'Datasoft',
        idCarrier: '343knha0oqio96avbm04fr0qa9',
        idDeliveryType: 1,
        deliveryTypeName: 'Envío gratis',
        idContract: null,
        status: 2,
        totalShippingTaxExcl: 100,
        totalShippingTaxIncl: 100,
        totalShipping: 100,
        trackingCode: 'ABCDEFG23',
        trackingLink: 'www.tracking.com',
        customer: <JSON>{},
        products: <JSON>{},
        addressDelivery: <JSON>{},
        addressPickup: <JSON>{},
        updateOrderData: jest.fn().mockImplementation((status: number, trackingCode: string, trackingLink: string) => {
          orderDeliveryDomain.props.trackingCode = trackingCode
          orderDeliveryDomain.props.trackingLink = trackingLink
          orderDeliveryDomain.props.status = status
        }),
      }
      const reqBody = {
        status: 4,
        trackingCode: 'ABCDEFG',
        trackingLink: 'www.tracking.com.ar',
      }

      const findOneByIds = jest.spyOn(orderDeliveryRepo, 'findOneByIds').mockResolvedValue(orderDeliveryDomain)
      const updateMethod = jest.spyOn(orderDeliveryRepo, 'update').mockResolvedValue(updatedOrderDeliveryDomain)
      const updateResult = await OrderDeliveryService.update(1, reqBody, 'token')
      const mockEntries = Object.entries(updateMethod.mock.calls[0][0])
      const expectedEntries = Object.entries(updatedOrderDeliveryDomain)

      expect(findOneByIds).toHaveBeenCalledWith(1)
      expect(updateMethod).toHaveBeenCalled()
      expect(JSON.stringify(mockEntries)).toEqual(JSON.stringify(expectedEntries))
      expect(updateResult).toEqual(OK)
    })

    it('Should return error NOT_FOUND if no OrderDelivery is found', async () => {
      const orderDeliveryRepo = mocked(OrderDeliveryRepo, true)
      const reqBody = {
        status: 4,
        trackingCode: 'ABCDEFG',
        trackingLink: 'www.tracking.com.ar',
      }
      const findOneByIds = jest.spyOn(orderDeliveryRepo, 'findOneByIds').mockResolvedValue(null)
      try {
        await OrderDeliveryService.update(1, reqBody, 'token')
      } catch (error: any) {
        expect(findOneByIds).toHaveBeenCalledWith(1)
        expect(error.status).toBe(NOT_FOUND)
      }
    })
  })
})
