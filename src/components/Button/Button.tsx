'use client'

import clsx from 'clsx'

interface Props {
  children: React.ReactNode
  className?: string
  large?: boolean
  secondary?: boolean
  onClick?: () => void
  rounded?: boolean
}

const Button = ({
  children,
  className,
  large,
  secondary,
  onClick,
  rounded,
}: Props) => {
  return (
    <button
      className={clsx(
        'px-4 py-2 cursor-pointer',
        large && 'w-full',
        rounded && 'rounded-lg',
        secondary ? 'bg-green' : 'bg-blue',
        className
      )}
      onClick={onClick}
    >
      {children}
    </button>
  )
}

export default Button
