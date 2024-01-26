import mocked = jest.mocked
import { CustomError } from '../../../tools/customError'
import schemaValidator from '../schemaValidator'
import { UNPROCESSABLE_ENTITY } from 'http-status'
import { findAllByCarrierReq } from '../../../validators/orderDelivery.validator'

describe('validateRequest function', () => {
  afterEach(async () => {
    jest.clearAllMocks()
  })

  it('Should return no validation errors when receiving a valid request', async () => {
    const mFindAllByCarrierReq = mocked(findAllByCarrierReq, true)
    const res = {}
    const next = jest.fn()
    const req = {
      query: { idCarrier: 1 },
      scopes: ['api/carriers:read'],
      route: { path: '/orders' },
      method: 'GET',
      params: { name: '' },
    }
    const validate = jest.spyOn(mFindAllByCarrierReq, 'validate').mockReturnValue({ error: undefined, value: null })

    expect(() => schemaValidator(<never>req, <never>res, next)).not.toThrowError('Not authorized')
    expect(validate).toHaveBeenCalledWith(
      { idCarrier: 1 },
      { context: { isCarrier: false, isStore: false, isAdmin: false } }
    )
    expect(next).toHaveBeenCalledWith()
  })

  it('Should return validation errors when receiving an invalid request', async () => {
    const mFindAllByCarrierReq = mocked(findAllByCarrierReq, true)
    const res = {}
    const next = jest.fn()
    const req = {
      query: { idCarrier: 1 },
      scopes: ['api/carriers:read'],
      route: { path: '/orders' },
      method: 'GET',
      params: { name: '' },
    }
    const validate = jest.spyOn(mFindAllByCarrierReq, 'validate').mockReturnValue(<never>{
      error: { details: [{ message: 'some error' }] },
      value: null,
    })

    schemaValidator(<never>req, <never>res, next)

    expect(validate).toHaveBeenCalledWith(
      { idCarrier: 1 },
      { context: { isCarrier: false, isStore: false, isAdmin: false } }
    )
    expect(next).toHaveBeenCalledWith(new CustomError('Failed to retrieve orders', UNPROCESSABLE_ENTITY, 'some error'))
  })
})
