import type { Locale } from './config'
import { defaultLocale } from './config'

export function localizedPath(path: string, locale: Locale): string {
  const normalized = path.startsWith('/') ? path : `/${path}`
  if (locale === defaultLocale) return normalized
  return normalized === '/' ? '/zh' : `/zh${normalized}`
}

export function stripLocaleFromPath(pathname: string): string {
  if (pathname === '/zh' || pathname.startsWith('/zh/')) {
    const stripped = pathname.slice(3)
    return stripped || '/'
  }
  return pathname
}

export function getLocaleFromPath(pathname: string): Locale {
  if (pathname === '/zh' || pathname.startsWith('/zh/')) return 'zh'
  return defaultLocale
}

export function switchLocalePath(pathname: string, targetLocale: Locale): string {
  return localizedPath(stripLocaleFromPath(pathname), targetLocale)
}
