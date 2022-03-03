'use strict'
const MeiliSearch = require('./client')

module.exports = ({ strapi }) => {
  const store = strapi.plugin('meilisearch').service('store')
  return {
    /**
     * Get indexes with a safe guard in case of error.
     *
     * @returns { Promise<string[]> }
     */
    getIndexes: async function () {
      try {
        const { apiKey, host } = await store.getCredentials()
        const client = MeiliSearch({ apiKey, host })
        const indexes = await client.getIndexes()
        return indexes
      } catch (e) {
        console.error(e)
        return []
      }
    },
  }
}
