'use strict'

module.exports = ({ strapi }) => {
  const store = strapi.plugin('meilisearch').service('store')
  return {
    /**
     * Get Client Credentials from the Store.
     *
     * @return {{ data: {
     *  host: string,
     *  apiKey: string,
     *  ApiKeyIsFromConfigFile: boolean,
     *  HostIsFromConfigFile: boolean
     * }}} Extended Credentials information
     */
    async getCredentials(ctx) {
      console.log(ctx)
      const credentials = await store.getCredentials()
      ctx.body = { data: credentials }
    },

    /**
     * Add Meilisearch Credentials to the Store.
     *
     * @param  {object} ctx - Http request object.
     *
     * @return {{ data: {
     *  host: string,
     *  apiKey: string,
     *  ApiKeyIsFromConfigFile: boolean,
     *  HostIsFromConfigFile: boolean
     * }}} Extended Credentials information
     */
    async addCredentials(ctx) {
      const { host, apiKey } = ctx.request.body
      const credentials = await store.addCredentials({ host, apiKey })

      ctx.body = { data: credentials }
    },
  }
}
