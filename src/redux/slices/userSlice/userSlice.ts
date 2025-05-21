import { createSlice, type PayloadAction } from '@reduxjs/toolkit'

import type { UI_MODE } from '@/constants'
import { postLogin, postRegister } from '@/domain/users'
import type { RequestStatus } from '@/types'

interface UserData {
  id: number
  email: string
  languageCode: string
  uiMode: UI_MODE
  token: string
}

export interface UserSliceState {
  userData?: UserData
  status: RequestStatus
}

const initialState: UserSliceState = {
  status: 'idle',
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
        state.status = 'idle'
        state.userData = {
          id: payload.id,
          email: payload.email,
          languageCode: payload.languageCode,
          uiMode: payload.uiMode,
          token: payload.token,
        }
      })
      .addMatcher(postLogin.matchPending, (state) => {
        state.status = 'loading'
      })
      .addMatcher(postLogin.matchRejected, (state) => {
        state.status = 'failed'
      })
      .addMatcher(postRegister.matchFulfilled, (state) => {
        state.status = 'idle'
      })
      .addMatcher(postRegister.matchPending, (state) => {
        state.status = 'loading'
      })
      .addMatcher(postRegister.matchRejected, (state) => {
        state.status = 'failed'
      })
  },
  selectors: {
    selectUser: (state) => state.userData,
    selectUserStatus: (state) => state.status,
  },
})

export const { reset, setUserData } = userSlice.actions

export const { selectUser, selectUserStatus } = userSlice.selectors
