import type { Metadata } from 'next'
import Image from 'next/image'
import { SiteNav } from '@/components/site-nav'
import { SiteFooter } from '@/components/site-footer'
import { CtaLink } from '@/components/cta-link'
import { ParallaxImage } from '@/components/motion/parallax-image'
import { Reveal } from '@/components/motion/reveal'
import { getDictionary } from '@/lib/i18n'
import { isLocale } from '@/lib/i18n/config'
import { notFound } from 'next/navigation'
import { cn } from '@/lib/utils'
import { Locale } from '@/lib/i18n/config'
import { PatternSection } from '@/components/pattern-section'
export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>
}): Promise<Metadata> {
  const { locale: raw } = await params
  if (!isLocale(raw)) return {}
  const dict = getDictionary(raw)
  return {
    title: dict.meta.aboutTitle,
    description: dict.meta.aboutDescription,
  }
}


export default async function AboutPage({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale: raw } = await params
  const locale = raw as Locale
  if (!isLocale(raw)) notFound()
  const dict = getDictionary(raw)
  const t = dict.about

  return (
    <>
      <SiteNav />
      <main>
        <PatternSection className="px-6 pt-[184px] pb-24 md:px-12">
          <div className="mx-auto max-w-[860px]">
            <Reveal>
              <p className="text-xs font-semibold tracking-[0.24em] text-cinnabar-600 uppercase">
                {t.eyebrow}
              </p>
            </Reveal>
            <Reveal delay={0.08}>
              <h1 className={cn("mt-6 font-display text-[clamp(40px,6.6vw,86px)] leading-[1.05] font-semibold tracking-tight text-balance text-ink-900", locale === 'zh' ? 'font-han' : 'font-display')}>
                {t.titleLine1}
                <br />
                {t.titleLine2}
              </h1>
            </Reveal>
            <Reveal delay={0.16}>
              <p className={cn("mt-7 max-w-[600px] font-body text-[clamp(20px,2vw,24px)] leading-relaxed text-ink-500", locale === 'zh' ? 'font-zh-body' : 'font-body')}>
                {t.intro}
              </p>
            </Reveal>
          </div>
        </PatternSection>

        <ParallaxImage
          src="/images/exterior.jpg"
          alt="Terracotta mountain landscape"
          className="h-[80vh] min-h-[420px] w-full"
        />

        <section className="px-6 py-28 md:px-12 md:py-36">
          <div className="mx-auto max-w-7xl">
            <Reveal>
              <p className={cn("font-body text-[clamp(22px,2.8vw,30px)] leading-[1.6] text-ink-900", locale === 'zh' ? 'font-zh-body' : 'font-body')}>
                {raw === 'en' ? (
                  <>
                    For two thousand years, Chinese medicine has held a quiet
                    conviction: the finest care tends the body{' '}
                    <em className="text-cinnabar-600 not-italic">before</em>{' '}
                    illness arrives.
                  </>
                ) : (
                  t.pullQuote
                )}
              </p>
            </Reveal>
            <Reveal delay={0.08}>
              <div className="mt-12 columns-1 gap-14 text-base leading-[1.8] text-ink-500 md:columns-2">
                <p className="mt-0">{t.col1}</p>
                <p className="mt-6 md:mt-0">{t.col2}</p>
              </div>
            </Reveal>
          </div>
        </section>

        <section className="bg-ink-900 px-6 py-24 text-paper-100 md:px-12">
          <div className="mx-auto grid max-w-[1280px] grid-cols-1 gap-12 md:grid-cols-3">
            {t.values.map((value, i) => (
              <Reveal key={value.title} delay={i * 0.08}>
                <div className="font-han text-[40px] text-cinnabar-300">
                  {value.glyph}
                </div>
                <h3 className={cn("mt-3.5 mb-3 font-display text-[22px] font-semibold text-paper-000", locale === 'zh' ? 'font-han' : 'font-display')}>
                  {value.title}
                </h3>
                <p className={cn("text-[clamp(20px,2vw,24px)] leading-relaxed text-paper-100/70", locale === 'zh' ? 'font-zh-body' : 'font-body')}>
                  {value.body}
                </p>
              </Reveal>
            ))}
          </div>
        </section>

  

        <section className="bg-paper-200 px-6 py-24 text-center md:px-12">
          <div className="mx-auto max-w-[860px]">
            <Reveal>
              <h2 className={cn("font-display text-[clamp(30px,4.4vw,52px)] font-semibold tracking-tight text-ink-900", locale === 'zh' ? 'font-han' : 'font-display')}>
                {t.closing.title}
              </h2>
            </Reveal>
            <Reveal delay={0.08}>
              <div className="mt-8 flex flex-wrap justify-center gap-3.5">
                <CtaLink href="/consultation">{t.closing.ctaConsult}</CtaLink>
                <CtaLink href="/apothecary" variant="light">
                  {t.closing.ctaApothecary}
                </CtaLink>
              </div>
            </Reveal>
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  )
}
