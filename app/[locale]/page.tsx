import { IntroCurtain } from '@/components/intro-curtain'
import { SiteNav } from '@/components/site-nav'
import { SiteFooter } from '@/components/site-footer'
import { HeroSection } from '@/components/home/hero-section'
import { PhilosophySection } from '@/components/home/philosophy-section'
import { PillarsSection } from '@/components/home/pillars-section'
import { SpaceSection } from '@/components/home/space-section'
import { ApothecaryTeaser } from '@/components/home/apothecary-teaser'
import { TestimonialsSection } from '@/components/home/testimonials-section'
import { CtaBand } from '@/components/home/cta-band'

export default function HomePage() {
  return (
    <>
      <IntroCurtain />
      <SiteNav onDark />
      <main>
        <HeroSection />
        <PhilosophySection />
        <PillarsSection />
        <SpaceSection />
        <ApothecaryTeaser />
        <TestimonialsSection />
        <CtaBand />
      </main>
      <SiteFooter />
    </>
  )
}
