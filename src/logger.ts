import pino from 'pino'
import pretty from 'pino-pretty'
import Config from './config'

const stream = pretty({
  translateTime: true,
  colorize: !Config.isProduction,
  ignore: 'pid',
})

const logger = pino(
  {
    level: Config.isProduction ? 'info' : 'debug',
  },
  stream
)

export default logger
