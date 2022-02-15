'use strict'
// TODO: fetch documents ✅
// Bulk action with fetched documents ✅
// TODO: Use filtering configuration for entry fetching
// TODO: listCollectionsWithIndexName -> Return all collections having the provided indexName setting. ✅
// TODO: numberOfEntries/totalNumberOfEntries -> Number of entries in a collection.  ✅
// TODO: allEligbleCollections (not only multi type collections) ❌ Temp: getApisName
// TODO: getEntriesBatch ✅

module.exports = ({ strapi }) => ({
  /**
   * Get all API names existing in Strapi instance.
   *
   * Api names are formatted like this: `apiName`
   *
   * @returns {string[]} - list of all `api's` in Strapi.
   */
  // TODO: how do you get the list of all content-types/API's
  getApisName() {
    const { contentTypes } = strapi

    const apis = Object.keys(contentTypes)
      .filter(contentType => contentType.startsWith('api::'))
      .reduce((apiNames, api) => {
        apiNames.push(contentTypes[api].apiName)
        return apiNames
      }, [])

    return apis
  },

  /**
   * Get all content types name being API's existing in Strapi instance.
   *
   * Content Types are formated like this: `api::apiName.apiName`
   *
   * @returns {string[]} - list of all `content types` in Strapi in format "api:apiName.apiName"
   */
  getContentTypesName() {
    const contentTypes = Object.keys(strapi.contentTypes).filter(contentType =>
      contentType.startsWith('api::')
    )
    return contentTypes
  },

  /**
   * Get all content types being API's existing in Strapi instance.
   *
   * @returns {string[]} - list of all `content types` in Strapi in format "api:apiName.apiName"
   */
  getContentTypes() {
    const contenTypes = Object.keys(strapi.contentTypes).reduce(
      (contentApis, contentName) => {
        if (contentName.startsWith('api::')) {
          contentApis[contentName] = strapi.contentTypes[contentName]
        }
        return contentApis
      },
      {}
    )
    return contenTypes
  },

  /**
   * Wether the collection exists or not
   *
   * @param  {string} collection - Name of the collection.
   *
   * @returns  {number}
   */
  collectionExists({ collection }) {
    return !!this.getApisName().find(api => api === collection)
  },

  /**
   * Return all collections having the provided indexName setting.
   *
   * @param  {string} indexName
   */
  listCollectionsWithIndexName: async function ({ indexName }) {
    const multiRowsCollections = this.getApisName() || []
    const collectionsWithIndexName = multiRowsCollections.filter(
      collection =>
        strapi
          .plugin('meilisearch')
          .service('contentTypes')
          .getIndexName({ indexName: collection }) === indexName
    )
    return collectionsWithIndexName
  },

  /**
   * Number of entries in a collection.
   *
   * @param  {string} collection - Name of the collection.
   *
   * @returns  {number}
   */
  numberOfEntries: async function ({ collection, where = {} }) {
    if (!this.collectionExists({ collection })) return 0
    const count = await strapi.db
      .query(`api::${collection}.${collection}`)
      .count({ where })
    return count
  },

  /**
   * Returns the total number of entries of the collections.
   *
   * @param  {string[]} collections
   *
   * @returns {number} Total entries number.
   */
  totalNumberOfEntries: async function ({ collections }) {
    let collectionsEntriesSize = await Promise.all(
      collections.map(async col => await this.numberOfEntries(col))
    )
    return collectionsEntriesSize.reduce((acc, curr) => (acc += curr), 0)
  },

  /**
   * Returns a batch of entries.
   *
   * @param  {object} batchOptions
   * @param  {number} start - Starting batch number.
   * @param  {number} limit - Size of batch.
   * @param  {string} collection - Collection name.
   *
   * @returns  {object[]} - Entries.
   */
  async findManyOfCollection({ collection, start = 0, limit = 500 }) {
    if (!this.collectionExists({ collection })) return []

    // TODO: get filters from settings
    // https://docs.strapi.io/developer-docs/latest/developer-resources/database-apis-reference/entity-service/crud.html#findmany
    const entries = await strapi.entityService.findMany(
      `api::${collection}.${collection}`,
      {
        publicationState: 'live',
        start,
        limit,
      }
    )
    return entries || []
  },

  /**
   * Apply an action on all the entries of the provided collection.
   *
   * @param  {string} collection
   * @param  {function} callback - Function applied on each entry of the collection
   *
   * @returns {any[]} - List of all the returned elements from the callback.
   */
  actionInBatches: async function ({ collection, callback }) {
    const BATCH_SIZE = 500
    // Need total number of entries in collection
    const entries_count = await this.numberOfEntries({ collection })
    const response = []

    for (let index = 0; index <= entries_count; index += BATCH_SIZE) {
      const entries =
        (await this.findManyOfCollection({
          start: index,
          limit: BATCH_SIZE,
          collection,
        })) || []
      const info = await callback(entries, collection)
      if (info != null) response.push(info)
    }
    return response
  },
})
