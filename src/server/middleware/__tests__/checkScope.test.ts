import {
  checkScope,
  SCOPE_ALLCARRIER_READ,
  SCOPE_ALLCARRIER_WRITE,
  SCOPE_CARRIER_READ,
  SCOPE_CARRIER_WRITE,
} from '../scopeHandler'

describe('checkScope middleware', () => {
  afterEach(async () => {
    jest.clearAllMocks()
  })

  it('Should return error if request scope is not included in allowed endpoint scopes', async () => {
    const res = {}
    const next = jest.fn()
    const req = { scopes: [SCOPE_CARRIER_READ, SCOPE_CARRIER_WRITE] }
    const checkScopeResult = checkScope([SCOPE_ALLCARRIER_READ, SCOPE_ALLCARRIER_WRITE])

    expect(() => checkScopeResult(<never>req, <never>res, next)).toThrow('Not authorized')
    expect(next).not.toHaveBeenCalled()
  })

  it('Should return no error if request scope is included in allowed endpoint scopes', async () => {
    const res = {}
    const next = jest.fn()
    const req = { scopes: [SCOPE_CARRIER_READ, SCOPE_CARRIER_WRITE] }
    const checkScopeResult = checkScope([SCOPE_CARRIER_READ])

    expect(() => checkScopeResult(<never>req, <never>res, next)).not.toThrow('Not authorized')
    expect(next).toHaveBeenCalled()
  })
})
