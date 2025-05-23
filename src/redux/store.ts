import type { Action, ThunkAction } from '@reduxjs/toolkit'
import { configureStore } from '@reduxjs/toolkit'

import { api } from '@/domain'

import { artistsSlice } from './slices/artistsSlice'
import { cardSlice } from './slices/cardSlice'
import { keywordsSlice } from './slices/keywordsSlice'
import { searchSlice } from './slices/searchSlice'
import { setSlice } from './slices/setSlice'
import { subtypesSlice } from './slices/subtypesSlice'
import { treatmentsSlice } from './slices/treatmentsSlice'
import { typesSlice } from './slices/typesSlice'
import { userSlice } from './slices/userSlice'
import { loggerMiddleware } from './loggerMiddleware'

export const makeStore = () =>
  configureStore({
    reducer: {
      [artistsSlice.name]: artistsSlice.reducer,
      [cardSlice.name]: cardSlice.reducer,
      [keywordsSlice.name]: keywordsSlice.reducer,
      [searchSlice.name]: searchSlice.reducer,
      [setSlice.name]: setSlice.reducer,
      [subtypesSlice.name]: subtypesSlice.reducer,
      [treatmentsSlice.name]: treatmentsSlice.reducer,
      [typesSlice.name]: typesSlice.reducer,
      [userSlice.name]: userSlice.reducer,
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
