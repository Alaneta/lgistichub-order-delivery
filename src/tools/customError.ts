export class CustomError extends Error {
  readonly status: number

  readonly additionalInfo: any

  constructor(message: string, status = 500, additionalInfo = {}) {
    super(message)
    this.name = 'CustomError'
    this.status = status
    this.additionalInfo = additionalInfo
  }
}
