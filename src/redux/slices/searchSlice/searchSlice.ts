import { createSlice, type PayloadAction } from '@reduxjs/toolkit'

import type { RequestStatus } from '@/types'

export interface Filters {
  name?: string
  sortBy?: string
  colors?: string[]
  types?: string[]
  subtypes?: string[]
  rarities?: string[]
  keywords?: string[]
  artists?: string[]
  treatments?: string[]
  setIds?: number[]
}

export interface SearchSliceState {
  filters: Filters
  status: RequestStatus
}

const initialState: SearchSliceState = {
  filters: {},
  status: 'idle',
}

export const searchSlice = createSlice({
  name: 'search',
  initialState,
  reducers: {
    reset: () => initialState,
    setFilters: (state, { payload }: PayloadAction<Filters>) => {
      state.filters = payload
    },
  },
  extraReducers: (builder) => {},
  selectors: {
    selectSearchStatus: (state) => state.status,
  },
})

export const { reset, setFilters } = searchSlice.actions

export const { selectSearchStatus } = searchSlice.selectors
