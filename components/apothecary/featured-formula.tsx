'use client'

import { CtaLink } from '@/components/cta-link'
import { useLocale } from '@/components/locale-provider'
import { ParallaxImage } from '@/components/motion/parallax-image'
import { Reveal } from '@/components/motion/reveal'
import { cn } from '@/lib/utils'

export function FeaturedFormula() {
  const { locale, dict } = useLocale()
  const t = dict.apothecary.featured

  return (
    <section className="bg-paper-200 px-6 py-28 md:px-12 md:py-36">
      <div className="mx-auto grid max-w-[1280px] grid-cols-1 items-center gap-12 md:grid-cols-2 md:gap-20">
        <Reveal>
          <ParallaxImage
            src="/assets/img-herbs.png"
            alt={t.title}
            sizes="(max-width: 768px) 100vw, 50vw"
            className="aspect-[4/5] rounded-[14px]"
          />
        </Reveal>
        <Reveal delay={0.08}>
          <p className="text-xs font-semibold tracking-[0.24em] text-cinnabar-600 uppercase">
            {t.eyebrow}
          </p>
          <h2 className="mt-4 font-display text-[clamp(30px,4vw,48px)] font-semibold tracking-tight text-ink-900">
            {t.title}
          </h2>
          <p className="mt-5 font-body text-lg leading-relaxed text-ink-500">
            {t.body}
          </p>
          <div className="mt-8 flex flex-col gap-3.5">
            {t.ingredients.map((item) => (
              <div key={item.role} className="flex items-center gap-3.5">
                <span
                  className={cn(
                    'flex size-[42px] flex-none items-center justify-center rounded-[9px] border-2 border-cinnabar-500 text-xl text-cinnabar-600',
                    locale === 'zh' ? 'font-han' : 'font-display text-base font-semibold',
                  )}
                >
                  {item.role}
                </span>
                <span className="text-[15.5px] text-ink-800">{item.text}</span>
              </div>
            ))}
          </div>
          <CtaLink href="/consultation" className="mt-8">
            {t.cta}
          </CtaLink>
        </Reveal>
      </div>
    </section>
  )
}
