import axios from 'axios'
import CarrierService from '../CarrierService'

jest.mock('../../config.ts', () => ({
  CARRIER_MANAGEMENT_API_URL: 'http://carrier-api.com',
}))

describe('CarrierService', () => {
  afterEach(async () => {
    jest.clearAllMocks()
  })

  describe('getCarrier method', () => {
    it('should invoke axios get request and return structured data on successfull response ', async () => {
      jest.mock('axios')
      const carrierNotificationData = {
        orderStatusEndpoint: 'status endpoint',
        headersAuth: '{}',
      }
      const carrierNotificationDataResult = {
        order_status_endpoint: 'status endpoint',
        headers_auth: '{}',
      }
      const mockedAxios = axios as jest.Mocked<typeof axios>
      const axiosGetMethod = jest.spyOn(mockedAxios, 'get').mockResolvedValue({ data: carrierNotificationData })

      const getCarrier = await CarrierService.getCarrier('40q1un9r6iut6017kuailaddss', 'token')

      expect(getCarrier).toEqual(carrierNotificationDataResult)
      expect(axiosGetMethod).toHaveBeenCalledWith('http://carrier-api.com/carriers/40q1un9r6iut6017kuailaddss', {
        timeout: 2000,
        headers: {
          Authorization: 'token',
        },
      })
    })

    it('should invoke axios get request and return error on fail response ', async () => {
      jest.mock('axios')
      const mockedAxios = axios as jest.Mocked<typeof axios>
      mockedAxios.get.mockImplementation(() => {
        throw new Error()
      })
      const axiosGetMethod = jest.spyOn(mockedAxios, 'get')

      const getCarrier = await CarrierService.getCarrier('40q1un9r6iut6017kuailaddss', 'token')

      expect(getCarrier).toEqual(null)
      expect(axiosGetMethod).toHaveBeenCalledWith('http://carrier-api.com/carriers/40q1un9r6iut6017kuailaddss', {
        timeout: 2000,
        headers: {
          Authorization: 'token',
        },
      })
    })
  })
})
