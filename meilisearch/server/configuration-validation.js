const { isObject } = require('../utils')

function validateConfiguration(config) {
  // Validate the `contentTypes` parameter
  if (config.contentTypes) {
    const { contentTypes } = config

    if (!isObject(contentTypes)) {
      strapi.log.error(
        '`contentTypes` should be of type object in MeiliSearch configuration'
      )
      config.contentTypes = {}
    }

    for (const api in contentTypes) {
      if (!isObject(contentTypes[api])) {
        strapi.log.error(
          `the content type "${api}" in the MeiliSearch plugin config should be of type object`
        )
        config.contentTypes[api] = {}
      }
      if (
        (contentTypes[api].indexName &&
          contentTypes[api].indexName !== 'string',
        contentTypes[api].indexName !== '')
      ) {
        strapi.log.error(
          `the indexName param of "${api}" in the MeiliSearch plugin config should be a none empty string`
        )
        delete config.contentTypes[api].indexName
      }
      if (
        contentTypes[api].transformEntries &&
        contentTypes[api].transformEntries !== 'Function'
      ) {
        strapi.log.error(
          `the transformEntries param of "${api}" in the MeiliSearch plugin config should be of type Function`
        )
        delete config.contentTypes[api].transformEntries
      }

      if (contentTypes[api].settings && !isObject(contentTypes[api].settings)) {
        strapi.log.error(
          `the settings param of the "${api}" in the MeiliSearch plugin config should be of type Function`
        )
        delete config.contentTypes[api].settings
      }
    }
  }
}

module.exports = {
  validateConfiguration,
}
