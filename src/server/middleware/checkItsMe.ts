import Logger from '../../logger'
import { FORBIDDEN } from 'http-status'
import { Messages } from '../../global'
import { CustomError } from '../../tools/customError'
import { OrderDeliveryRepo } from '../../repositories'
import { NextFunction, Request, Response } from 'express'
import { SCOPE_CARRIER_READ, SCOPE_CARRIER_WRITE } from './scopeHandler'

export default async function checkItsMe(req: Request, res: Response, next: NextFunction) {
  try {
    const error = new CustomError(Messages.unauthorized, FORBIDDEN, 'Unauthorized to access info from carrier id')
    // If user is admin, no checking is needed
    if (req.scopes.includes(SCOPE_CARRIER_READ) || req.scopes.includes(SCOPE_CARRIER_WRITE)) {
      // Checks that idCarrier from query params equals clientID from request obtained from auth token
      if (!req.clientID || (req.query.idCarrier && req.clientID !== req.query.idCarrier)) throw error
      // Checks that idCarrier associated to OrderDelivery with same id of params.id equals clientID from request obtained from auth token
      if (req.params.id) {
        const orderDelivery = await OrderDeliveryRepo.findOneByIds(Number(req.params.id))
        if (orderDelivery && orderDelivery.idCarrier !== req.clientID) throw error
      }
    }
    next()
  } catch (err) {
    Logger.error(err)
    next(err)
  }
}
