'use client'

import { useEffect, useState } from 'react'
import { type Control, Controller } from 'react-hook-form'
import ReactSelect from 'react-select'

export interface SelectOption {
  value: string
  label: string
}

interface Props {
  control: Control
  name: string
  options: SelectOption[]
  closeMenuOnSelect?: boolean
  defaultValue?: SelectOption
  isClearable?: boolean
  isDisabled?: boolean
  isMulti?: boolean
  isSearchable?: boolean
  placeholder?: string
  required?: boolean
}

const Select = ({ control, name, placeholder, ...selectOptions }: Props) => {
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
  }, [])

  // TODO: return loading component
  if (!isMounted) return <span>Loading...</span>

  return (
    <Controller
      control={control}
      name={name}
      render={({ field }) => (
        <ReactSelect
          {...selectOptions}
          {...field}
          className='text-black'
          placeholder={placeholder ?? ''}
        />
      )}
    />
  )
}

export default Select
