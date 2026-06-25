'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { switchLocalePath } from '@/lib/i18n/paths'
import type { Locale } from '@/lib/i18n/config'
import { cn } from '@/lib/utils'

export function LanguageSwitcher({
  locale,
  dark = false,
  labels,
  className,
}: {
  locale: Locale
  dark?: boolean
  labels: { en: string; zh: string }
  className?: string
}) {
  const pathname = usePathname()
  const otherLocale: Locale = locale === 'en' ? 'zh' : 'en'
  const href = switchLocalePath(pathname, otherLocale)

  return (
    <Link
      href={href}
      className={cn(
        'inline-flex items-center rounded-full border px-3 py-2 text-xs font-semibold tracking-wide transition-colors',
        dark
          ? 'border-paper-100/30 text-paper-100 hover:border-paper-100/60 hover:bg-paper-100/10'
          : 'border-ink-300 text-ink-700 hover:border-cinnabar-300 hover:text-cinnabar-600',
        className,
      )}
      aria-label={locale === 'en' ? 'Switch to Chinese' : 'Switch to English'}
    >
      {locale === 'en' ? labels.zh : labels.en}
    </Link>
  )
}
