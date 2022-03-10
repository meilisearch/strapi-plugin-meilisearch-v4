import React, { memo, useState } from 'react'
import { Alert } from '@strapi/design-system/Alert'

const Notifcation = ({ message }) => {
  const [notification, setNotification] = useState()
  return (
    <Alert closeLabel="Close alert" title="Title">
      This is the default alert.
    </Alert>
  )
}

export default memo(Notifcation)
