import { CustomError } from '../../tools/customError'
import { Request, Response } from 'express'
import { INTERNAL_SERVER_ERROR, UNPROCESSABLE_ENTITY } from 'http-status'

export default function errorHandler(err: Error | CustomError, req: Request, res: Response) {
  const errorList = {
    SequelizeForeignKeyConstraintError: 'The asociated record does not exists',
    SequelizeUniqueConstraintError: 'The record already exists',
    SequelizeValidationError: 'Validation error',
  }
  let customError = err

  if (!(err instanceof CustomError)) {
    customError = new CustomError(
      'An internal server error occurred. The request could not be processed.',
      INTERNAL_SERVER_ERROR
    )
    if (err.name in errorList) {
      customError = new CustomError(errorList[err.name], UNPROCESSABLE_ENTITY)
    }
  }
  res.status((customError as CustomError).status).send(customError)
}
