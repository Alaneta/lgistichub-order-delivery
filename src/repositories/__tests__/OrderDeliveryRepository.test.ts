jest.mock('binary-uuid')

import mocked = jest.mocked
import { OrderDeliveryRepo } from '../index'
import { toBinaryUUID } from 'binary-uuid'
import { OrderDeliveryMap } from '../../mappers'
import OrderDelivery from '../../models/OrderDelivery'

describe('OrderDeliveryRepository', () => {
  afterEach(async () => {
    jest.clearAllMocks()
  })

  describe('findOneByIds method', () => {
    it('should find OrderDelivery by idCarrier, idStore, idOrder, idOrderDelivery and return instance of OrderDeliveryDomain if OrderDelivery was found', async () => {
      ;(toBinaryUUID as jest.Mock).mockReturnValue('Some binary value')
      const orderDeliveryModel = mocked(OrderDelivery, true)
      const orderDeliveryMap = mocked(OrderDeliveryMap, true)

      const orderDeliveryModelSample = {
        idOrderDelivery: 1,
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
      }
      const orderDeliveryDomain = {
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
        updateOrderData: jest.fn(),
      }

      const mFindOne = jest.spyOn(orderDeliveryModel, 'findOne').mockResolvedValue(<never>orderDeliveryModelSample)
      const mToDomain = jest.spyOn(orderDeliveryMap, 'toDomain').mockReturnValue(orderDeliveryDomain)

      const orderDeliveryFindOneResult = await OrderDeliveryRepo.findOneByIds(
        1,
        '40q1un9r6iut6017kuailaddss',
        '071b7da4-66ad-11ed-bd50-0242ac180007',
        1
      )

      expect(mFindOne).toHaveBeenCalledWith({
        where: {
          idCarrier: '40q1un9r6iut6017kuailaddss',
          idStore: 'Some binary value',
          idOrder: 1,
          idOrderDelivery: 1,
        },
      })
      expect(mToDomain).toHaveBeenCalledWith(orderDeliveryModelSample)
      expect(orderDeliveryFindOneResult).toEqual(orderDeliveryDomain)
    })

    it('should find OrderDelivery by idCarrier, idStore, idOrder, idOrderDelivery and return null if no OrderDelivery was found', async () => {
      ;(toBinaryUUID as jest.Mock).mockReturnValue('Some binary value')
      const orderDeliveryModel = mocked(OrderDelivery, true)
      const orderDeliveryMap = mocked(OrderDeliveryMap, true)

      const findOne = jest.spyOn(orderDeliveryModel, 'findOne').mockResolvedValue(null)
      const toDomain = jest.spyOn(orderDeliveryMap, 'toDomain')

      const orderDeliveryFindOneResult = await OrderDeliveryRepo.findOneByIds(
        1,
        '40q1un9r6iut6017kuailaddss',
        '071b7da4-66ad-11ed-bd50-0242ac180007',
        1
      )

      expect(findOne).toHaveBeenCalledWith({
        where: {
          idCarrier: '40q1un9r6iut6017kuailaddss',
          idStore: 'Some binary value',
          idOrder: 1,
          idOrderDelivery: 1,
        },
      })
      expect(toDomain).not.toHaveBeenCalled()
      expect(orderDeliveryFindOneResult).toEqual(null)
    })
  })

  describe('findAllByCarrier method', () => {
    it("should find all OrderDelivery by idCarrier and return array of OrderDeliveryDomain instances if OrderDelivery's were found", async () => {
      const orderDeliveryModel = mocked(OrderDelivery, true)
      const orderDeliveryMap = mocked(OrderDeliveryMap, true)

      const orderDeliveryModelSample = {
        idOrderDelivery: 1,
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
      }
      const orderDeliveryDomain = {
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
        updateOrderData: jest.fn(),
      }

      const mFindAll = jest.spyOn(orderDeliveryModel, 'findAll').mockResolvedValue(<never>[orderDeliveryModelSample])
      const mToDomain = jest.spyOn(orderDeliveryMap, 'toDomain').mockReturnValue(orderDeliveryDomain)

      const orderDeliveryFindAllResult = await OrderDeliveryRepo.findAllByCarrier('40q1un9r6iut6017kuailaddss', 1, 1)

      expect(mFindAll).toHaveBeenCalledWith({ limit: 1, offset: 1, where: { idCarrier: '40q1un9r6iut6017kuailaddss' } })
      expect(mToDomain).toHaveBeenCalledWith(orderDeliveryModelSample)
      expect(orderDeliveryFindAllResult).toEqual([orderDeliveryDomain])
    })
  })

  describe('save method', () => {
    it('should create new instance of OrderDelivery model and return OrderDeliveryDomain instance with created id', async () => {
      const orderDeliveryMap = mocked(OrderDeliveryMap, true)
      const orderDeliveryModel = mocked(OrderDelivery, true)

      const orderDeliveryDomain = {
        idOrderDelivery: undefined,
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
        updateOrderData: jest.fn(),
      }
      const orderDeliveryModelSample = {
        idOrderDelivery: 1,
        idStore: '071b7da4-66ad-11ed-bd50-0242ac180007',
        idOrder: 1,
        idSeller: 1,
        sellerName: 'Datasoft',
        idCarrier: '40q1un9r6iut6017kuailaddss',
        idDeliveryType: 1,
        deliveryTypeName: 'Envío gratis',
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
      }
      const orderDeliveryCreated = {
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
      }

      const dataToPersist = {
        idStore: <never>'Some binary value',
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
      }

      const toPersistence = jest.spyOn(orderDeliveryMap, 'toPersistence').mockReturnValue(dataToPersist)
      const create = jest.spyOn(orderDeliveryModel, 'create').mockResolvedValue(<never>orderDeliveryModelSample)

      const saveResult = await OrderDeliveryRepo.save(orderDeliveryDomain)

      expect(toPersistence).toHaveBeenCalledWith(orderDeliveryDomain)
      expect(create).toHaveBeenCalledWith(dataToPersist)
      expect(saveResult).toEqual(orderDeliveryCreated)
    })
  })

  describe('update method', () => {
    it('should update instance of OrderDelivery model and return OrderDeliveryDomain instance with updated data', async () => {
      const orderDeliveryMap = mocked(OrderDeliveryMap, true)
      const orderDeliveryModel = mocked(OrderDelivery, true)

      const orderDeliveryDomain = {
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
        updateOrderData: jest.fn(),
      }
      const orderDeliveryModelSample = {
        idOrderDelivery: 1,
        idStore: 'Some binary value',
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
      }

      const toUpdate = jest.spyOn(orderDeliveryMap, 'toUpdate').mockReturnValue({
        idOrderDelivery: 1,
        status: 2,
        trackingCode: 'ABCDEFG23',
        trackingLink: 'www.tracking.com',
      })
      const update = jest.spyOn(orderDeliveryModel, 'update').mockResolvedValue(<never>orderDeliveryModelSample)

      const updateResult = await OrderDeliveryRepo.update(orderDeliveryDomain)

      expect(toUpdate).toHaveBeenCalledWith(orderDeliveryDomain)
      expect(update).toHaveBeenCalledWith(
        {
          idOrderDelivery: 1,
          status: 2,
          trackingCode: 'ABCDEFG23',
          trackingLink: 'www.tracking.com',
        },
        { where: { idOrderDelivery: 1 } }
      )
      expect(updateResult).toEqual(orderDeliveryDomain)
    })
  })

  describe('delete method', () => {
    it('should delete instance of OrderDelivery model and return number of deleted rows', async () => {
      const orderDeliveryModel = mocked(OrderDelivery, true)
      const orderDeliveryDomain = {
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
        updateOrderData: jest.fn(),
      }

      const toDestroy = jest.spyOn(orderDeliveryModel, 'destroy').mockResolvedValue(1)
      const deleteResult = await OrderDeliveryRepo.delete(orderDeliveryDomain)

      expect(toDestroy).toHaveBeenCalledWith({ where: { idOrderDelivery: 1 } })
      expect(deleteResult).toEqual(1)
    })
  })
})
