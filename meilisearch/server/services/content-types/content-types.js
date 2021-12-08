'use strict'
module.exports = ({ strapi }) => ({
  /**
   *
   * @returns {string[]} - list of all `content-types` in Strapi.
   */
  getContentTypes() {
    const contentTypes = Object.keys(strapi.contentTypes)
      .filter(contentType => contentType.startsWith('api::'))
      .map(contentType => contentType.replace(/(api::.*?\.)/, ''))
    return contentTypes
  },

  /**
   * Get all the API's.
   * API's are similar to content-types but are formatted the following way: "api:apiName:apiName"
   *
   * @returns {string[]} - list of all `api` in Strapi in format "api:apiName:apiName"
   */
  getApis() {
    const contentTypes = Object.keys(strapi.contentTypes).filter(contentType =>
      contentType.startsWith('api::')
    )
    return contentTypes
  },
})
