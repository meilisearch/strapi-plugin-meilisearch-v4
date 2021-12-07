const { validateConfiguration } = require('../configuration-validation')

const strapiMock = {
  log: {
    error: jest.fn(() => 'test'),
    warn: jest.fn(() => 'test'),
  },
}
global.strapi = strapiMock

describe('Test plugin configuration file', () => {
  beforeEach(async () => {
    jest.clearAllMocks()
    jest.restoreAllMocks()
  })

  test('Test empty configuration', async () => {
    validateConfiguration()
    expect(strapiMock.log.warn).toHaveBeenCalledTimes(0)
    expect(strapiMock.log.error).toHaveBeenCalledTimes(0)
  })

  test('Test empty object configuration', async () => {
    validateConfiguration({})
    expect(strapiMock.log.warn).toHaveBeenCalledTimes(0)
    expect(strapiMock.log.error).toHaveBeenCalledTimes(0)
  })

  test('Test configuration with not used attribute', async () => {
    validateConfiguration({
      hello: 1,
    })
    expect(strapiMock.log.warn).toHaveBeenCalledTimes(1)
    expect(strapiMock.log.error).toHaveBeenCalledTimes(0)
  })

  test('Test configuration with empty contentTypes ', async () => {
    validateConfiguration({
      contentTypes: {},
    })
    expect(strapiMock.log.warn).toHaveBeenCalledTimes(0)
    expect(strapiMock.log.error).toHaveBeenCalledTimes(0)
  })

  test('Test configuration with empty fields in contentTypes ', async () => {
    validateConfiguration({
      contentTypes: {
        restaurant: {},
      },
    })
    expect(strapiMock.log.warn).toHaveBeenCalledTimes(0)
    expect(strapiMock.log.error).toHaveBeenCalledTimes(0)
  })

  test('Test configuration with wrong parameter in contentType ', async () => {
    validateConfiguration({
      contentTypes: {
        restaurant: {
          test: 1,
        },
      },
    })
    expect(strapiMock.log.warn).toHaveBeenCalledTimes(1)
    expect(strapiMock.log.error).toHaveBeenCalledTimes(0)
  })

  test('Test configuration with indexName parameter in contentType ', async () => {
    validateConfiguration({
      contentTypes: {
        restaurant: {
          indexName: 'test',
        },
      },
    })
    expect(strapiMock.log.warn).toHaveBeenCalledTimes(0)
    expect(strapiMock.log.error).toHaveBeenCalledTimes(0)
  })

  test('Test configuration with empty string indexName parameter in contentType ', async () => {
    validateConfiguration({
      contentTypes: {
        restaurant: {
          indexName: '',
        },
      },
    })
    expect(strapiMock.log.warn).toHaveBeenCalledTimes(0)
    expect(strapiMock.log.error).toHaveBeenCalledTimes(1)
  })

  test('Test configuration with wrong type indexName parameter in contentType ', async () => {
    validateConfiguration({
      contentTypes: {
        restaurant: {
          indexName: 1,
        },
      },
    })
    expect(strapiMock.log.warn).toHaveBeenCalledTimes(0)
    expect(strapiMock.log.error).toHaveBeenCalledTimes(1)
  })

  test('Test configuration with transformEntry parameter in contentType ', async () => {
    validateConfiguration({
      contentTypes: {
        restaurant: {
          transformEntry: () => {},
        },
      },
    })
    expect(strapiMock.log.warn).toHaveBeenCalledTimes(0)
    expect(strapiMock.log.error).toHaveBeenCalledTimes(0)
  })

  test('Test configuration with bad type transformEntry parameter in contentType ', async () => {
    validateConfiguration({
      contentTypes: {
        restaurant: {
          transformEntry: 1,
        },
      },
    })
    expect(strapiMock.log.warn).toHaveBeenCalledTimes(0)
    expect(strapiMock.log.error).toHaveBeenCalledTimes(1)
  })

  test('Test configuration with settings parameter in contentType ', async () => {
    validateConfiguration({
      contentTypes: {
        restaurant: {
          settings: {},
        },
      },
    })
    expect(strapiMock.log.warn).toHaveBeenCalledTimes(0)
    expect(strapiMock.log.error).toHaveBeenCalledTimes(0)
  })

  test('Test configuration with bad type settings parameter in contentType ', async () => {
    validateConfiguration({
      contentTypes: {
        restaurant: {
          settings: 1,
        },
      },
    })
    expect(strapiMock.log.warn).toHaveBeenCalledTimes(0)
    expect(strapiMock.log.error).toHaveBeenCalledTimes(1)
  })
})
