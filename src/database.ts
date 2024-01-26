import { Sequelize, SequelizeOptions } from 'sequelize-typescript'
import { ModelsList } from './models'
import Config from './config'

export class Database {
  public static async connect(): Promise<Sequelize> {
    const options: SequelizeOptions = {
      dialect: 'mysql',
      database: Config.DB_NAME,

      replication: {
        read: [
          {
            port: Config.DB_PORT_READ,
            host: Config.DB_HOST_READ,
            username: Config.DB_USER,
            password: Config.DB_PASSWORD,
          },
        ],
        write: {
          port: Config.DB_PORT_WRITE,
          host: Config.DB_HOST_WRITE,
          username: Config.DB_USER,
          password: Config.DB_PASSWORD,
        },
      },
      logging: !Config.isProduction,
      models: ModelsList,
      pool: {
        max: Config.DB_POOL_MAX_CONNECTIONS,
        min: Config.DB_POOL_MIN_CONNECTIONS,
        idle: Config.DB_POOL_IDLE_CONNECTIONS,
      },
    }

    const sequelize = new Sequelize(options)
    await sequelize.authenticate()

    if (!Config.isProduction) {
      await sequelize.sync()
    }

    return sequelize
  }
}
