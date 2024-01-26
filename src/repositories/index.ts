import { Models } from '../models'
import { OrderDeliveryRepository } from './OrderDeliveryRepository'

const OrderDeliveryRepo = new OrderDeliveryRepository(Models)

export { OrderDeliveryRepo }
