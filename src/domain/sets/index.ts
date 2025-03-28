import { api } from '@/domain'

import type { Set } from '../@types'

import type { GetSetsDto, GetSetsQueryParams } from './dtos/getSets.dto'

const setsApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getSets: builder.query<GetSetsDto, GetSetsQueryParams>({
      query: (params) => ({
        url: '/sets',
        params,
      }),
    }),
    getSet: builder.query<Set, number>({
      query: (id) => `/sets/${id}`,
    }),
  }),
})

export const { getSets, getSet } = setsApi.endpoints
