/* eslint-disable no-unused-vars */

export enum PAGE {
  HOME = '/',
  LOGIN = '/login',
  REGISTER = '/register',
  SEARCH = '/search',
  SETS = '/sets',
}

export enum UI_MODE {
  AUTO = 'AUTO',
  LIGHT = 'LIGHT',
  DARK = 'DARK',
}

export enum COOKIE_KEY {
  AUTH_TOKEN = 'AUTH_TOKEN',
  NEXT_LOCALE = 'NEXT_LOCALE',
}

export enum LOCAL_STORAGE_KEY {
  USER_DATA = 'USER_DATA',
}

export enum ENVIRONMENTS {
  development = 'development',
  production = 'production',
}

export const COOKIES_DAYS_TO_EXPIRE = 7

export const RESULTS_PER_PAGE = 20
export const EMPTY_VALUE = '--'
export const TOAST_CONTAINER = 'toast-root'
export const TWITTER_DATA = {
  site: 'https://twitter.com/nanodev94',
  creator: '@nanodev94',
}
