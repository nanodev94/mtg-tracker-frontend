import { api } from '@/domain'

import type { Card } from '../@types'

import type { GetCardsDto, GetCardsQueryParams } from './dtos/getCards.dto'

const cardsApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getCards: builder.query<
      GetCardsDto,
      { locale: string; params: GetCardsQueryParams }
    >({
      query: ({ locale, params }) => ({
        url: `/cards/${locale}`,
        params,
      }),
    }),
    getCard: builder.query<Card, { locale: string; id: number }>({
      query: ({ locale, id }) => `/cards/${locale}/${id}`,
    }),
  }),
})

export const { getCards, getCard } = cardsApi.endpoints
