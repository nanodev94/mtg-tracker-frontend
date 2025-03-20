import { createSlice } from '@reduxjs/toolkit'

import type { Set } from '@/domain/@types'
import { getSets } from '@/domain/sets'

export interface SetSliceState {
  sets: Set[]
  count: number
  status: 'idle' | 'loading' | 'failed'
}

const initialState: SetSliceState = {
  sets: [],
  count: 0,
  status: 'idle',
}

export const setSlice = createSlice({
  name: 'set',
  initialState,
  reducers: {
    reset: () => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addMatcher(getSets.matchFulfilled, (state, { payload }) => {
        state.status = 'idle'
        state.count = payload.count
        state.sets = payload.sets
      })
      .addMatcher(getSets.matchPending, (state) => {
        state.status = 'loading'
      })
      .addMatcher(getSets.matchRejected, (state) => {
        state.status = 'failed'
      })
  },
  selectors: {
    selectSets: (state) => state.sets,
    selectSet: (state, id: number) => state.sets.find((set) => set.id === id),
  },
})

export const { reset } = setSlice.actions

export const { selectSets, selectSet } = setSlice.selectors
