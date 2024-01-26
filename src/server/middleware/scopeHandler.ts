import axios from 'axios'
import { FORBIDDEN } from 'http-status'
import { Messages } from '../../global'
import { CustomError } from '../../tools/customError'
import { NextFunction, Request, Response } from 'express'
import _ from 'lodash'

export const SCOPE_CARRIER_READ = 'carriers/carriers:read'
export const SCOPE_CARRIER_WRITE = 'carriers/carriers:write'

// need resourceserver/scope
export const SCOPE_ALLCARRIER_READ = 'logistic/allcarriers:read'
export const SCOPE_ALLCARRIER_WRITE = 'logistic/allcarriers:write'

export const SCOPE_STORE_READ = 'logistic/store:read'
export const SCOPE_STORE_WRITE = 'logistic/store:write'

declare global {
  /* eslint-disable no-var, vars-on-top */
  var hasCarrierScope: boolean
}

export function scopeGetter(req: Request, res: Response, next: NextFunction) {
  if (!req.headers.authorization) {
    throw new CustomError(Messages.unauthorized, FORBIDDEN, req.params)
  }

  const token = req.headers.authorization
  const payload = JSON.parse(Buffer.from(token.split('.')[1], 'base64').toString())

  req.scopes = payload.scope.split(' ')
  req.clientID = payload.client_id

  next()
}

export function fcheckScope(scoperReq: string[], scopes: string[]) {
  return _.some(scopes, (scope) => scoperReq.includes(scope))
}

export function checkScope(scopes: string[]) {
  return (req: Request, res: Response, next: NextFunction) => {
    global.hasCarrierScope = !!req.scopes.includes(SCOPE_CARRIER_WRITE)
    const hasScope = fcheckScope(req.scopes, scopes)

    if (!hasScope) throw new CustomError(Messages.unauthorized, FORBIDDEN)

    next()
  }
}
