// StoreProvider.tsx
'use client'

import type { ReactNode } from 'react'
import { useEffect, useRef } from 'react'

import { setupListeners } from '@reduxjs/toolkit/query'
import { Provider } from 'react-redux'

import type { AppStore } from '@/lib/store'
import { makeStore } from '@/lib/store'

interface Props {
  readonly children: ReactNode
}

export const StoreProvider = ({ children }: Props) => {
  const storeRef = useRef<AppStore>(makeStore())

  useEffect(() => {
    if (storeRef.current) {
      // Configure listeners using the provided defaults
      const unsubscribe = setupListeners(storeRef.current.dispatch)

      return unsubscribe
    }
  }, [])

  return <Provider store={storeRef.current}>{children}</Provider>
}
