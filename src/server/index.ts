import express, { Express } from 'express'
import cookieParser from 'cookie-parser'
import bodyParser from 'body-parser'
import { Routes } from '../router'
import loggerMiddleware from './middleware/logger'
import errorHandler from './middleware/errorHandler'

// Swagger
import swaggerUI from 'swagger-ui-express'
import { options } from './swaggerOptions'
import swaggerJSDoc from 'swagger-jsdoc'

import { scopeGetter } from './middleware/scopeHandler'

/**
 * The entry-point for the application.
 * This is where we will instantiate the server and configure
 * it before we start listening for requests.
 */
export class ServerApp {
  /**
   * Starts the server application.
   */
  public static getInstance(): Express {
    // Initialize the server object.
    const app = express()

    app.disable('x-powered-by')

    app.use(loggerMiddleware)
    app.use(bodyParser.json())
    // app.use(scopeGetter)
    app.use(cookieParser())

    const specs = swaggerJSDoc(options)

    // Build routes
    app.use('/api', scopeGetter, Routes)
    app.use('/docs', swaggerUI.serve, swaggerUI.setup(specs))

    app.use(errorHandler)

    return app
  }
}
