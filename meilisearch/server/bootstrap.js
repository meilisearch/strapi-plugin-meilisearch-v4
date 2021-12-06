'use strict'

module.exports = async ({ strapi }) => {
  console.log('BOOTSTRAP')

  // To access users contentTypes use the following strapi.contentTypes.
  // It does not seem to be documented nor does it appear in the keys of `strapi`
  // console.log(Object.keys(strapi))
  // console.log(strapi.plugin('meilisearch').config)
  // console.log(strapi.plugin('meilisearch').service('contentTypes')) // { getContentTypes: [Function: getContentTypes] }
  // console.log()
  // console.log(await strapi.api.restaurant.services.restaurant.find())
  // console.log(await strapi.entityService.count('api::restaurant.restaurant'))
  // console.log(await strapi.db.query('api::restaurant.restaurant').count())
  console.log(strapi.plugin('meilisearch').config) // Function
  console.log(strapi.plugin('meilisearch').config()) // undefined
  console.log(strapi.plugin('meilisearch').config.default) // undefined
  console.log(strapi.config.get('plugin.meilisearch'))
  // console.log(strapi.plugin('meilisearch').config.default()) // Crash, it is not a function
}
