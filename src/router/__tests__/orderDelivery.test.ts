import mocked = jest.mocked
import request from 'supertest'
import { ServerApp } from '../../server'
import { INTERNAL_SERVER_ERROR, NO_CONTENT, OK } from 'http-status'
import OrderDeliveryService from '../../services/OrderDeliveryService'

jest.mock('../../services/OrderDeliveryService')

const app = ServerApp.getInstance()

const tokenScopeCarrier =
  'eyJraWQiOiJIMG9vZnQ5TEF0UzRcL3loXC96ZFVWVFEyc01rSTlKTjJuVHFhTzdFTmltOGs9IiwiYWxnIjoiUlMyNTYifQ.eyJzdWIiOiI3a2hnY3I5MXIyZGNnbmgwZWlwZ2liamNhYSIsInRva2VuX3VzZSI6ImFjY2VzcyIsInNjb3BlIjoiY2FycmllcnNcL2NhcnJpZXJzOndyaXRlIGNhcnJpZXJzXC9jYXJyaWVyczpyZWFkIiwiYXV0aF90aW1lIjoxNjcyODAyNTExLCJpc3MiOiJodHRwczpcL1wvY29nbml0by1pZHAudXMtZWFzdC0xLmFtYXpvbmF3cy5jb21cL3VzLWVhc3QtMV9kb0NHM0ZwZ1QiLCJleHAiOjE2NzI4MDYxMTEsImlhdCI6MTY3MjgwMjUxMSwidmVyc2lvbiI6MiwianRpIjoiYjhlMWUxMDgtZWM5OS00NjM0LTg5MmItMWEyOWFmY2ZjMDEyIiwiY2xpZW50X2lkIjoiN2toZ2NyOTFyMmRjZ25oMGVpcGdpYmpjYWEifQ.aO7Xia_oc3-QojMrkD0Rd_hf2DzUqQ-o6lS-19vFqWKlYciF-8eAzsY_V-7E1f_DWScked5EXGlIDYkjWTZgP_1WPJEG9_DN3Nekm3aBYQQdrsZWDK1VcGPP9xSKYplg_tCxqTnO8fjRggkZBTD0SUgBs-5KzYR7dqGcG9pfJdgHHpKH-GfunG9sZWGWgMzd7l91GNda4doFOK3V-zCzKq9QXKHBUrKWpl2N442bjUN8cU01YLiTOsqEtJ_SwqbpEr4u1vULk2DGdz4ZjI1vgZfJvYzUYw0V7Crdg6TtX_tsyLyTevJjKcjE5YeAuNC038zgjUG33jrH_fPpbe6yOg'
// const tokenScopeStore = 'eyJraWQiOiJiNmI3TGhTRk1aU1pnSHVSSFBrQ2VSYmc0Wis2aW1pWUdWQkNhVzVpNFNVPSIsImFsZyI6IlJTMjU2In0.eyJzdWIiOiIyZHUzbm9hNzFjN3Z2OWJtYjRqNTJvMjRlIiwidG9rZW5fdXNlIjoiYWNjZXNzIiwic2NvcGUiOiJsb2dpc3RpY1wvc3RvcmU6d3JpdGUgbG9naXN0aWNcL3N0b3JlOnJlYWQiLCJhdXRoX3RpbWUiOjE2NzI4NTcwMjMsImlzcyI6Imh0dHBzOlwvXC9jb2duaXRvLWlkcC51cy1lYXN0LTEuYW1hem9uYXdzLmNvbVwvdXMtZWFzdC0xX014Ynd4bGJjdyIsImV4cCI6MTY3Mjg2MDYyMywiaWF0IjoxNjcyODU3MDIzLCJ2ZXJzaW9uIjoyLCJqdGkiOiI3MzM5ZTcyZS02ZjkxLTQ2N2ItYjFlNy04YjY3YjdlZDQzZjAiLCJjbGllbnRfaWQiOiIyZHUzbm9hNzFjN3Z2OWJtYjRqNTJvMjRlIn0.NgwYAg3fTaNaH7b4UFz6_G5WuJmdet73HwdBkWvF9Yc9FyB4FcGJTpgSRHRCkBoL3LYKyZnKUcc8405SJqanJgVs7H-wUum89e97JEdta759te_ttNLWY0dzSfyeBSe_UEKFm60sJOki0rTa_MTGX2T1CU9S1jKoK2o-SQcL9OKUtOMwrmDQliH_4-JMh4xuLVSrzysdpPAbCR2BVYhxTJw_HODDEg1eEhWihH-wMhKh3Aas-6WMgwG1wNFkt7EPMJ7QeKVhmw8g1c0QiQYp_BDKLYKzWa6EWan2ka-NAhbQaD2v1H5DsP0UpwHyNsLHahqylg67IzVWhcSus1nwCw'
const tokenScopeAllCarrier =
  'eyJraWQiOiJ6VWd5UlBNT0J6RnhzU0ZNRFAwWmw0blZGMnAwV0Y4TjZZMG4zYVl3eGpNPSIsImFsZyI6IlJTMjU2In0.eyJzdWIiOiI0czhvamRpazl1NGhvcm01NnU2ODZtcm9vOSIsInRva2VuX3VzZSI6ImFjY2VzcyIsInNjb3BlIjoibG9naXN0aWNcL2FsbGNhcnJpZXJzOnJlYWQgbG9naXN0aWNcL2FsbGNhcnJpZXJzOndyaXRlIiwiYXV0aF90aW1lIjoxNjcyODAyMjcyLCJpc3MiOiJodHRwczpcL1wvY29nbml0by1pZHAudXMtZWFzdC0xLmFtYXpvbmF3cy5jb21cL3VzLWVhc3QtMV96YUJPUE1oZVQiLCJleHAiOjE2NzI4MDU4NzIsImlhdCI6MTY3MjgwMjI3MiwidmVyc2lvbiI6MiwianRpIjoiYzM4NjVlZjYtYjZiYy00YmY0LTg1ZjctMTc0NDY1ZjhmZmY1IiwiY2xpZW50X2lkIjoiNHM4b2pkaWs5dTRob3JtNTZ1Njg2bXJvbzkifQ.tzPu2AF3KHqBmPED5RGoJTDCzltSJaLwGrd0ZF-afBtkG75vy3qrUelOVarexiOd1gkcxzRTBBXvKAkcGblplpat2jJgfBQSRu7pEsvtiKwjnRpDfcG4JRG1aHWK7r44qtqsNDDcD7RwwMFH2iUdChNcSjyWKZ5hBL54ZZWxsFAOxuYZwwAcpUcNFFRE7ivn6ftZCZsNC_fP4-I8kNc5R6sk4BMyE4olwK5WrtUn2TdRJIJfAyIM26qnzc02Q9Bi-QRktixjFGFlyHStQyOHZMpOoXHwFlv66RB6oc4KNy98GJKqK92NVhWPD46-UBAGqrH3JgTUsAbqb2iUNjoXcw'

describe('OrderDelivery router', () => {
  afterEach(async () => {
    jest.clearAllMocks()
  })

  describe('GET /api/orders', () => {
    it('should search for all order deliveries by idCarrier and return the result of the search', async () => {
      const orderDeliveryService = mocked(OrderDeliveryService, true)
      const findAllByCarrier = jest.spyOn(orderDeliveryService, 'findAllByCarrier').mockResolvedValue([])
      const response = await request(app)
        .get('/api/orders/?idCarrier=40q1un9r6iut6017kuailaddss')
        .set('Authorization', tokenScopeAllCarrier)

      expect(findAllByCarrier).toHaveBeenCalledWith('40q1un9r6iut6017kuailaddss', NaN, NaN)
      expect(response.statusCode).toBe(OK)
      expect(response.body).toEqual([])
    })

    it('should search for all order deliveries by idCarrier and return the result of the search with scope carrier token', async () => {
      const orderDeliveryService = mocked(OrderDeliveryService, true)
      const findAllByCarrier = jest.spyOn(orderDeliveryService, 'findAllByCarrier').mockResolvedValue([])
      const response = await request(app).get('/api/orders/').set('Authorization', tokenScopeCarrier)

      expect(findAllByCarrier).toHaveBeenCalledWith('7khgcr91r2dcgnh0eipgibjcaa', NaN, NaN)
      expect(response.statusCode).toBe(OK)
      expect(response.body).toEqual([])
    })

    it('should return error if orderDeliveryService.findAllByCarrier throws an error', async () => {
      const orderDeliveryService = mocked(OrderDeliveryService, true)
      orderDeliveryService.findAllByCarrier.mockImplementation(() => {
        throw new Error()
      })
      const response = await request(app).get('/api/orders?idCarrier=1').set('Authorization', tokenScopeAllCarrier)
      expect(response.statusCode).toBe(INTERNAL_SERVER_ERROR)
    })

    it('should return error if not idCarrier', async () => {
      const response = await request(app).get('/api/orders').set('Authorization', tokenScopeAllCarrier)
      expect(response.statusCode).toBe(422)
    })
  })

  describe('GET /api/orders/:id', () => {
    it('should search for all order deliveries by idOrder and return the result of the search', async () => {
      const orderDeliveryService = mocked(OrderDeliveryService, true)
      const getResponse = {
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
        trackingCode: 'ABCDEFG123',
        trackingLink: 'www.racking.com.ar',
        customer: <JSON>{},
        products: <JSON>{},
        addressDelivery: <JSON>{},
        addressPickup: <JSON>{},
      }
      const getOne = jest.spyOn(orderDeliveryService, 'getOne').mockResolvedValue(getResponse)
      const response = await request(app).get('/api/orders/1').set('Authorization', tokenScopeAllCarrier)

      expect(getOne).toHaveBeenCalledWith(1)
      expect(response.statusCode).toBe(OK)
      expect(response.body).toEqual(getResponse)
    })

    it('should return error if orderDeliveryService.getOne throws an error', async () => {
      const orderDeliveryService = mocked(OrderDeliveryService, true)
      orderDeliveryService.getOne.mockImplementation(() => {
        throw new Error()
      })
      const response = await request(app).get('/api/orders/1').set('Authorization', tokenScopeAllCarrier)

      expect(response.statusCode).toBe(INTERNAL_SERVER_ERROR)
    })
  })

  describe('POST /api/orders', () => {
    it('should create new order delivery', async () => {
      const orderDeliveryService = mocked(OrderDeliveryService, true)
      const reqBody = {
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
        customer: {},
        products: [],
        addressDelivery: {},
        addressPickup: {},
      }
      const create = jest.spyOn(orderDeliveryService, 'create').mockResolvedValue(1)
      const response = await request(app).post('/api/orders').set('Authorization', tokenScopeAllCarrier).send(reqBody)

      expect(create).toHaveBeenCalledWith(reqBody, tokenScopeAllCarrier)
      expect(response.statusCode).toBe(OK)
      expect(response.body).toEqual({ idOrderDelivery: 1, message: 'Order Delivery created succesfully' })
    })

    it('should return error if orderDeliveryService.create throws an error', async () => {
      const orderDeliveryService = mocked(OrderDeliveryService, true)
      orderDeliveryService.create.mockImplementation(() => {
        throw new Error()
      })
      const reqBody = {
        idOrder: 1,
        idSeller: 1,
        idStore: '071b7da4-66ad-11ed-bd50-0242ac180007',
        sellerName: 'Datasoft',
        idCarrier: '40q1un9r6iut6017kuailaddss',
        idDeliveryType: 1,
        deliveryTypeName: 'Envío gratis',
        idContract: null,
        status: 2,
        totalShipping: 100,
        totalShippingTaxExcl: 100,
        totalShippingTaxIncl: 100,
        customer: {},
        products: [],
        addressDelivery: {},
        addressPickup: {},
      }

      const response = await request(app).post('/api/orders').set('Authorization', tokenScopeAllCarrier).send(reqBody)

      expect(response.statusCode).toBe(INTERNAL_SERVER_ERROR)
    })
  })

  describe('DELETE /api/orders/:id', () => {
    it('should destroy order delivery with id received in request params', async () => {
      const orderDeliveryService = mocked(OrderDeliveryService, true)
      const destroy = jest.spyOn(orderDeliveryService, 'destroy').mockResolvedValue(NO_CONTENT)

      const response = await request(app).delete('/api/orders/1').set('Authorization', tokenScopeAllCarrier)

      expect(destroy).toHaveBeenCalledWith(1)
      expect(response.statusCode).toBe(NO_CONTENT)
    })

    it('should return error if orderDeliveryService.destroy throws an error', async () => {
      const orderDeliveryService = mocked(OrderDeliveryService, true)
      orderDeliveryService.destroy.mockImplementation(() => {
        throw new Error()
      })
      const response = await request(app).delete('/api/orders/1').set('Authorization', tokenScopeAllCarrier)

      expect(response.statusCode).toBe(INTERNAL_SERVER_ERROR)
    })
  })

  describe('PATCH /api/orders/:id', () => {
    it('should update order delivery with id received in request params', async () => {
      const orderDeliveryService = mocked(OrderDeliveryService, true)
      const reqBody = {
        status: 2,
        trackingCode: 'ABCDE',
        trackingLink: 'http://www.tracking.com.ar',
      }
      const update = jest.spyOn(orderDeliveryService, 'update').mockResolvedValue(OK)
      const response = await request(app)
        .patch('/api/orders/1')
        .set('Authorization', tokenScopeAllCarrier)
        .send(reqBody)

      expect(update).toHaveBeenCalledWith(1, reqBody, tokenScopeAllCarrier)
      expect(response.statusCode).toBe(OK)
      expect(response.body).toEqual({ message: 'Order Delivery updated succesfully' })
    })

    it('should return error if orderDeliveryService.update throws an error', async () => {
      const orderDeliveryService = mocked(OrderDeliveryService, true)
      orderDeliveryService.update.mockImplementation(() => {
        throw new Error()
      })
      const reqBody = {
        status: 2,
        trackingCode: 'ABCDE',
        trackingLink: 'http://www.tracking.com.ar',
      }
      const response = await request(app)
        .patch('/api/orders/1')
        .set('Authorization', tokenScopeAllCarrier)
        .send(reqBody)

      expect(response.statusCode).toBe(INTERNAL_SERVER_ERROR)
    })
  })
})
