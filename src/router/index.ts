import { Router } from 'express'
import { OrderDelivery } from './orderDelivery'
import { HealthcheckRouter } from './healthcheck'

export const Routes = Router()

Routes.use('/', OrderDelivery)
Routes.use(HealthcheckRouter)
