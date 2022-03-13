module.exports = ({ strapi }) => {
  // const store = strapi.plugin('meilisearch').service('store')
  const contentTypeService = strapi.plugin('meilisearch').service('contentType')
  return {
    addLifecyclesToContentType({ contentType }) {
      const contentTypeUid = contentTypeService.getContentTypeUid({
        contentType: contentType,
      })
      console.log(`add life cycles to ${contentTypeUid}`)

      strapi.db.lifecycles.subscribe({
        models: [contentTypeUid], // Add all the models a user wants to index in Meilisearch,
        afterCreate(event) {
          const { params } = event
          let data = params.data
          const meilisearch = strapi
            .plugin('meilisearch')
            .service('meilisearch')

          if (!Array.isArray(data)) data = [data]
          meilisearch.addMultipleEntriesToMeilisearch({
            contentType: contentTypeUid,
            entries: data,
          })
          console.log('afterCreate')
        },
        afterCreateMany(event) {
          const { params } = event
          let data = params.data
          const meilisearch = strapi
            .plugin('meilisearch')
            .service('meilisearch')

          if (!Array.isArray(data)) data = [data]
          meilisearch.addMultipleEntriesToMeilisearch({
            contentType: contentTypeUid,
            entries: data,
          })
          console.log('afterCreateMany')
        },
        afterUpdate() {
          // Todo apply filter rules to remove
          console.log('afterUpdate')
        },
        afterUpdateMany() {
          console.log('afterUpdateMany')
        },
        afterDelete() {
          console.log('afterDelete')
        },
        afterDeleteMany() {
          console.log('afterDeleteMany')
        },
      })
    },
  }
}
