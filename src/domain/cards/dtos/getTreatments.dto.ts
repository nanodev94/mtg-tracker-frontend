export interface GetTreatmentsDto {
  treatments: string[]
  count: number
}

export interface GetTreatmentsQueryParams {
  colors?: string[]
  types?: string[]
  subtypes?: string[]
  rarities?: string[]
  keywords?: string[]
  artists?: string[]
  setIds?: number[]
}
