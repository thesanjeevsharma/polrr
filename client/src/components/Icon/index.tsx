import React from 'react'
import clsx from 'clsx'

import BookmarkIcon from 'mdi-react/BookmarkIcon'
import BookmarkOutlineIcon from 'mdi-react/BookmarkOutlineIcon'
import BookmarkMultipleIcon from 'mdi-react/BookmarkMultipleIcon'
import CloseIcon from 'mdi-react/CloseIcon'
import LoadingIcon from 'mdi-react/LoadingIcon'
import MenuIcon from 'mdi-react/MenuIcon'
import MoonWaxingCrescentIcon from 'mdi-react/MoonWaxingCrescentIcon'
import OpenInNewIcon from 'mdi-react/OpenInNewIcon'
import WhiteBalanceSunnyIcon from 'mdi-react/WhiteBalanceSunnyIcon'

import './Icon.scss'

interface ComponentProps {
  className?: string
  name: string
  onClick?(e?: React.MouseEvent<HTMLSpanElement, MouseEvent>): void
  size?: number
}

const Icon: React.FC<ComponentProps> = ({
  className,
  name,
  onClick,
  size = 24,
}) => {
  const renderIcon = (): React.ReactNode => {
    switch (name) {
      case 'bookmark':
        return <BookmarkIcon size={size} />
      case 'bookmark-outline':
        return <BookmarkOutlineIcon size={size} />
      case 'bookmark-multiple':
        return <BookmarkMultipleIcon size={size} />
      case 'close':
        return <CloseIcon size={size} />
      case 'loading':
        return <LoadingIcon size={size} />
      case 'menu':
        return <MenuIcon size={size} />
      case 'moon':
        return <MoonWaxingCrescentIcon size={size} />
      case 'open-in-new':
        return <OpenInNewIcon size={size} />
      case 'sun':
        return <WhiteBalanceSunnyIcon size={size} />
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
