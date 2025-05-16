'use client'

import React from 'react'
import clsx from 'clsx'

interface Props {
  id: string
  label: string
  type?: 'text' | 'email' | 'password' | 'number'
  autocomplete?: 'off'
  className?: string
  defaultValue?: string | number
  error?: string
  min?: string | number
  max?: string | number
  maxLength?: number
  minLength?: number
  name?: string
  pattern?: string
  value?: string | number
  readOnly?: boolean
  required?: boolean
  disabled?: boolean
  onBlur?: (_event: React.ChangeEvent<HTMLInputElement>) => void
  onChange?: (_event: React.ChangeEvent<HTMLInputElement>) => void
}

const Input = (props: Props) => {
  const {
    id,
    label,
    type = 'text',
    className,
    error,
    onBlur,
    ...inputProps
  } = props

  return (
    <div className='flex flex-col'>
      <div className='flex'>
        <input
          className={clsx(
            'bg-white border-[#ccc] border-2 text-black p-1 outline-none w-full rounded',
            className
          )}
          id={id}
          type={type}
          {...inputProps}
        />
      </div>
      <span className='text-red-700'>{error}</span>
    </div>
  )
}

export default Input
