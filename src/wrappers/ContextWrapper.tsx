'use client'

import { useEffect } from 'react'

import { getSets } from '@/domain/sets'
import { getUserCards } from '@/domain/users'
import { useAppDispatch, useAppSelector } from '@/globalHooks/redux'
import { selectUser } from '@/redux/slices/userSlice'

interface Props {
  children: React.ReactNode
}

const ContextWrapper = ({ children }: Props) => {
  const dispatch = useAppDispatch()
  const userData = useAppSelector(selectUser)

  useEffect(() => {
    dispatch(getSets.initiate({}, { forceRefetch: true }))
  }, [dispatch])

  useEffect(() => {
    if (userData) {
      dispatch(getUserCards.initiate({}, { forceRefetch: true }))
    }
  }, [dispatch, userData])

  return children
}

export default ContextWrapper
