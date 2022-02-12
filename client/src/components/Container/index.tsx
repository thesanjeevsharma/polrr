import clsx from 'clsx'
import React from 'react'

import './Container.scss'

type Props = {
  children: React.ReactNode
  className?: string
}

const Container: React.FC<Props> = ({ children, className }) => {
  return <div className={clsx('Container', className)}>{children}</div>
}

export default Container
