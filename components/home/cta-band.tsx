'use client'

import { CtaLink } from '@/components/cta-link'
import { useLocale } from '@/components/locale-provider'
import { ParallaxImage } from '@/components/motion/parallax-image'
import { Reveal } from '@/components/motion/reveal'
import { cn } from '@/lib/utils'

export function CtaBand() {
  const { locale, dict } = useLocale()
  const t = dict.home.ctaBand

  return (
    <section className="relative overflow-hidden">
      <ParallaxImage
        src="/images/exterior.jpg"
        alt=""
        className="absolute inset-0"
      />
      <div className="absolute inset-0 bg-ink-900/50" />
      <div className="relative mx-auto max-w-[1280px] px-6 py-36 text-center text-paper-100 md:px-12">
        <Reveal>
          <h2 className={cn("font-display text-[clamp(32px,5vw,60px)] font-semibold tracking-tight text-balance text-paper-000", locale === 'zh' ? 'font-han' : 'font-display')}>
            {t.title}
          </h2>
        </Reveal>
        <Reveal delay={0.08}>
          <p className={cn("mx-auto mt-5 max-w-[620px] font-body text-[clamp(20px,2vw,24px)] leading-relaxed text-paper-100/90", locale === 'zh' ? 'font-zh-body' : 'font-body')}>
            {t.body}
          </p>
        </Reveal>
        <Reveal delay={0.16}>
          <div className="mt-9 flex justify-center">
            <CtaLink href="/consultation" variant="light">
              {t.cta}
            </CtaLink>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
