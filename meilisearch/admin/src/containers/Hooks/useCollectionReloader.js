import { useState, useEffect } from 'react'
import { request } from '@strapi/helper-plugin'
import pluginId from '../../pluginId'
const hookingTextRendering = ({ indexed, listened }) => {
  if (indexed && !listened) return 'Reload needed'
  if (!indexed && listened) return 'Reload needed'
  if (indexed && listened) return 'Hooked'
  if (!indexed && !listened) return '/'
}

/**
 * Reload request of the server.
 */
export const reloadServer = async () => {
  try {
    // FIXME: cannot wait as unlockApp does not exist on the STRAPI API anymore
    await request(
      `/${pluginId}/reload`,
      {
        method: 'GET',
      },
      true
    )
    window.location.reload()
  } catch (err) {}
}

export function useCollectionReloader() {
  const [isOnline, setIsOnline] = useState(false)
  const [collections, setCollections] = useState([])
  const [refetchIndex, setRefetchIndex] = useState(true)
  const [reloadNeeded, setReloadNeeded] = useState(false)
  const [collectionInWaitMode, setCollectionInWaitMode] = useState([]) // Collections that are waiting for their indexation to complete.

  const refetchCollection = () =>
    setRefetchIndex(prevRefetchIndex => !prevRefetchIndex)

  const fetchCollections = async () => {
    const data = await request(`/${pluginId}/collection/`, {
      method: 'GET',
    })

    const collections = data.data.collections.map(collection => {
      collection['reloadNeeded'] = hookingTextRendering({
        indexed: collection.indexed,
        listened: collection.listened,
      })
      return collection
    })
    const reload = collections.find(col => col.reloadNeeded === 'Reload needed')
    if (reload) {
      setReloadNeeded(true)
    } else setReloadNeeded(false)
    setCollections(collections)
  }

  const deleteCollection = async ({ collection }) => {
    await request(`/${pluginId}/collection/${collection}`, {
      method: 'DELETE',
    })
    console.log('Delete collection')
    refetchCollection()
  }

  const addCollection = async ({ collection }) => {
    await request(`/${pluginId}/collection`, {
      method: 'POST',
      body: {
        collection,
      },
    })
    console.log('Add collection')
    refetchCollection()
  }

  const updateCollection = async ({ collection }) => {
    await request(`/${pluginId}/collection`, {
      method: 'PUT',
      body: {
        collection,
      },
    })
    console.log('Update collection')
    refetchCollection()
  }

  useEffect(() => {
    fetchCollections()
  }, [isOnline, refetchIndex])

  return {
    setIsOnline,
    collections,
    isOnline,
    deleteCollection,
    addCollection,
    updateCollection,
    reloadNeeded,
    reloadServer,
  }
}

export default useCollectionReloader
