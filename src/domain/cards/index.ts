import { api } from '@/domain'

import type { Card } from '../@types'

import type {
  GetArtistsDto,
  GetArtistsQueryParams,
} from './dtos/getArtists.dto'
import type { GetCardsDto, GetCardsQueryParams } from './dtos/getCards.dto'
import type {
  GetKeywordsDto,
  GetKeywordsQueryParams,
} from './dtos/getKeywords.dto'
import type {
  GetSubtypesDto,
  GetSubtypesQueryParams,
} from './dtos/getSubtypes.dto'
import type {
  GetTreatmentsDto,
  GetTreatmentsQueryParams,
} from './dtos/getTreatments.dto'
import type { GetTypesDto, GetTypesQueryParams } from './dtos/getTypes.dto'

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
    getArtists: builder.query<GetArtistsDto, GetArtistsQueryParams>({
      query: (params) => ({
        url: '/cards/artists',
        params,
      }),
    }),
    getKeywords: builder.query<GetKeywordsDto, GetKeywordsQueryParams>({
      query: (params) => ({
        url: '/cards/keywords',
        params,
      }),
    }),
    getSubtypes: builder.query<GetSubtypesDto, GetSubtypesQueryParams>({
      query: (params) => ({
        url: '/cards/subtypes',
        params,
      }),
    }),
    getTreatments: builder.query<GetTreatmentsDto, GetTreatmentsQueryParams>({
      query: (params) => ({
        url: '/cards/treatments',
        params,
      }),
    }),
    getTypes: builder.query<GetTypesDto, GetTypesQueryParams>({
      query: (params) => ({
        url: '/cards/types',
        params,
      }),
    }),
  }),
})

export const {
  getCards,
  getCard,
  getArtists,
  getKeywords,
  getSubtypes,
  getTreatments,
  getTypes,
} = cardsApi.endpoints
