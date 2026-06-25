import type { Metadata } from 'next'
import { SiteNav } from '@/components/site-nav'
import { SiteFooter } from '@/components/site-footer'
import { Reveal } from '@/components/motion/reveal'
import { ProductGrid } from '@/components/apothecary/product-grid'
import { FeaturedFormula } from '@/components/apothecary/featured-formula'
import { getDictionary } from '@/lib/i18n'
import { isLocale } from '@/lib/i18n/config'
import { notFound } from 'next/navigation'
import { cn } from '@/lib/utils'
import { Locale } from '@/lib/i18n/config'

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>
}): Promise<Metadata> {
  const { locale: raw } = await params
  if (!isLocale(raw)) return {}
  const dict = getDictionary(raw)
  return {
    title: dict.meta.apothecaryTitle,
    description: dict.meta.apothecaryDescription,
  }
}

export default async function ApothecaryPage({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale: raw } = await params
  const locale = raw as Locale
  if (!isLocale(raw)) notFound()
  const dict = getDictionary(raw)
  const t = dict.apothecary

  return (
    <>
      <SiteNav />
      <main>
        <header className="px-6 pt-[172px] pb-16 md:px-12">
          <div className="mx-auto max-w-[860px] text-center">
            <Reveal>
              <p className="text-xs font-semibold tracking-[0.24em] text-cinnabar-600 uppercase">
                {t.eyebrow}
              </p>
            </Reveal>
            <Reveal delay={0.08}>
              <h1 className={cn("mt-5 font-display text-[clamp(40px,6vw,78px)] leading-[1.05] font-semibold tracking-tight text-balance text-ink-900", locale === 'zh' ? 'font-han' : 'font-display')}>
                {t.titleLine1}
        
                {t.titleLine2}
              </h1>
            </Reveal>
            <Reveal delay={0.16}>
              <p className={cn("mx-auto mt-6 max-w-[620px] font-body text-xl leading-relaxed text-ink-500", locale === 'zh' ? 'font-zh-body' : 'font-body')}>
                {t.body}
              </p>
            </Reveal>
          </div>
        </header>

        <ProductGrid />
        <FeaturedFormula />
      </main>
      <SiteFooter />
    </>
  )
}
