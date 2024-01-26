import axios from 'axios'
import Config from '../config'
import Logger from '../logger'

export interface CarrierNotificationData {
  order_status_endpoint: string
  headers_auth: string
}

class CarrierService {
  async getCarrier(idCarrier: string, token: string): Promise<null | CarrierNotificationData> {
    try {
      const { data } = await axios.get(`${Config.CARRIER_MANAGEMENT_API_URL}/carriers/${idCarrier}`, {
        timeout: 2000,
        headers: {
          Authorization: token,
        },
      })

      Logger.debug(data)

      let carrierNotificationData: CarrierNotificationData | null = null
      if (data.orderStatusEndpoint) {
        carrierNotificationData = {
          order_status_endpoint: data.orderStatusEndpoint,
          headers_auth: data.headersAuth,
        }
      }
      return carrierNotificationData
    } catch (err) {
      Logger.error(err)
      return null
    }
  }
}

export default new CarrierService()
