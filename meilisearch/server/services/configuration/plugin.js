'use strict'

// module.exports = ({ services, models, logger }) => {
module.exports = ({ strapi }) => {
  return {
    /**
     * @brief: Map model name into the actual index name in meilisearch instance. it
     * uses `indexName` property from model defnition
     *
     * @param collection - Name of the Collection.
     *
     * @return {String} - Actual index name
     */
    getIndexName: function (collection) {
      const config = strapi.config.get('plugin.meilisearch')
      const contentConfig = config.contentTypes[collection]
      const indexName = contentConfig.indexName || collection
      if (typeof indexName !== 'string') {
        strapi.logger.warn(
          `[MEILISEARCH]: "indexName" setting provided in the model of the ${collection} must be a string.`
        )
        return collection
      }
      return indexName
    },

    /**
     * Transform collection entries before indexation in MeiliSearch.
     *
     * @param {string} collection - Collection name.
     * @param {Array<Object>} data  - The data to convert. Conversion will use
     * the static method `toSearchIndex` defined in the model definition
     *
     * @return {Array<Object>} - Converted or mapped data
     */
    // transformEntries: function ({ collection, entries }) {
    //   const meilisearchConfig = models[collection].meilisearch || {}
    //   const { transformEntry } = meilisearchConfig

    //   if (!transformEntry) {
    //     return entries
    //   }
    //   try {
    //     if (Array.isArray(entries)) {
    //       return entries.map(entry =>
    //         meilisearchConfig.transformEntry({
    //           entry,
    //           model: models[collection],
    //           collection,
    //         })
    //       )
    //     }
    //   } catch (e) {
    //     console.log(e)
    //     return entries
    //   }
    //   return entries
    // },

    // /**
    //  * Returns MeiliSearch index settings from model definition.
    //  * @param collection - Name of the Collection.
    //  * @typedef Settings
    //  * @type {import('meilisearch').Settings}
    //  * @return {Settings} - MeiliSearch index settings
    //  */
    // getSettings: function (collection) {
    //   const model = models[collection].meilisearch || {}
    //   const settings = model.settings || {}

    //   if (typeof settings !== 'object') {
    //     logger.warn(
    //       `[MEILISEARCH]: "settings" provided in the model of the ${collection} must be an object.`
    //     )
    //     return {}
    //   }

    //   return settings
    // },
  }
}
