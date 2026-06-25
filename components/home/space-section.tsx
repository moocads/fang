'use client'

import Image from 'next/image'
import { CtaLink } from '@/components/cta-link'
import { useLocale } from '@/components/locale-provider'
import { Reveal } from '@/components/motion/reveal'
import { cn } from '@/lib/utils'
import { PatternSection } from '@/components/pattern-section'

export function SpaceSection() {
  const { locale, dict } = useLocale()
  const t = dict.home.space

  return (
    <PatternSection className="px-6 py-14 md:px-12 md:py-14">
      {/* <div className="absolute left-20 ">
        <Image src="/assets/illustration-herb.png" alt="Space" width={200} height={200} />
        </div> */}
      <div className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-12 md:grid-cols-2 md:gap-20">
        <Reveal>
          <p className="text-[clamp(16px,2vw,20px)] font-semibold tracking-[0.24em] text-cinnabar-600 uppercase">
            {t.eyebrow}
          </p>
          <h2 className={cn("mt-4 font-display text-[clamp(30px,4vw,46px)] leading-[1.05] font-semibold tracking-tight text-ink-900", locale === 'zh' ? 'font-han' : 'font-display')}>
            {t.titleLine1}
            <br />
            {t.titleLine2}
          </h2>
          <p className={cn("mt-6 font-body text-[clamp(20px,2vw,24px)] leading-relaxed text-ink-500", locale === 'zh' ? 'font-zh-body' : 'font-body')}>
            {t.body}
          </p>
          <CtaLink href="/about" variant="primary" className="mt-8">
            {t.cta}
          </CtaLink>
        </Reveal>
        <Reveal delay={0.08}>
          <Image
            src="/assets/img-clinic.png"
            alt="FĀNG clinic interior"
            width={286}
            height={232}
            sizes="(max-width: 768px) 100px"
            className="h-auto w-3/4 max-w-full md:ml-auto"
          />
        </Reveal>
      </div>
    </PatternSection>
  )
}
