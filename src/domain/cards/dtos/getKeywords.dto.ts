export interface GetKeywordsDto {
  keywords: string[]
  count: number
}

export interface GetKeywordsQueryParams {
  colors?: string[]
  types?: string[]
  subtypes?: string[]
  rarities?: string[]
  artists?: string[]
  treatments?: string[]
  setIds?: number[]
}
