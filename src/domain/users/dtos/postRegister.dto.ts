import type { UI_MODE } from '@/constants'

export interface PostRegisterDto {
  id: number
  email: string
  uiMode: UI_MODE
  languageCode: string
}

export interface PostRegisterBody {
  email: string
  password: string
  languageCode: string
}
