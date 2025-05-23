export interface GetSubtypesDto {
  subtypes: string[]
  count: number
}

export interface GetSubtypesQueryParams {
  colors?: string[]
  types?: string[]
  rarities?: string[]
  keywords?: string[]
  artists?: string[]
  treatments?: string[]
  setIds?: number[]
}
