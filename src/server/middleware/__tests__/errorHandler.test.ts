import errorHandler from '../errorHandler'
import { CustomError } from '../../../tools/customError'
import { BAD_REQUEST, UNPROCESSABLE_ENTITY } from 'http-status'

const mockResponse = () => {
  const res: any = {}
  res.status = jest.fn().mockReturnValue(res)
  res.send = jest.fn().mockReturnValue(res)
  res.json = jest.fn().mockReturnValue(res)
  return res
}
const mockedRequest = {
  body: jest.fn(),
}
const mockedResponse = mockResponse()

describe('Error Handler middleware', () => {
  afterEach(async () => {
    jest.clearAllMocks()
  })

  it('Should return a CustomError instance when error is instance of CustomError', async () => {
    const customError = new CustomError('Some error', BAD_REQUEST)

    errorHandler(<never>customError, <never>mockedRequest, mockedResponse)

    expect(mockedResponse.status).toHaveBeenCalledWith(customError.status)
    expect(mockedResponse.send).toHaveBeenCalledWith(customError)
  })

  it('Should return a CustomError instance when error is not instance of CustomError', async () => {
    const error = { name: 'SequelizeValidationError' } as Error

    errorHandler(error, <never>mockedRequest, mockedResponse)

    expect(mockedResponse.status).toHaveBeenCalledWith(UNPROCESSABLE_ENTITY)
    expect(mockedResponse.send).toHaveBeenCalledWith(new CustomError('Validation error', UNPROCESSABLE_ENTITY, {}))
  })
})
