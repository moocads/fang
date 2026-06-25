'use client'

import { Reveal } from '@/components/motion/reveal'
import { useLocale } from '@/components/locale-provider'
import { cn } from '@/lib/utils'

export function TestimonialsSection() {
  const { locale, dict } = useLocale()
  const t = dict.home.testimonials

  return (
    <>
      <section className="px-6 py-28 md:px-12 md:py-36">
        <div className="mx-auto max-w-[860px] text-center">
          <Reveal delay={0.08}>
            <blockquote className={cn("mt-7 font-body text-[clamp(24px,3.4vw,38px)] leading-[1.5] text-ink-900", locale === 'zh' ? 'font-zh-heading' : 'font-body')}>
              {t.featured}
            </blockquote>
          </Reveal>
          <Reveal delay={0.16}>
            <div className={cn("mt-7 text-[clamp(16px,2vw,20px)] tracking-wide text-ink-500", locale === 'zh' ? 'font-zh-body' : 'font-body')}>
              {t.featuredAttribution}
            </div>
          </Reveal>
        </div>
      </section>

      <section className="bg-paper-200 px-6 py-24 md:px-12">
        <div className="mx-auto grid max-w-[1280px] grid-cols-1 gap-10 md:grid-cols-3">
          {t.quotes.map((quote, i) => (
            <Reveal key={quote.name} delay={i * 0.08} as="figure">
              <p className={cn("font-body text-[clamp(20px,2vw,24px)] leading-relaxed text-ink-800", locale === 'zh' ? 'font-zh-body' : 'font-body')}>
                {quote.body}
              </p>
              <figcaption className="mt-5 text-[13px] text-ink-500">
                {quote.name}
              </figcaption>
            </Reveal>
          ))}
        </div>
      </section>
    </>
  )
}
