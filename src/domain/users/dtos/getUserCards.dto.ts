export interface GetUserCardsDto {
  cards: {
    cardId: number
    treatment: string
    amount: number
  }[]
  count: number
}

export interface GetUserCardsQueryParams {
  setIds?: number[]
  cardIds?: number[]
  treatments?: string[]
}
