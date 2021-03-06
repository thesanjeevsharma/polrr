import React from 'react'
import clsx from 'clsx'

import './Button.scss'

interface ComponentProps {
  children: React.ReactNode
  className?: string
  onClick(): void
}

const Button: React.FC<ComponentProps> = ({ children, className, onClick }) => {
  return (
    <button className={clsx('Button', className)} onClick={onClick}>
      {children}
    </button>
  )
}

export default Button
