'use client'

import { CtaLink } from '@/components/cta-link'
import { useLocale } from '@/components/locale-provider'
import { AmbientImage } from '@/components/motion/ambient-image'
import { cn } from '@/lib/utils'

export function HeroSection() {
  const { locale, dict } = useLocale()
  const t = dict.home.hero

  return (
    <header className="relative h-screen min-h-[680px] overflow-hidden">
      <AmbientImage
        src="/images/hero_banner.jpg"
        alt="Blue-green mountain landscape painting"
        priority
        className="absolute inset-0"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-ink-900/35 via-ink-900/15 to-ink-900/55" />

      <div className="relative mx-auto flex h-full max-w-[1280px] flex-col justify-center px-6 text-paper-100 md:px-12">
        <p className="text-xs font-semibold tracking-[0.24em] text-cinnabar-300 uppercase">
          {t.eyebrow}
        </p>
        <h1 className={cn("mt-0 font-display text-[clamp(48px,8.4vw,116px)] leading-[1.05] font-semibold tracking-tight text-balance text-paper-000", locale === 'zh' ? 'font-han' : 'font-display')}>
          {t.titleLine1}
        </h1>
          <h1 className={cn("mt-0 font-display text-[clamp(48px,8.4vw,116px)] leading-[1.05] font-semibold tracking-tight text-balance text-paper-000", locale === 'zh' ? 'font-han' : 'font-display')}>
          {t.titleLine3}
        </h1>
        <p className={cn("mt-6 max-w-[540px] font-body text-xl leading-relaxed text-paper-100", locale === 'zh' ? 'font-zh-body' : 'font-body')}>
          {t.body}
        </p>
        <div className="mt-9 flex flex-wrap gap-3.5">
          <CtaLink href="/consultation">{t.ctaConsult}</CtaLink>
          <CtaLink href="/apothecary" variant="light">
            {t.ctaApothecary}
          </CtaLink>
        </div>
      </div>

      <div className="absolute bottom-9 left-1/2 flex -translate-x-1/2 flex-col items-center gap-2.5 text-[11px] tracking-[0.24em] text-paper-100/80 uppercase">
        {t.scroll}
        <span className="h-10 w-px bg-gradient-to-b from-paper-100 to-transparent" />
      </div>
    </header>
  )
}
