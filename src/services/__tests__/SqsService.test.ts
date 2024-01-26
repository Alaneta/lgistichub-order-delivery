import SqsService from '../SqsService'
import AWS from 'aws-sdk'
import NotificationDTO from '../../dtos/NotificationDTO'
import { json } from 'body-parser'

jest.mock('aws-sdk', () => {
  const SQSMocked = {
    sendMessage: jest.fn().mockReturnThis(),
    promise: jest.fn(),
  }
  return {
    SQS: jest.fn(() => SQSMocked),
  }
})

const sqs = new AWS.SQS({
  region: 'us-east-1',
})

const queue: string = 'hhtttp://quieue'

describe('SqsService', () => {
  beforeEach(() => {
    ;(sqs.sendMessage().promise as jest.MockedFunction<any>).mockReset()
  })

  describe('SendNotification', () => {
    it('should send Notification', async () => {
      const notification: NotificationDTO = {
        carrierEndpoint: 'http://endpoint',
        headers: '',
        order: '',
      }

      expect(jest.isMockFunction(sqs.sendMessage)).toBeTruthy()
      expect(jest.isMockFunction(sqs.sendMessage().promise)).toBeTruthy()
      ;(sqs.sendMessage().promise as jest.MockedFunction<any>).mockResolvedValueOnce('mocked data')
      await SqsService.sendNotification(notification)

      expect(sqs.sendMessage().promise).toBeCalledTimes(1)
    })
  })
})
