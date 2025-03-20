import { createSlice } from '@reduxjs/toolkit'

import type { Card } from '@/domain/@types'
import { getCards } from '@/domain/cards'

export interface CardSliceState {
  cards: Card[]
  count: number
  status: 'idle' | 'loading' | 'failed'
}

const initialState: CardSliceState = {
  cards: [],
  count: 0,
  status: 'idle',
}

export const cardSlice = createSlice({
  name: 'card',
  initialState,
  reducers: {
    reset: () => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addMatcher(getCards.matchFulfilled, (state, { payload }) => {
        state.status = 'idle'
        state.count = payload.count
        state.cards = payload.cards
      })
      .addMatcher(getCards.matchPending, (state) => {
        state.status = 'loading'
      })
      .addMatcher(getCards.matchRejected, (state) => {
        state.status = 'failed'
      })
  },
  selectors: {
    selectCards: (state) => state.cards,
  },
})

export const { reset } = cardSlice.actions

export const { selectCards } = cardSlice.selectors
