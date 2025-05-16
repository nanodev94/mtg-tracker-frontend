export interface GetArtistsDto {
  artists: string[]
  count: number
}

export interface GetArtistsQueryParams {
  colors?: string[]
  types?: string[]
  subtypes?: string[]
  rarities?: string[]
  keywords?: string[]
  treatments?: string[]
  setIds?: number[]
}
