/*
 *
 * HomePage
 *
 */

import React, { memo, useEffect, useState } from 'react'
import pluginId from '../../pluginId'
import { request } from '@strapi/helper-plugin'
import PluginTabs from '../PluginTabs'
import PluginHeader from '../PluginHeader'

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
