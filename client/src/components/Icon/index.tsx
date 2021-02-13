import React from 'react'

import BookmarkIcon from 'mdi-react/BookmarkIcon'
import BookmarkOutlineIcon from 'mdi-react/BookmarkOutlineIcon'
import BookmarkMultipleIcon from 'mdi-react/BookmarkMultipleIcon'

interface ComponentProps {
  name: string
}

const Icon: React.FC<ComponentProps> = ({ name }) => {
  const renderIcon = (): React.ReactNode => {
    switch (name) {
      case 'bookmark':
        return <BookmarkIcon />
      case 'bookmark-outline':
        return <BookmarkOutlineIcon />
      case 'bookmark-multiple':
        return <BookmarkMultipleIcon />
      default:
        return null
    }
  }

  return <span>{renderIcon()}</span>
}

export default Icon
