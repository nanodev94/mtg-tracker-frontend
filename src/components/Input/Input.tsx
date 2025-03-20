'use client'

import React, { useEffect, useRef, useState } from 'react'
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

  const myRef = useRef<HTMLInputElement | null>(null)
  const [focused, setFocused] = useState(false)
  const [hasValue, setHasValue] = useState(false)

  useEffect(() => {
    if (hasValue && !myRef.current?.value) {
      setHasValue(false)
    } else if (!hasValue && myRef.current?.value) {
      setHasValue(true)
    }
  }, [myRef.current?.value])

  return (
    <div className='flex flex-col'>
      <div className='flex border-2 border-black pt-4 relative'>
        <label
          className={clsx(
            'transition-all absolute',
            hasValue || focused ? '-mt-5 text-md' : 'text-xl'
          )}
          htmlFor={id}
        >
          {label}
        </label>
        <input
          className={clsx(
            'bg-transparent pb-1.5 pt-1 outline-none w-full',
            className
          )}
          id={id}
          onBlur={(event) => {
            setFocused(false)
            onBlur?.(event)
          }}
          onFocus={() => {
            setFocused(true)
          }}
          type={type}
          {...inputProps}
        />
      </div>
      <span className='text-red-700'>{error}</span>
    </div>
  )
}

export default Input
