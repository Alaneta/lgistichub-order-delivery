import Config from './config'
require('newrelic')
import { ServerApp } from './server'
import { Database } from './database'
import Logger from './logger'

async function main() {
  try {
    await Database.connect()

    const app = await ServerApp.getInstance()
    const srv = app.listen(Config.SERVER_PORT)

    Logger.info(`Environment: ${Config.NODE_ENV}`)
    Logger.info(`Server is listening on port ${Config.SERVER_PORT}`)

    srv.on('error', (error) => {
      Logger.error(error)
    })
  } catch (err) {
    Logger.error(err)
    process.exit(1)
  }
}

main()
