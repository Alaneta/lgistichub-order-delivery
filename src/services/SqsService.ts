import AWS from 'aws-sdk'
import config from '../config'
import NotificationDTO from '../dtos/NotificationDTO'
import Logger from '../logger'

interface ConfigAws {
  region: string
  accessKeyId?: string
  secretAccessKey?: string
  endpoint?: string
}

const configSqs: ConfigAws = {
  region: config.AWS_REGION,
  endpoint: config.SQS_ENDPOINT,
}

if (config.NODE_ENV === 'local') {
  configSqs.accessKeyId = 'testUser'
  configSqs.secretAccessKey = 'testAccesskey'
}

const sqs = new AWS.SQS(configSqs)

class SqsService {
  sendNotification(message: NotificationDTO) {
    Logger.debug(message)
    const queue: string = configSqs.endpoint as string
    const params = {
      MessageBody: JSON.stringify(message),
      QueueUrl: queue,
    }

    sqs
      .sendMessage(params)
      .promise()
      .catch((err) => {
        Logger.error(err)
      })
  }
}

export default new SqsService()
