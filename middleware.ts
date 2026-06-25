import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { defaultLocale } from '@/lib/i18n/config'

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  if (pathname === '/zh' || pathname.startsWith('/zh/')) {
    return NextResponse.next()
  }

  if (pathname === '/en' || pathname.startsWith('/en/')) {
    const stripped = pathname.replace(/^\/en/, '') || '/'
    return NextResponse.redirect(new URL(stripped, request.url))
  }

  const url = request.nextUrl.clone()
  url.pathname = `/${defaultLocale}${pathname === '/' ? '' : pathname}`
  return NextResponse.rewrite(url)
}

export const config = {
  matcher: ['/((?!api|_next|_vercel|.*\\..*).*)'],
}
