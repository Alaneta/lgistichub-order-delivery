import request from 'supertest'
import { ServerApp } from '../../server'
import { OK } from 'http-status'

const app = ServerApp.getInstance()

describe('GET /api/healthcheck', () => {
  afterEach(async () => {
    jest.clearAllMocks()
  })

  it('Should return status code 200/OK', async () => {
    const response = await request(app)
      .get('/api/healthcheck')
      .set(
        'Authorization',
        'Bearer eyJraWQiOiI4ZnVvVmZLSFpyWlNyOE1cL2hKUlVjaE0zV0ltXC9Ua1hTXC9WSDBpSjlzUmhVPSIsImFsZyI6IlJTMjU2In0.eyJzdWIiOiI0c2FrNmc5ZDk0Y3BsNjJybzQya2F0czUzNCIsInRva2VuX3VzZSI6ImFjY2VzcyIsInNjb3BlIjoiYXBpXC9jYXJyaWVyczp3cml0ZSBhcGlcL2NhcnJpZXJzOnJlYWQiLCJhdXRoX3RpbWUiOjE2NjYxOTM2MTQsImlzcyI6Imh0dHBzOlwvXC9jb2duaXRvLWlkcC51cy1lYXN0LTEuYW1hem9uYXdzLmNvbVwvdXMtZWFzdC0xX2xDV3lRMlVmaiIsImV4cCI6MTY2NjE5NzIxNCwiaWF0IjoxNjY2MTkzNjE0LCJ2ZXJzaW9uIjoyLCJqdGkiOiIxMjJmNDZmOS01OWE2LTQ4OWMtYjU5OC03MTg1MTUxODRjMzYiLCJjbGllbnRfaWQiOiI0c2FrNmc5ZDk0Y3BsNjJybzQya2F0czUzNCJ9.mEyyYtgu-ftpBAzn_1Qfc8Ao1-_6AMPNR8jKa4QYgf_rr7zBG1ubVLfhP7pU3yWREH31_BGADAD5lrMRsn2ZXENNyu793FpuaiK7siR4xSrqFQZu6-9x-Fz7aBdQEeeLZOA60S1sgp3hZE39V-i65Qxc9D-RISXCHMZICF6asVZx5lShVdAjdgnb6zkTjBL04ZrFheloRQCJ99dSeyTx3Mpy4Pvb0OhNTAkCrxpN_MJENVU8_sCZ7SJgZ5ejQOjK1xO2BeKfP0RDQ7VH-MLOx7CbJ-vVg3y8kHBAK3bkudo90w4inPwu5WawQu9JxNJ9QaPGC14lyx4hPARMo5RKOA'
      )
    expect(response.statusCode).toBe(OK)
  })
})
