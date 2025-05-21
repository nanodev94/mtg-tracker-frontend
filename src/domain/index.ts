import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

import type { RootState } from '@/redux/store'

// Custom paramsSerializer function for query parameter serialization
const paramsSerializer = (params: Record<string, any>): string => {
  const searchParams = new URLSearchParams()

  for (const key in params) {
    const value = params[key]

    if (value !== undefined) {
      if (Array.isArray(value)) {
        // Serialize arrays with the '[]' notation
        value.forEach((item) => {
          searchParams.append(`${key}[]`, item)
        })
      } else {
        // Serialize other values
        searchParams.append(key, value)
      }
    }
  }

  return searchParams.toString()
}

export const api = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.NEXT_PUBLIC_API_URL,
    mode: 'cors',
    paramsSerializer,
    prepareHeaders: (headers, { getState }) => {
      const token = (getState() as RootState).user.userData?.token

      if (token) {
        headers.set('authorization', `Bearer ${token}`)
      }

      return headers
    },
  }),
  endpoints: (builder) => ({}),
})
