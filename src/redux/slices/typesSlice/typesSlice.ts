import { createSlice, type PayloadAction } from '@reduxjs/toolkit'

import { getTypes } from '@/domain/cards'
import type { RequestStatus } from '@/types'

export interface TypesSliceState {
  types: string[]
  count: number
  status: RequestStatus
}

const initialState: TypesSliceState = {
  types: [],
  count: 0,
  status: 'idle',
}

export const typesSlice = createSlice({
  name: 'types',
  initialState,
  reducers: {
    reset: () => initialState,
    setTypes: (state, { payload }: PayloadAction<string[]>) => {
      state.types = payload
      state.count = payload.length
    },
  },
  extraReducers: (builder) => {
    builder
      .addMatcher(getTypes.matchFulfilled, (state, { payload }) => {
        state.status = 'idle'
        state.types = payload.types
        state.count = payload.count
      })
      .addMatcher(getTypes.matchPending, (state) => {
        state.status = 'loading'
      })
      .addMatcher(getTypes.matchRejected, (state) => {
        state.status = 'failed'
      })
  },
  selectors: {
    selectTypes: (state) => state.types,
    selectTypesCount: (state) => state.count,
    selectTypesStatus: (state) => state.status,
  },
})

export const { reset, setTypes } = typesSlice.actions

export const { selectTypes, selectTypesCount, selectTypesStatus } =
  typesSlice.selectors
