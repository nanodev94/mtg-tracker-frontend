import type { NextRequest } from 'next/server'
import { NextResponse } from 'next/server'

import { COOKIE_KEY, PAGE } from '@/constants'
import { DEFAULT_LOCALE } from '@/i18n/routing'

const redirectMiddleware = (req: NextRequest): NextResponse | undefined => {
  const pathname = req.nextUrl.pathname
  const isLoginPage = pathname.includes(PAGE.LOGIN)
  const isRegisterPage = pathname.includes(PAGE.REGISTER)
  const token = req.cookies.get(COOKIE_KEY.AUTH_TOKEN)?.value
  const locale =
    req.cookies.get(COOKIE_KEY.NEXT_LOCALE)?.value ?? DEFAULT_LOCALE

  if (token && (isLoginPage || isRegisterPage)) {
    return NextResponse.redirect(
      new URL(`/${locale}${PAGE.SEARCH}`, req.nextUrl)
    )
  }
}

export default redirectMiddleware
