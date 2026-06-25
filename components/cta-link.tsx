'use client'

import Link from 'next/link'
import type { ReactNode } from 'react'
import { useLocale } from '@/components/locale-provider'
import {
  bracketBtnGhost,
  chamferBtn,
  chamferBtnLight,
  chamferBtnPrimary,
} from '@/lib/chamfer-button'
import { localizedPath } from '@/lib/i18n/paths'
import { cn } from '@/lib/utils'

type Variant = 'primary' | 'light' | 'ghost'

const variants: Record<Variant, string> = {
  primary: cn(chamferBtn, chamferBtnPrimary),
  light: cn(chamferBtn, chamferBtnLight),
  ghost: bracketBtnGhost,
}

export function CtaLink({
  href,
  children,
  variant = 'primary',
  className,
}: {
  href: string
  children: ReactNode
  variant?: Variant
  className?: string
}) {
  const { locale } = useLocale()
  const resolved =
    href.startsWith('http') || href.startsWith('mailto:')
      ? href
      : localizedPath(href, locale)

  return (
    <Link
      href={resolved}
      className={cn(variants[variant], className)}
    >
      {children}
    </Link>
  )
}
