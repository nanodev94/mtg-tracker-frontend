import { createSlice, type PayloadAction } from '@reduxjs/toolkit'

import { getTreatments } from '@/domain/cards'
import type { RequestStatus } from '@/types'

export interface TreatmentsSliceState {
  treatments: string[]
  count: number
  status: RequestStatus
}

const initialState: TreatmentsSliceState = {
  treatments: [],
  count: 0,
  status: 'idle',
}

export const treatmentsSlice = createSlice({
  name: 'treatments',
  initialState,
  reducers: {
    reset: () => initialState,
    setTreatments: (state, { payload }: PayloadAction<string[]>) => {
      state.treatments = payload
      state.count = payload.length
    },
  },
  extraReducers: (builder) => {
    builder
      .addMatcher(getTreatments.matchFulfilled, (state, { payload }) => {
        state.status = 'idle'
        state.treatments = payload.treatments
        state.count = payload.count
      })
      .addMatcher(getTreatments.matchPending, (state) => {
        state.status = 'loading'
      })
      .addMatcher(getTreatments.matchRejected, (state) => {
        state.status = 'failed'
      })
  },
  selectors: {
    selectTreatments: (state) => state.treatments,
    selectTreatmentsCount: (state) => state.count,
    selectTreatmentsStatus: (state) => state.status,
  },
})

export const { reset, setTreatments } = treatmentsSlice.actions

export const {
  selectTreatments,
  selectTreatmentsCount,
  selectTreatmentsStatus,
} = treatmentsSlice.selectors
