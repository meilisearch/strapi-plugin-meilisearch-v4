/*
 *
 * HomePage
 *
 */

import React, { memo, useEffect, useState } from 'react'
import pluginId from '../../pluginId'
import { request } from '@strapi/helper-plugin'
import Collection from '../Collection'
import PluginTabs from '../PluginTabs'
import PluginHeader from '../PluginHeader'

// function useCollectionUpdate() {
//   const [isOnline, setIsOnline] = useState(null)

//   setIsOnline(prev => !!prev)
//   return isOnline
// }

const HomePage = () => {
  return (
    <div>
      <h1>{pluginId}&apos;s HomePage</h1>
      <PluginHeader />
      <PluginTabs />
    </div>
  )
}

export default memo(HomePage)
