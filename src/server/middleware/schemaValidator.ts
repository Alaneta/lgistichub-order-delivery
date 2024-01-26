import Logger from '../../logger'
import { Messages } from '../../global'
import { UNPROCESSABLE_ENTITY } from 'http-status'
import { SchemaValidators } from '../../validators'
import { CustomError } from '../../tools/customError'
import { Request, Response, NextFunction } from 'express'
import { SCOPE_ALLCARRIER_WRITE, SCOPE_CARRIER_WRITE, SCOPE_STORE_WRITE } from './scopeHandler'

// Global middleware function use to validate all requests
export default function schemaValidator(req: Request, res: Response, next: NextFunction) {
  try {
    const {
      method,
      route: { path },
    } = req

    if (path in SchemaValidators && method in SchemaValidators[path]) {
      const schemas = SchemaValidators[path][method]
      for (const schema of schemas) {
        const context = {
          isCarrier: req.scopes.includes(SCOPE_CARRIER_WRITE),
          isStore: req.scopes.includes(SCOPE_STORE_WRITE),
          isAdmin: req.scopes.includes(SCOPE_ALLCARRIER_WRITE),
        }

        const validationError = schema.name.validate(req[<never>schema.type], { context }).error

        if (validationError) {
          throw new CustomError(Messages[path][method].fail, UNPROCESSABLE_ENTITY, validationError.details[0].message)
        }
      }
    }
    next()
  } catch (err) {
    Logger.error(err)
    next(err)
  }
}
