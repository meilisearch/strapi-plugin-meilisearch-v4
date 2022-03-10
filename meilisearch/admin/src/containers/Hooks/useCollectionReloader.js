import { useState, useEffect } from 'react'
import { request } from '@strapi/helper-plugin'
import pluginId from '../../pluginId'

/**
 * Fetches extended information about collections in Meilisearch.
 */

// if (error) errorNotifications(res)
// else {
// Start watching collections that have pending tasks
// collections.map(col => {
//   if (col.isIndexing) {
//     watchTasks({ collection: col.collection })
//   }
// })

// Transform collections information to verbose string.
// const renderedCols = collections.map(col => transformCollections(col))

// Find possible collection that needs a reload to activate the listener.
// const reloading = renderedCols.find(col => col.listened === 'Reload needed')

// setNeedReload(reloading) // A reload is required for a collection to be listened or de-listened
// setCollectionsList(renderedCols) // Store all `Strapi collections
// setUpToDateCollection(true) // Collection information is up to date

export function useCollectionReloader() {
  const [isOnline, setIsOnline] = useState(false)
  const [collections, setCollections] = useState([])
  const [refetchIndex, setRefetchIndex] = useState(true)
  const [isLoading, setIsLoading] = useState(false)

  const refetchCollection = () =>
    setRefetchIndex(prevRefetchIndex => !prevRefetchIndex)

  useEffect(() => {
    const fetchCollections = async () => {
      setIsLoading(true)
      const data = await request(`/${pluginId}/collection/`, {
        method: 'GET',
      })

      setCollections(data.data.collections)
      setIsLoading(false)
    }
    fetchCollections()
  }, [isOnline])

  return { setIsOnline, collections, isOnline }
}

export default useCollectionReloader
