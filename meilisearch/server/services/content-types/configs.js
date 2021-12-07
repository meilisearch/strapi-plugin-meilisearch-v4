'use strict'

// module.exports = ({ services, models, logger }) => {
module.exports = ({ strapi }) => {
  return {
    /**
     * Get the name of the index in which the collection is added.
     *
     * @param collection - Name of the Collection.
     *
     * @return {String} - Actual index name
     */
    getIndexName: function (collection) {
      const conf =
        strapi?.api[collection]?.services[collection]?.meilisearch || {}
      const indexName = conf.indexName || collection
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
    transformEntries: function ({ collection, entries = [] }) {
      const conf =
        strapi?.api[collection]?.services[collection]?.meilisearch || {}

      try {
        if (
          Array.isArray(entries) &&
          typeof conf?.transformEntry === 'function'
        ) {
          return entries.map(entry =>
            conf.transformEntry({
              entry,
              collection,
            })
          )
        }
      } catch (e) {
        console.log(e)
        return entries
      }
      return entries
    },

    /**
     * Returns MeiliSearch index settings from model definition.
     * @param collection - Name of the Collection.
     * @typedef Settings
     * @type {import('meilisearch').Settings}
     * @return {Settings} - MeiliSearch index settings
     */
    getSettings: function ({ collection }) {
      const conf =
        strapi?.api[collection]?.services[collection]?.meilisearch || {}
      const settings = conf.settings || {}
      return settings
    },
  }
}
