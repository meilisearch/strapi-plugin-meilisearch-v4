// Since v4, they created a global API containing all the functions I defined everywhere in my code.  Well, if you call the function in which you are … it creates an infinite loop
'use strict'

module.exports = ({ strapi }) => {
  const meilisearch = strapi.plugin('meilisearch').service('meilisearch')
  return {
    /**
     * Wait for one collection to be completely indexed in Meilisearch.
     *
     * @param  {object} ctx - Http request object.
     *
     * @returns  { data: Promise<(import("meilisearch").Task| number)[]> } p - Task body returned by Meilisearch API.
     */
    async waitForTasks(ctx) {
      const { collection } = ctx.params
      const { taskUids } = ctx.request.body
      const tasks = await meilisearch.waitForTasks({
        taskUids,
        collection,
      })
      return { data: tasks }
    },

    /**
     * Get all the tasks with an enqueued status of the collections that
     * are indexed in Meilisearch.
     *
     * @returns { data: number[] }
     */
    async getEnqueuedTaskUids() {
      const taskUids = await meilisearch.getEnqueuedTaskUids()

      return { data: taskUids }
    },
  }
}
