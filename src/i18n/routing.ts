import { defineRouting } from 'next-intl/routing'

export const SUPPORTED_LOCALES = ['en', 'es']
export const DEFAULT_LOCALE = 'en'

export const routing = defineRouting({
  // A list of all locales that are supported
  locales: SUPPORTED_LOCALES,

  // Used when no locale matches
  defaultLocale: DEFAULT_LOCALE,

  // Pathnames always start with the locale
  localePrefix: 'always',

  // Detect user locale
  localeDetection: true,
})
