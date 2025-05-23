export interface Card {
  id: number
  setId: number
  setNumber: number
  name: string
  description?: string
  lore?: string
  colors?: string[]
  mana?: string
  types?: string[]
  subtypes?: string[]
  rarity?: string
  isExtra?: boolean
  isPromo?: boolean
  isBundle?: boolean
  isBuyABox?: boolean
  isStorySpotlight?: boolean
  keywords?: string[]
  power?: string
  defense?: string
  loyalty?: string
  artist?: string
  copyright?: string
  treatments?: string[]
  alternatives?: number[]
}

export interface Set {
  id: number
  code: string
  name: string
  isCommander: boolean
  artCardsCount: number
  tokenCardsCount: number
  blackCardsCount: number
  whiteCardsCount: number
  redCardsCount: number
  greenCardsCount: number
  blueCardsCount: number
  colorlessCardsCount: number
  landCardsCount: number
  commonCardsCount: number
  uncommonCardsCount: number
  rareCardsCount: number
  mythicCardsCount: number
  totalCards: number
  extraCards: number
  releasedAt: Date
}
