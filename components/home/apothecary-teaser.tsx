'use client'

import Image from 'next/image'
import { CtaLink } from '@/components/cta-link'
import { PatternSection } from '@/components/pattern-section'
import { useLocale } from '@/components/locale-provider'
import { Reveal } from '@/components/motion/reveal'
import { cn } from '@/lib/utils'

const tiles = [
  { src: '/assets/img-tea.png', altEn: 'Seasonal tea', altZh: '节气茶饮' },
  { src: '/assets/img-herbs.png', altEn: 'Herbal selection', altZh: '本草甄选' },
  { src: '/assets/img-wood.png', altEn: 'Aged root', altZh: '陈年根材' },
]

export function ApothecaryTeaser() {
  const { locale, dict } = useLocale()
  const t = dict.home.apothecaryTeaser

  return (
    <PatternSection
      className="bg-ink-900 px-6 py-28 text-paper-100 md:px-12 md:py-36"
      pattern={{ color: 'var(--color-jade-700)', opacity: 0.6,size: 50 }}
    >
      <div className="mx-auto max-w-7xl">
        <div className="grid grid-cols-1 items-end gap-10 md:grid-cols-2">
          <Reveal>
            <h2
              className={cn(
                'mt-4 font-display text-[clamp(30px,4vw,48px)] font-semibold tracking-tight text-paper-000',
                locale === 'zh' ? 'font-han' : 'font-display',
              )}
            >
              {t.title}
            </h2>
            <p
              className={cn(
                'mt-5 font-body text-[clamp(20px,2vw,24px)] leading-relaxed text-paper-100/80',
                locale === 'zh' ? 'font-zh-body' : 'font-body',
              )}
            >
              {t.body}
            </p>
          </Reveal>
          <Reveal delay={0.08} className="md:text-right">
            <CtaLink href="/apothecary" variant="light">
              {t.cta}
            </CtaLink>
          </Reveal>
        </div>

        <div className="mt-16 grid grid-cols-1 gap-6 sm:grid-cols-3">
          {tiles.map((tile, i) => (
            <Reveal key={tile.src} delay={i * 0.08}>
              <div className="relative aspect-[3/2] overflow-hidden rounded-[14px]">
                <Image
                  src={tile.src}
                  alt={locale === 'zh' ? tile.altZh : tile.altEn}
                  fill
                  sizes="(max-width: 640px) 100vw, 33vw"
                  className="object-cover"
                />
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </PatternSection>
  )
}
