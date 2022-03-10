import React, { memo, useState, useEffect } from 'react'
import { Table, Thead, Tbody, Tr, Td, Th } from '@strapi/design-system/Table'
import { BaseCheckbox } from '@strapi/design-system/BaseCheckbox'
import { Typography } from '@strapi/design-system/Typography'
import { VisuallyHidden } from '@strapi/design-system/VisuallyHidden'
import { Avatar, AvatarGroup } from '@strapi/design-system/Avatar'
import { Flex } from '@strapi/design-system/Flex'
import { IconButton } from '@strapi/design-system/IconButton'

import ArrowLeft from '@strapi/icons/ArrowLeft'
import Pencil from '@strapi/icons/Pencil'
import Trash from '@strapi/icons/Trash'
import { Box } from '@strapi/design-system/Box'
import CollectionTableHeader from './CollectionTableHeader'
import CollectionColumn from './CollectionColumn'
import useCollectionReloader from '../Hooks/useCollectionReloader'

const Collection = () => {
  const { collections } = useCollectionReloader()

  console.log('Collection inside')
  const ROW_COUNT = 6
  const COL_COUNT = 10
  const entry = {
    cover: 'https://avatars.githubusercontent.com/u/3874873?v=4',
    description: 'Chez Léon is a human sized Parisian',
    category: 'French cuisine',
    contact: 'Leon Lafrite',
  }
  const entries = []

  for (let i = 0; i < 5; i++) {
    entries.push({ ...entry, id: i })
  }
  return (
    <Box background="neutral100">
      <Table colCount={COL_COUNT} rowCount={ROW_COUNT}>
        <CollectionTableHeader />
        <Tbody>
          {collections.map(collection => (
            <CollectionColumn key={collection.collection} entry={collection} />
          ))}
        </Tbody>
      </Table>
    </Box>
  )
}

export default memo(Collection)
