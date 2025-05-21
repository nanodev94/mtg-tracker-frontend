import type { UI_MODE } from '@/constants'

export interface PostLoginDto {
  id: number
  email: string
  uiMode: UI_MODE
  languageCode: string
  token: string
}

export interface PostLoginBody {
  email: string
  password: string
}
