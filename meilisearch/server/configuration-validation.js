const { isObject } = require('../utils')

/**
 * Validates the plugin configuration provided in `plugins/config.js` of the users plugin configuration.
 * Modifies the value of config on place.
 *
 * @param  {object} config - configurations
 */
function validateConfiguration(config) {
  const validPluginField = ['contentTypes']
  const validApiFields = ['indexName', 'transformEntry', 'settings']

  if (!config) {
    return
  }

  if (!isObject(config)) {
    strapi.log.error(
      'The `config` field in the MeiliSearch  plugin configuration must be of type object'
    )
    throw new Error(
      'Configuration field of the MeiliSearch plugin must be of type object'
    )
  }

  // Validate the attributes
  Object.keys(config).forEach(attribute => {
    if (!validPluginField.includes(attribute)) {
      strapi.log.warn(
        `The field "${attribute}" in the MeiliSearch plugin config is not a valid parameter`
      )
      delete config[attribute]
    }
  })

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
          typeof contentTypes[api].indexName !== 'string') ||
        contentTypes[api].indexName === ''
      ) {
        strapi.log.error(
          `the indexName param of "${api}" in the MeiliSearch plugin config should be a none empty string`
        )
        delete config.contentTypes[api].indexName
      }
      if (
        contentTypes[api].transformEntry &&
        typeof contentTypes[api].transformEntry !== 'function'
      ) {
        strapi.log.error(
          `the transformEntry param of "${api}" in the MeiliSearch plugin config should be of type Function`
        )
        delete config.contentTypes[api].transformEntry
      }

      if (contentTypes[api].settings && !isObject(contentTypes[api].settings)) {
        strapi.log.error(
          `the settings param of the "${api}" in the MeiliSearch plugin config should be of type Function`
        )
        delete config.contentTypes[api].settings
      }

      Object.keys(contentTypes[api]).forEach(attribute => {
        if (!validApiFields.includes(attribute)) {
          strapi.log.warn(
            `${attribute} in "${api}" in the MeiliSearch plugin config is not a valid parameter`
          )
          delete contentTypes[api][attribute]
        }
      })
    }
  }
}

module.exports = {
  validateConfiguration,
}
