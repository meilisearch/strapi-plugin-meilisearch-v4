const apis = {
  restaurant: 'api::restaurant.restaurant',
  about: 'api::about:about',
}

function createFakeStrapi({ restaurantConfig = {}, aboutConfig = {} }) {
  const fakeService = jest.fn(api => {
    if (api == 'api::restaurant.restaurant') {
      return {
        ...restaurantConfig,
      }
    } else if (api == 'api::about.about') {
      return {
        ...aboutConfig,
      }
    }
  })

  const fakePlugin = jest.fn(() => ({
    service: fakePluginService,
  }))

  const fakePluginService = jest.fn(() => ({
    getApis: fakeGetApiFunction,
  }))

  const fakeGetApiFunction = jest.fn(() => {
    return ['api::restaurant.restaurant', 'api::about.about']
  })

  const fakeLogger = {
    error: jest.fn(() => 'test'),
    warn: jest.fn(() => 'test'),
  }
  const fakeStrapi = {
    log: fakeLogger,
    service: fakeService,
    plugin: fakePlugin,
  }
  return fakeStrapi
}

module.exports = {
  createFakeStrapi,
  apis,
}
