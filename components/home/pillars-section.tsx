'use client'

import { Reveal } from '@/components/motion/reveal'
import { useLocale } from '@/components/locale-provider'
import { cn } from '@/lib/utils'
import { PatternSection } from '../pattern-section'

export function PillarsSection() {
  const { locale, dict } = useLocale()
  const pillars = dict.home.pillars

  return (
    <PatternSection className="px-6 py-16 md:px-12">
      <div className="mx-auto grid max-w-[1280px] grid-cols-1 gap-12 md:grid-cols-3">
        {pillars.map((pillar, i) => (
          <Reveal key={pillar.title} delay={i * 0.08}>
            <div
              className={cn(
                'text-[46px] leading-none text-jade-700',
                locale === 'zh' ? 'font-han' : 'font-display text-[32px] tracking-wide',
              )}
            >
              {pillar.glyph}
            </div>
  
            <hr className="my-5 border-ink-300" />
               <p className={cn("mt-6 font-body text-[clamp(20px,2vw,24px)] leading-relaxed text-ink-500", locale === 'zh' ? 'font-zh-body' : 'font-body')}>
              {pillar.body}
            </p>
          </Reveal>
        ))}
      </div>
    </PatternSection>
  )
}
