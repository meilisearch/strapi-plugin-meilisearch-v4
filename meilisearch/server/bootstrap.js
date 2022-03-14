'use strict'
/**
 * @param  {object} options
 * @param  {string[]} options.contentTypes - all indexed content types
 * @param  {object} options.lifecycle - lifecycle API
 */
async function subscribeToLifecycles({ contentTypes, lifecycle }) {
  const lifeCyclesPromises = contentTypes.map(async contentType => {
    await lifecycle.subscribeContentType({ contentType })
  })
  return Promise.all(lifeCyclesPromises)
}

module.exports = async ({ strapi }) => {
  // Add lifecycles functions to indexed content types
  const store = strapi.plugin('meilisearch').service('store')
  const lifecycle = strapi.plugin('meilisearch').service('lifecycle')

  await store.syncCredentials()
  const indexedContentTypes = await store.getIndexedContentTypes()
  await subscribeToLifecycles({ contentTypes: indexedContentTypes, lifecycle })
}
