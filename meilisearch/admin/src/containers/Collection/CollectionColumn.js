import React, { memo, useState, useEffect } from 'react'
import { Table, Thead, Tbody, Tr, Td, Th } from '@strapi/design-system/Table'
import { BaseCheckbox } from '@strapi/design-system/BaseCheckbox'
import { Typography } from '@strapi/design-system/Typography'
import { Avatar, AvatarGroup } from '@strapi/design-system/Avatar'
import { Flex } from '@strapi/design-system/Flex'
import { IconButton } from '@strapi/design-system/IconButton'
import Pencil from '@strapi/icons/Pencil'
import { Box } from '@strapi/design-system/Box'
import Trash from '@strapi/icons/Trash'
// import useCollectionReloader from '../Hooks/useCollectionReloader'

const hookingTextRendering = ({ entry }) => {
  const { indexed, listened } = entry
  if (indexed && !listened) return 'Reload needed'
  if (indexed && listened) return 'Hooked'
  if (!indexed && listened) return 'Reload needed'
  if (!indexed && !listened) return '/'
}

const CollectionColumn = ({ entry }) => {
  const [val, setValue] = useState(false)
  console.log('Collect column')

  return (
    <Tr key={entry.id}>
      <Td>
        <BaseCheckbox
          aria-label={`Select ${entry.collection}`}
          onValueChange={value => setValue(value)}
          value={val}
        />
      </Td>
      {/* // Name */}
      <Td>
        <Typography textColor="neutral800">{entry.collection}</Typography>
      </Td>
      {/* // IN MEILISEARCH */}
      <Td>
        <Typography textColor="neutral800">
          {entry.indexed ? 'Yes' : 'No'}
        </Typography>
      </Td>
      {/* // INDEXING */}
      <Td>
        <Typography textColor="neutral800">
          {entry.isIndexing ? 'Yes' : 'No'}
        </Typography>
      </Td>
      {/* // INDEX NAME */}
      <Td>
        <Typography textColor="neutral800">{entry.indexUid}</Typography>
      </Td>
      {/* // DOCUMENTS */}
      <Td>
        <Typography textColor="neutral800">
          {entry.numberOfDocuments} / {entry.numberOfEntries}
        </Typography>
      </Td>
      {/* // HOOKS */}
      <Td>
        <Typography textColor="neutral800">
          {hookingTextRendering({ entry })}
        </Typography>
      </Td>
      <Td>
        <Flex>
          <IconButton
            onClick={() => console.log('edit')}
            label="Edit"
            noBorder
            icon={<Pencil />}
          />
          <Box paddingLeft={1}>
            <IconButton
              onClick={() => console.log('delete')}
              label="Delete"
              noBorder
              icon={<Trash />}
            />
          </Box>
        </Flex>
      </Td>
    </Tr>
  )
}

export default memo(CollectionColumn)
