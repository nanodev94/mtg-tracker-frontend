import { createSlice, type PayloadAction } from '@reduxjs/toolkit'

import { getSubtypes } from '@/domain/cards'
import type { RequestStatus } from '@/types'

export interface SubtypesSliceState {
  subtypes: string[]
  count: number
  status: RequestStatus
}

const initialState: SubtypesSliceState = {
  subtypes: [],
  count: 0,
  status: 'idle',
}

export const subtypesSlice = createSlice({
  name: 'subtypes',
  initialState,
  reducers: {
    reset: () => initialState,
    setSubtypes: (state, { payload }: PayloadAction<string[]>) => {
      state.subtypes = payload
      state.count = payload.length
    },
  },
  extraReducers: (builder) => {
    builder
      .addMatcher(getSubtypes.matchFulfilled, (state, { payload }) => {
        state.status = 'idle'
        state.subtypes = payload.subtypes
        state.count = payload.count
      })
      .addMatcher(getSubtypes.matchPending, (state) => {
        state.status = 'loading'
      })
      .addMatcher(getSubtypes.matchRejected, (state) => {
        state.status = 'failed'
      })
  },
  selectors: {
    selectSubtypes: (state) => state.subtypes,
    selectSubtypesCount: (state) => state.count,
    selectSubtypesStatus: (state) => state.status,
  },
})

export const { reset, setSubtypes } = subtypesSlice.actions

export const { selectSubtypes, selectSubtypesCount, selectSubtypesStatus } =
  subtypesSlice.selectors
