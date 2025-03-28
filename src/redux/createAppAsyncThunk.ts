import { createAsyncThunk } from '@reduxjs/toolkit'

import type { AppDispatch, RootState } from './store'

/**
 * ? A utility function to create a typed Async Thunk Actions.
 */
export const createAppAsyncThunk = createAsyncThunk.withTypes<{
  state: RootState
  dispatch: AppDispatch
  rejectValue: string
}>()
