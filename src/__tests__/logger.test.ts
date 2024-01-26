import Logger from '../logger'

jest.mock('../config.ts', () => ({
  isProduction: true,
}))

describe('Logger class', () => {
  afterEach(async () => {
    jest.clearAllMocks()
  })

  it('Should set level to info if config is set to production ', async () => {
    jest.doMock('../config.ts', () => ({
      isProduction: true,
    }))

    expect(Logger.level).toEqual('info')
  })
})
