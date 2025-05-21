import type { NextRequest, NextResponse } from 'next/server'

import intlMiddleware from './middlewares/intlMiddleware'
import redirectMiddleware from './middlewares/redirectMiddleware'

const middleware = (req: NextRequest): NextResponse => {
  const redirection = redirectMiddleware(req)
  if (redirection) return redirection

  return intlMiddleware(req)
}

export const config = {
  // Match only internationalized pathnames
  matcher: [
    // Enable a redirect to a matching locale at the root
    '/',

    // Set a cookie to remember the previous locale for
    // all requests that have a locale prefix
    '/(es|en)/:path*',

    // Enable redirects that add missing locales
    // (e.g. `/pathnames` -> `/en/pathnames`)
    '/((?!_next|_vercel|.*\\..*).*)',
  ],
}

export default middleware
