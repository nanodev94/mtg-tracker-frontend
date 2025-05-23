import { createSlice, type PayloadAction } from '@reduxjs/toolkit'

import { getKeywords } from '@/domain/cards'
import type { RequestStatus } from '@/types'

export interface KeywordsSliceState {
  keywords: string[]
  count: number
  status: RequestStatus
}

const initialState: KeywordsSliceState = {
  keywords: [],
  count: 0,
  status: 'idle',
}

export const keywordsSlice = createSlice({
  name: 'keywords',
  initialState,
  reducers: {
    reset: () => initialState,
    setKeywords: (state, { payload }: PayloadAction<string[]>) => {
      state.keywords = payload
      state.count = payload.length
    },
  },
  extraReducers: (builder) => {
    builder
      .addMatcher(getKeywords.matchFulfilled, (state, { payload }) => {
        state.status = 'idle'
        state.keywords = payload.keywords
        state.count = payload.count
      })
      .addMatcher(getKeywords.matchPending, (state) => {
        state.status = 'loading'
      })
      .addMatcher(getKeywords.matchRejected, (state) => {
        state.status = 'failed'
      })
  },
  selectors: {
    selectKeywords: (state) => state.keywords,
    selectKeywordsCount: (state) => state.count,
    selectKeywordsStatus: (state) => state.status,
  },
})

export const { reset, setKeywords } = keywordsSlice.actions

export const { selectKeywords, selectKeywordsCount, selectKeywordsStatus } =
  keywordsSlice.selectors
