'use client'

import { Reveal } from '@/components/motion/reveal'
import { PatternSection } from '@/components/pattern-section'
import { useLocale } from '@/components/locale-provider'
import { cn } from '@/lib/utils'

export function PhilosophySection() {
  const { locale, dict } = useLocale()
  const t = dict.home.philosophy

  return (
    <PatternSection
      className="px-6 py-18 md:px-12 md:py-18"
      pattern={{ color: 'var(--color-paper-300)', opacity: 1, size: 80 }}
    >
      <div className="mx-auto max-w-7xl text-center">
        <Reveal>
          <p className="text-sm font-semibold text-cinnabar-600 uppercase">
            {t.eyebrow}
          </p>
        </Reveal>
        <Reveal delay={0.08}>
          <h2
            className={cn(
              'mt-5 font-display text-[clamp(34px,5vw,58px)] leading-[1.05] font-semibold tracking-tight text-balance text-ink-900',
              locale === 'zh' ? 'font-han' : 'font-display',
            )}
          >
            {t.titleLine1}
            <br />
            {t.titleLine2}
          </h2>
        </Reveal>
        <Reveal delay={0.16}>
          <p
            className={cn(
              'mx-auto mt-7 max-w-5xl font-body text-xl leading-relaxed text-ink-500',
              locale === 'zh' ? 'font-zh-body' : 'font-body',
            )}
          >
            {t.body}
          </p>
        </Reveal>
      </div>
    </PatternSection>
  )
}
