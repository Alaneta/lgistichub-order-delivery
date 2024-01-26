import { scopeGetter } from '../scopeHandler'

describe('scopeGetter middleware', () => {
  afterEach(async () => {
    jest.clearAllMocks()
  })

  it('Should return request with clientID and scopes if auth token is present in req.headers', async () => {
    const res = {}
    const next = jest.fn()
    const req = {
      headers: {
        authorization:
          'eyJraWQiOiJzb0laWFRvbTF6UjJEMHEzajkyWEsrc1VydVdPckQ5SGd6NVd2VExET1VnPSIsImFsZyI6IlJTMjU2In0.eyJzdWIiOiJmMmNsNDkxaDdkYWIzYmZlNDM2MHM1aTRpIiwidG9rZW5fdXNlIjoiYWNjZXNzIiwic2NvcGUiOiJhZG1pblwvYWRtaW46d3JpdGUgYWRtaW5cL2FkbWluOnJlYWQiLCJhdXRoX3RpbWUiOjE2NjY4ODQzMDksImlzcyI6Imh0dHBzOlwvXC9jb2duaXRvLWlkcC51cy1lYXN0LTEuYW1hem9uYXdzLmNvbVwvdXMtZWFzdC0xX205TkNId3JCdiIsImV4cCI6MTY2Njg4NzkwOSwiaWF0IjoxNjY2ODg0MzA5LCJ2ZXJzaW9uIjoyLCJqdGkiOiI3ZjAzODUyYy1jZTk5LTRiN2UtYThiMC0wY2I0ZjlmZTJjYzUiLCJjbGllbnRfaWQiOiJmMmNsNDkxaDdkYWIzYmZlNDM2MHM1aTRpIn0.oTEQ09JSRm0OtCPRnFc8Y0hIKb5QRNah04DJeNM9xHXlH7Ehxv1YANOkb-xWv2EYR0MoodpSioirZ6ev34tKq3akLZ6vwJMZ3IW1oUYFl7hoZhkA-OWFiPcvli2L8AiLaGWMQx6l1svFnRFmKufwWXvvJNTGue15Igng8cezuX6f63q4bgoB1ATKwXHmV6avv2oR_d8hZ-4qXZhcCW523Q4OqWwHqgttsWhTA0MaXt4r6ZpkE8M74LXsiHyoqpyFgsergy8EmXDQqBBkUXdx2ZPDLfjKi9YcTS7bE5qReE_gCYHkr8rfPRB-R3u-bowB5CdHnTNtFYqAfrzj0WnKlQ',
      },
    }

    scopeGetter(<never>req, <never>res, next)

    expect(req).toEqual({
      clientID: 'f2cl491h7dab3bfe4360s5i4i',
      scopes: ['admin/admin:write', 'admin/admin:read'],
      headers: {
        authorization:
          'eyJraWQiOiJzb0laWFRvbTF6UjJEMHEzajkyWEsrc1VydVdPckQ5SGd6NVd2VExET1VnPSIsImFsZyI6IlJTMjU2In0.eyJzdWIiOiJmMmNsNDkxaDdkYWIzYmZlNDM2MHM1aTRpIiwidG9rZW5fdXNlIjoiYWNjZXNzIiwic2NvcGUiOiJhZG1pblwvYWRtaW46d3JpdGUgYWRtaW5cL2FkbWluOnJlYWQiLCJhdXRoX3RpbWUiOjE2NjY4ODQzMDksImlzcyI6Imh0dHBzOlwvXC9jb2duaXRvLWlkcC51cy1lYXN0LTEuYW1hem9uYXdzLmNvbVwvdXMtZWFzdC0xX205TkNId3JCdiIsImV4cCI6MTY2Njg4NzkwOSwiaWF0IjoxNjY2ODg0MzA5LCJ2ZXJzaW9uIjoyLCJqdGkiOiI3ZjAzODUyYy1jZTk5LTRiN2UtYThiMC0wY2I0ZjlmZTJjYzUiLCJjbGllbnRfaWQiOiJmMmNsNDkxaDdkYWIzYmZlNDM2MHM1aTRpIn0.oTEQ09JSRm0OtCPRnFc8Y0hIKb5QRNah04DJeNM9xHXlH7Ehxv1YANOkb-xWv2EYR0MoodpSioirZ6ev34tKq3akLZ6vwJMZ3IW1oUYFl7hoZhkA-OWFiPcvli2L8AiLaGWMQx6l1svFnRFmKufwWXvvJNTGue15Igng8cezuX6f63q4bgoB1ATKwXHmV6avv2oR_d8hZ-4qXZhcCW523Q4OqWwHqgttsWhTA0MaXt4r6ZpkE8M74LXsiHyoqpyFgsergy8EmXDQqBBkUXdx2ZPDLfjKi9YcTS7bE5qReE_gCYHkr8rfPRB-R3u-bowB5CdHnTNtFYqAfrzj0WnKlQ',
      },
    })
    expect(next).toHaveBeenCalledWith()
  })

  it('Should return error if auth token is not present in req.headers', async () => {
    const res = {}
    const next = jest.fn()
    const req = { headers: {} }

    expect(() => scopeGetter(<never>req, <never>res, next)).toThrowError('Not authorized')
    expect(next).not.toHaveBeenCalledWith()
  })
})
