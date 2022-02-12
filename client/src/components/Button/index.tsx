import React from 'react'
import clsx from 'clsx'

import './Button.scss'

interface ComponentProps {
  children: React.ReactNode
  className?: string
  disabled?: boolean
  onClick(): void
}

const Button: React.FC<ComponentProps> = ({
  children,
  className,
  disabled,
  onClick,
}) => {
  return (
    <button
      className={clsx('Button', className, disabled && 'Button--disabled')}
      onClick={onClick}
    >
      {children}
    </button>
  )
}

export default Button
