'use strict'
/**
 * Add listeners to the collection indexed in Meilisearch
 *
 * @param  {object} options
 * @param  {object} options.store - all indexed content types
 * @param  {object} options.lifecycle - lifecycle API
 */
async function subscribeToLifecycles({ lifecycle, store }) {
  const contentTypes = await store.getIndexedContentTypes()
  await store.emptyListenedContentTypes()
  let lifecycles
  for (const contentType of contentTypes) {
    lifecycles = await lifecycle.subscribeContentType({ contentType })
  }

  return lifecycles
}

/**
 * Removed collections that are not indexed anymore
 *
 * @param  {object} options
 * @param  {object} options.store - all indexed content types
 * @param  {object} options.contentTypeService - lifecycle API
 * @param  {object} options.meilisearch - lifecycle API
 */
async function syncIndexedCollections({
  store,
  contentTypeService,
  meilisearch,
}) {
  const indexes = await meilisearch.getIndexes()
  const indexUids = indexes.map(index => index.uid)
  // All indexed contentTypes
  const indexedContentTypes = await store.getIndexedContentTypes()
  const contentTypes = contentTypeService.getContentTypesUid()

  for (const contentType of contentTypes) {
    const indexUid = meilisearch.getIndexNameOfContentType({ contentType })
    const indexInMeiliSearch = indexUids.includes(indexUid)
    const contentTypeInIndexStore = indexedContentTypes.includes(contentType)

    // Remove any collection that is not in Meilisearch anymore
    if (!indexInMeiliSearch && contentTypeInIndexStore) {
      await store.removeIndexedContentType({ contentType })
    }
  }
}

module.exports = async ({ strapi }) => {
  // Add lifecycles functions to indexed content types
  const store = strapi.plugin('meilisearch').service('store')
  const lifecycle = strapi.plugin('meilisearch').service('lifecycle')
  const meilisearch = strapi.plugin('meilisearch').service('meilisearch')
  const contentTypeService = strapi.plugin('meilisearch').service('contentType')

  await store.syncCredentials()
  await syncIndexedCollections({
    store,
    contentTypeService,
    meilisearch,
  })
  await subscribeToLifecycles({
    lifecycle,
    store,
  })
}
