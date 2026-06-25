import type { Metadata } from 'next'
import Image from 'next/image'
import { SiteNav } from '@/components/site-nav'
import { SiteFooter } from '@/components/site-footer'
import { ParallaxImage } from '@/components/motion/parallax-image'
import { Reveal } from '@/components/motion/reveal'
import { BookingForm } from '@/components/consultation/booking-form'
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
    title: dict.meta.consultationTitle,
    description: dict.meta.consultationDescription,
  }
}

export default async function ConsultationPage({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale: raw } = await params
  const locale = raw as Locale
  if (!isLocale(raw)) notFound()
  const dict = getDictionary(raw)
  const t = dict.consultation

  return (
    <>
      <SiteNav onDark />
      <main>
        <header className="relative h-[78vh] min-h-[580px] overflow-hidden">
          <ParallaxImage
            src="/assets/img-treatment.png"
            alt="Treatment room"
            priority
            className="absolute inset-0"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-ink-900/35 via-ink-900/15 to-ink-900/55" />
          <div className="relative mx-auto flex h-full max-w-[1280px] flex-col justify-center px-6 text-paper-100 md:px-12">
            <p className="text-xs font-semibold tracking-[0.24em] text-cinnabar-300 uppercase">
              {t.hero.eyebrow}
            </p>
            <h1 className={cn("mt-5 font-display text-[clamp(40px,7vw,92px)] leading-[1.05] font-semibold tracking-tight text-balance text-paper-000", locale === 'zh' ? 'font-han' : 'font-display')}>
              {t.hero.titleLine1}
              <br />
              {t.hero.titleLine2}
            </h1>
            <p className={cn("mt-5 max-w-[520px] font-body text-xl leading-relaxed text-paper-100/90", locale === 'zh' ? 'font-zh-body' : 'font-body')}>
              {t.hero.body}
            </p>
          </div>
        </header>

        <PatternSection className="px-6 py-28 md:px-12 md:py-36">
          <div className="mx-auto max-w-[860px] text-center">
            <Reveal>
              <p className="text-xs font-semibold tracking-[0.24em] text-cinnabar-600 uppercase">
                {t.method.eyebrow}
              </p>
            </Reveal>
            <Reveal delay={0.08}>
              <h2 className={cn("mt-4 font-display text-[clamp(30px,4.4vw,52px)] leading-[1.05] font-semibold tracking-tight text-balance text-ink-900", locale === 'zh' ? 'font-han' : 'font-display')}>
                {t.method.titleLine1}
                <br />
                {t.method.titleLine2}
              </h2>
            </Reveal>
          </div>

          <div className="mx-auto mt-16 grid max-w-[1280px] grid-cols-1 gap-12 md:grid-cols-3">
            {t.method.steps.map((step, i) => (
              <Reveal key={step.no} delay={i * 0.08}>
                <div className="font-display text-[15px] font-semibold text-cinnabar-600">
                  {step.no}
                </div>
                <hr className="mt-4 mb-6 border-ink-300" />
                <div className={cn("text-[30px] text-ink-900", locale === 'zh' ? 'font-han' : 'font-display')}>
                  {step.glyph}
                </div>
                <div className={cn("mt-1.5 mb-3.5 font-display text-xl font-semibold text-ink-900", locale === 'zh' ? 'font-han' : 'font-display')}>
                  {step.title}
                </div>
                <p className={cn("text-[20px] leading-relaxed text-ink-500", locale === 'zh' ? 'font-zh-body' : 'font-body')}>
                  {step.body}
                </p>
              </Reveal>
            ))}
          </div>
        </PatternSection>

        <section className="bg-paper-200 px-6 py-24 md:px-12">
          <div className="mx-auto grid max-w-[1280px] grid-cols-1 items-center gap-12 md:grid-cols-2 md:gap-14">
            <Reveal className="flex justify-center">
              <Image
                src="/images/doctor_li.png"
                alt="Crane illustration"
                width={230}
                height={300}
                className="w-[230px] max-w-full"
              />
            </Reveal>
            <Reveal delay={0.08}>
              <p className={cn("text-lg font-semibold tracking-[0.24em] text-cinnabar-600 uppercase", locale === 'zh' ? 'font-zh-ui' : 'font-body')}>
                {t.physician.eyebrow}
              </p>
              <h2 className={cn("mt-3.5 font-display text-[clamp(28px,3.6vw,42px)] font-semibold tracking-tight text-ink-900", locale === 'zh' ? 'font-han' : 'font-display')}>
                {t.physician.name}
              </h2>
              <p className={cn("mt-4 font-body text-[clamp(20px,2vw,24px)] leading-relaxed text-ink-500", locale === 'zh' ? 'font-zh-body' : 'font-body')}>
                {t.physician.bio}
              </p>
              <div className="mt-8 flex gap-10">
                {t.physician.stats.map((stat) => (
                  <div key={stat.label}>
                    <div className="font-display text-[34px] text-cinnabar-600">
                      {stat.value}
                    </div>
                    <div className="mt-1 text-[13px] text-ink-500">
                      {stat.label}
                    </div>
                  </div>
                ))}
              </div>
            </Reveal>
          </div>
        </section>

        <PatternSection id="book" className="px-6 py-28 md:px-12 md:py-36">
          <div className="mx-auto max-w-[860px]">
            <div className="mb-14 text-center">
              <Reveal>
                <p className="text-xs font-semibold tracking-[0.24em] text-cinnabar-600 uppercase">
                  {t.booking.eyebrow}
                </p>
              </Reveal>
              <Reveal delay={0.08}>
                <h2 className={cn("mt-4 font-display text-[clamp(30px,4.4vw,52px)] font-semibold tracking-tight text-ink-900", locale === 'zh' ? 'font-han' : 'font-display')}>
                  {t.booking.title}
                </h2>
              </Reveal>
            </div>
            <Reveal delay={0.08}>
              <BookingForm />
            </Reveal>
          </div>
        </PatternSection>
      </main>
      <SiteFooter />
    </>
  )
}
