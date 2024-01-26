export default class ExceptionHandler {
  static error_list = {
    SequelizeForeignKeyConstraintError: 'The asociated record does not exists',
    SequelizeUniqueConstraintError: 'The record already exists',
    SequelizeValidationError: 'Validation error',
  }

  static getMessage(e: unknown) {
    let message = 'Default error'

    if (e instanceof Error && e.name in this.error_list) {
      const errorName = e.name as keyof typeof this.error_list
      message = this.error_list[errorName]
    } else if (e instanceof Error) {
      message = e.message
    }

    return { message }
  }
}
