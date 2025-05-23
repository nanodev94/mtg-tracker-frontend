export interface GetTypesDto {
  types: string[]
  count: number
}

export interface GetTypesQueryParams {
  colors?: string[]
  subtypes?: string[]
  rarities?: string[]
  keywords?: string[]
  artists?: string[]
  treatments?: string[]
  setIds?: number[]
}
