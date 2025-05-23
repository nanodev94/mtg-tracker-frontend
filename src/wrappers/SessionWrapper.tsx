'use client'

import { useEffect } from 'react'
import Cookies from 'js-cookie'

import {
  COOKIE_KEY,
  COOKIES_DAYS_TO_EXPIRE,
  LOCAL_STORAGE_KEY,
  PAGE,
} from '@/constants'
import { useAppDispatch, useAppSelector } from '@/globalHooks/redux'
import { usePathname, useRouter } from '@/i18n/navigation'
import { selectUser, setUserData } from '@/redux/slices/userSlice'

interface Props {
  children: React.ReactNode
}

const SessionWrapper = ({ children }: Props) => {
  const dispatch = useAppDispatch()
  const pathname = usePathname()
  const { push } = useRouter()

  const userData = useAppSelector(selectUser)

  useEffect(() => {
    const userData = localStorage.getItem(LOCAL_STORAGE_KEY.USER_DATA)
    if (userData) {
      dispatch(setUserData(JSON.parse(userData)))
    }
  }, [dispatch])

  useEffect(() => {
    if (userData) {
      localStorage.setItem(
        LOCAL_STORAGE_KEY.USER_DATA,
        JSON.stringify(userData)
      )
      Cookies.set(COOKIE_KEY.AUTH_TOKEN, userData.token, {
        expires: COOKIES_DAYS_TO_EXPIRE,
      })

      if (pathname.includes(PAGE.LOGIN) || pathname.includes(PAGE.REGISTER))
        push(PAGE.SEARCH)
    } else {
      localStorage.removeItem(LOCAL_STORAGE_KEY.USER_DATA)
      Cookies.remove(COOKIE_KEY.AUTH_TOKEN)
    }
  }, [userData])

  return children
}

export default SessionWrapper
