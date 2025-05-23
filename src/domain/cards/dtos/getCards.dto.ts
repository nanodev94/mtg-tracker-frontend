import type { Card } from '@/domain/@types'

export interface GetCardsDto {
  cards: Card[]
  count: number
}

export interface GetCardsQueryParams {
  name?: string
  colors?: string[]
  types?: string[]
  subtypes?: string[]
  rarities?: string[]
  keywords?: string[]
  artists?: string[]
  treatments?: string[]
  setIds?: number[]
  page?: number
  resultsPerPage?: number
  sortField?: string
  sortDir?: string
}
