'use client'
import { useRef } from 'react'
import { Provider } from 'react-redux'

import type { AppStore } from './store'
import { makeStore } from './store'

const ReduxProvider = ({ children }: { children: React.ReactNode }) => {
  const storeRef = useRef<AppStore>(null)

  // Create the store instance the first time this renders
  if (!storeRef.current) storeRef.current = makeStore()

  return <Provider store={storeRef.current}>{children}</Provider>
}

export default ReduxProvider
