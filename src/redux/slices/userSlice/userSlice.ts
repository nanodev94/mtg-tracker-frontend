import { createSlice, type PayloadAction } from '@reduxjs/toolkit'

import type { UI_MODE } from '@/constants'
import {
  addUserCard,
  getUserCards,
  postLogin,
  postRegister,
  removeUserCard,
} from '@/domain/users'
import { type RequestStatus, Treatment } from '@/types'

interface UserData {
  id: number
  email: string
  languageCode: string
  uiMode: UI_MODE
  token: string
}

interface CardAmount {
  [cardId: number]: {
    [treatment: string]: number
  }
}

export interface UserSliceState {
  userData?: UserData
  userCards: CardAmount
  userStatus: RequestStatus
  userCardsStatus: RequestStatus
}

const initialState: UserSliceState = {
  userCards: {},
  userStatus: 'idle',
  userCardsStatus: 'idle',
}

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    reset: () => initialState,
    setUserData: (state, { payload }: PayloadAction<UserData>) => {
      state.userData = { ...payload }
    },
  },
  extraReducers: (builder) => {
    builder
      .addMatcher(postLogin.matchFulfilled, (state, { payload }) => {
        state.userStatus = 'idle'
        state.userData = {
          id: payload.id,
          email: payload.email,
          languageCode: payload.languageCode,
          uiMode: payload.uiMode,
          token: payload.token,
        }
      })
      .addMatcher(postLogin.matchPending, (state) => {
        state.userStatus = 'loading'
      })
      .addMatcher(postLogin.matchRejected, (state) => {
        state.userStatus = 'failed'
      })
      .addMatcher(postRegister.matchFulfilled, (state) => {
        state.userStatus = 'idle'
      })
      .addMatcher(postRegister.matchPending, (state) => {
        state.userStatus = 'loading'
      })
      .addMatcher(postRegister.matchRejected, (state) => {
        state.userStatus = 'failed'
      })
      .addMatcher(getUserCards.matchFulfilled, (state, { payload }) => {
        state.userCardsStatus = 'idle'

        payload.cards.forEach(({ cardId, treatment, amount }) => {
          if (!state.userCards[cardId]) {
            state.userCards[cardId] = {
              [Treatment.DEFAULT]: 0,
              [Treatment.FOIL]: 0,
            }
          }
          state.userCards[cardId][treatment] = amount
        })
      })
      .addMatcher(getUserCards.matchPending, (state) => {
        state.userCardsStatus = 'loading'
      })
      .addMatcher(getUserCards.matchRejected, (state) => {
        state.userCardsStatus = 'failed'
      })
      .addMatcher(addUserCard.matchFulfilled, (state, { payload }) => {
        const { cardId, treatment, amount } = payload
        if (!state.userCards[cardId]) {
          state.userCards[cardId] = {
            [Treatment.DEFAULT]: 0,
            [Treatment.FOIL]: 0,
          }
        }
        state.userCards[cardId][treatment] = amount
      })
      .addMatcher(removeUserCard.matchFulfilled, (state, { payload }) => {
        const { cardId, treatment, amount } = payload
        if (!state.userCards[cardId]) {
          state.userCards[cardId] = {
            [Treatment.DEFAULT]: 0,
            [Treatment.FOIL]: 0,
          }
        }
        state.userCards[cardId][treatment] = amount
      })
  },
  selectors: {
    selectUser: (state) => state.userData,
    selectUserStatus: (state) => state.userStatus,
    selectUserCardAmount: (state, cardId: number, treatment: Treatment) =>
      state.userCards[cardId]?.[treatment] ?? 0,
  },
})

export const { reset, setUserData } = userSlice.actions

export const { selectUser, selectUserStatus, selectUserCardAmount } =
  userSlice.selectors
