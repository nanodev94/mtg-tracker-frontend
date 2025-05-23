import type { Set } from '@/domain/@types'

export interface GetSetsDto {
  sets: Set[]
  count: number
}

export interface GetSetsQueryParams {
  name?: string
  page?: number
  resultsPerPage?: number
  sortField?: string
  sortDir?: string
}
