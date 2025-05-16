import { createSlice, type PayloadAction } from '@reduxjs/toolkit'

import { getArtists } from '@/domain/cards'
import type { RequestStatus } from '@/types'

export interface ArtistsSliceState {
  artists: string[]
  count: number
  status: RequestStatus
}

const initialState: ArtistsSliceState = {
  artists: [],
  count: 0,
  status: 'idle',
}

export const artistsSlice = createSlice({
  name: 'artists',
  initialState,
  reducers: {
    reset: () => initialState,
    setArtists: (state, { payload }: PayloadAction<string[]>) => {
      state.artists = payload
      state.count = payload.length
    },
  },
  extraReducers: (builder) => {
    builder
      .addMatcher(getArtists.matchFulfilled, (state, { payload }) => {
        state.status = 'idle'
        state.artists = payload.artists
        state.count = payload.count
      })
      .addMatcher(getArtists.matchPending, (state) => {
        state.status = 'loading'
      })
      .addMatcher(getArtists.matchRejected, (state) => {
        state.status = 'failed'
      })
  },
  selectors: {
    selectArtists: (state) => state.artists,
    selectArtistsCount: (state) => state.count,
    selectArtistsStatus: (state) => state.status,
  },
})

export const { reset, setArtists } = artistsSlice.actions

export const { selectArtists, selectArtistsCount, selectArtistsStatus } =
  artistsSlice.selectors
