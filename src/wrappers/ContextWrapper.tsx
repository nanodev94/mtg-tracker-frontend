'use client'
/* eslint-disable react/jsx-no-useless-fragment */

import { useEffect } from 'react'

import { getSets } from '@/domain/sets'
import { useAppDispatch } from '@/globalHooks/redux'

interface Props {
  children: React.ReactNode
}

const ContextWrapper = ({ children }: Props) => {
  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(getSets.initiate({}, { forceRefetch: true }))
  }, [dispatch])

  return <>{children}</>
}

export default ContextWrapper
