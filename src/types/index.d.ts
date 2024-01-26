export {}

declare global {
  namespace Express {
    interface Request {
      clientID: string
      scopes: string[]
    }
  }
}
