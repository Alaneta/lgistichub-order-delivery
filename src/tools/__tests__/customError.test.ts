import { CustomError } from '../customError'
import { INTERNAL_SERVER_ERROR } from 'http-status'

describe('CustomError class', () => {
  it('Should create a CustomError instance correctly', async () => {
    const errorMessage = 'This is a fake error message'
    const customError = new CustomError(errorMessage)
    expect(customError.message).toEqual(errorMessage)
    expect(customError.status).toEqual(INTERNAL_SERVER_ERROR)
    expect(customError.additionalInfo).toEqual({})
  })
})
