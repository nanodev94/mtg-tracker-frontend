import { createSlice } from '@reduxjs/toolkit'

import { RESULTS_PER_PAGE } from '@/constants'
import type { Card } from '@/domain/@types'
import { getCard, getCards } from '@/domain/cards'

export interface CardSliceState {
  cards: Card[]
  count: number
  endReached: boolean
  status: 'idle' | 'loading' | 'failed'
}

const initialState: CardSliceState = {
  cards: [],
  count: 0,
  endReached: false,
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
        if (payload.count === 0) {
          state.endReached = true
        } else {
          state.count += payload.count
          state.cards.push(...payload.cards)

          if (payload.count % RESULTS_PER_PAGE !== 0) {
            state.endReached = true
          }
        }
      })
      .addMatcher(getCards.matchPending, (state) => {
        state.status = 'loading'
      })
      .addMatcher(getCards.matchRejected, (state) => {
        state.status = 'failed'
      })
      .addMatcher(getCard.matchFulfilled, (state, { payload }) => {
        state.status = 'idle'
        state.count += 1
        state.cards.push(payload)
      })
      .addMatcher(getCard.matchPending, (state) => {
        state.status = 'loading'
      })
      .addMatcher(getCard.matchRejected, (state) => {
        state.status = 'failed'
      })
  },
  selectors: {
    selectCards: (state) => state.cards,
    selectCardById: (state, id: number) =>
      state.cards.find((card) => card.id === id),
    selectCardsEndReached: (state) => state.endReached,
    selectCardsStatus: (state) => state.status,
  },
})

export const { reset } = cardSlice.actions

export const {
  selectCards,
  selectCardById,
  selectCardsEndReached,
  selectCardsStatus,
} = cardSlice.selectors
