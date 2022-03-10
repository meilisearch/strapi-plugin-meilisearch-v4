import React, { memo, useState, useEffect } from 'react'
import ArrowLeft from '@strapi/icons/ArrowLeft'
import Pencil from '@strapi/icons/Pencil'
import Plus from '@strapi/icons/Plus'
import { Button } from '@strapi/design-system/Button'
import { Box } from '@strapi/design-system/Box'
import { Link } from '@strapi/design-system/Link'
import { BaseHeaderLayout } from '@strapi/design-system/Layout'
import useCollectionReloader from '../Hooks/useCollectionReloader'

const PluginHeader = () => {
  const { setIsOnline, isOnline } = useCollectionReloader()
  // console.log({ isOnline })

  return (
    <Box background="neutral100">
      <BaseHeaderLayout
        navigationAction={
          <Link startIcon={<ArrowLeft />} to="/">
            Go back
          </Link>
        }
        primaryAction={
          <Button onClick={() => setIsOnline(prev => !prev)}>
            Default button
          </Button>
        }
        title="Meilisearch"
        subtitle="strapi-plugin-meilisearch"
        as="h2"
      />
    </Box>
  )
}

export default memo(PluginHeader)
