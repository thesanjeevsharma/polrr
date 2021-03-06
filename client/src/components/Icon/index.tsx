import React from 'react'
import clsx from 'clsx'

import BookmarkIcon from 'mdi-react/BookmarkIcon'
import BookmarkOutlineIcon from 'mdi-react/BookmarkOutlineIcon'
import BookmarkMultipleIcon from 'mdi-react/BookmarkMultipleIcon'

import './Icon.scss'

interface ComponentProps {
  className?: string
  name: string
  onClick?(e?: React.MouseEvent<HTMLSpanElement, MouseEvent>): void
}

const Icon: React.FC<ComponentProps> = ({ className, name, onClick }) => {
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

  const handleClick = (
    e?: React.MouseEvent<HTMLSpanElement, MouseEvent>
  ): void => {
    if (!onClick) return
    onClick(e)
  }

  return (
    <span
      className={clsx('Icon', className)}
      onClick={handleClick}
      role="button"
      tabIndex={0}
    >
      {renderIcon()}
    </span>
  )
}

export default Icon
