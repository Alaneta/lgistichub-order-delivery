import axios from 'axios'
import * as https from 'https'
import Logger from '../logger'
import { Messages } from '../global'
import tenants from '../tenants.json'
import { CustomError } from '../tools/customError'
import { UNPROCESSABLE_ENTITY } from 'http-status'
import { OrderDeliveryStoreUpdateReqDTO } from '../dtos/OrderDeliveryDTO'

class StoreService {
  async updateOrder(
    idOrder: number,
    idStore: string,
    orderDataToUpdate: OrderDeliveryStoreUpdateReqDTO,
    token: string
  ): Promise<void> {
    try {
      const tenant = tenants.tenants.find((_) => _.uuid === idStore)

      if (!tenant) throw new CustomError(Messages.storeUuidNotFound, UNPROCESSABLE_ENTITY)

      const { data } = await axios.put(
        `${tenant.baseUrl}modules/logistichub/api/update.php?idOrder=${idOrder}`,
        orderDataToUpdate,
        {
          httpsAgent: new https.Agent({
            rejectUnauthorized: false,
          }),
          headers: {
            Accept: 'application/json',
            Authorization: token,
          },
          timeout: 15000,
        }
      )
      Logger.info(data)
    } catch (err) {
      Logger.error(err)
    }
  }
}

export default new StoreService()
