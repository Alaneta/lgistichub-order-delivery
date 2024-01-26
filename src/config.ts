import * as dotenv from 'dotenv'
import { cleanEnv, host, num, port, str } from 'envalid'

dotenv.config({ path: `.setup/envvars/${process.env.NODE_ENV}/.env` })

export default cleanEnv(process.env, {
  NODE_ENV: str({ default: 'dev' }),
  SERVER_PORT: num({ default: 3000 }),
  DB_USER: str({ default: 'root' }),
  DB_PASSWORD: str({ default: '' }),
  DB_NAME: str({ default: 'logistichub' }),
  DB_HOST_READ: host({ default: 'localhost' }),
  DB_PORT_READ: port({ default: 3306 }),
  DB_HOST_WRITE: host({ default: 'localhost' }),
  DB_PORT_WRITE: port({ default: 3306 }),
  DB_POOL_MAX_CONNECTIONS: num({ default: 50 }),
  DB_POOL_MIN_CONNECTIONS: num({ default: 5 }),
  DB_POOL_IDLE_CONNECTIONS: num({ default: 10000 }),
  CARRIER_MANAGEMENT_API_URL: str({ default: 'http://localhost:9000/api' }),
  SQS_NOTIFICATION_QUEUE: str({ default: 'localhost' }),
  AWS_REGION: str({ default: 'us-east-1' }),
  SQS_ENDPOINT: str({ default: 'https://sqs.us-east-1.amazonaws.com' }),
})
