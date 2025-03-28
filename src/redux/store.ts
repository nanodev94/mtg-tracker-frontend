import type { Action, ThunkAction } from '@reduxjs/toolkit'
import { configureStore } from '@reduxjs/toolkit'

import { api } from '@/domain'

import { cardSlice } from './slices/cardSlice'
import { searchSlice } from './slices/searchSlice'
import { setSlice } from './slices/setSlice'
import { loggerMiddleware } from './loggerMiddleware'

export const makeStore = () =>
  configureStore({
    reducer: {
      [cardSlice.name]: cardSlice.reducer,
      [searchSlice.name]: searchSlice.reducer,
      [setSlice.name]: setSlice.reducer,
      [api.reducerPath]: api.reducer,
    },
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(loggerMiddleware).concat(api.middleware),
  })

// Infer the type of makeStore
export type AppStore = ReturnType<typeof makeStore>
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<AppStore['getState']>
export type AppDispatch = AppStore['dispatch']
export type ReduxThunkAction<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action
>
