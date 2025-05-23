import { createSlice, type PayloadAction } from '@reduxjs/toolkit'

import type { RequestStatus } from '@/types'
import type { FilterData } from '@/views/SearchView/components/SearchFilters/zodSchema'

export interface SearchSliceState {
  filters: FilterData
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
    setFilters: (state, { payload }: PayloadAction<FilterData>) => {
      state.filters = payload
    },
    setPage: (state, { payload }: PayloadAction<number>) => {
      state.filters.page = payload
    },
  },
  extraReducers: (builder) => {},
  selectors: {
    selectFilters: (state) => state.filters,
    selectSearchStatus: (state) => state.status,
  },
})

export const { reset, setFilters, setPage } = searchSlice.actions

export const { selectFilters, selectSearchStatus } = searchSlice.selectors
