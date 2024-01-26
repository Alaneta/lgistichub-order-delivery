import axios from 'axios'
import StoreService from '../StoreService'

jest.mock('../../tenants.json', () => ({
  tenants: [
    {
      uuid: '071b7da4-66ad-11ed-bd50-0242ac180007',
      name: 'VALYRIO DEV',
      baseUrl: 'https://valyrio-dev.aper.cloud/',
    },
  ],
}))

describe('StoreService', () => {
  afterEach(async () => {
    jest.clearAllMocks()
  })

  describe('updateOrder method', () => {
    it('should execute axios put request on valid idStore', async () => {
      jest.mock('axios')
      const mockedAxios = axios as jest.Mocked<typeof axios>
      const axiosPutMethod = jest.spyOn(mockedAxios, 'put').mockResolvedValue({ data: 'PUT result' })

      const updateOrderResult = await StoreService.updateOrder(
        1,
        '071b7da4-66ad-11ed-bd50-0242ac180007',
        {
          status: 1,
          trackingCode: 'some tracking Code',
          trackingLink: 'www.tracking.com',
        },
        'token'
      )

      expect(updateOrderResult).toEqual(undefined)
      expect(axiosPutMethod).toHaveBeenCalled()
    })
  })

  it('should return null when idStore from parameter is not present in tenants.json', async () => {
    const updateOrderResult = await StoreService.updateOrder(
      1,
      '000002bb-66ae-11ed-bd50-0242ac180007',
      {
        status: 1,
        trackingCode: 'some tracking Code',
        trackingLink: 'www.tracking.com',
      },
      'token'
    )
    expect(updateOrderResult).toEqual(undefined)
  })
})
