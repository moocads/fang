'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useLocale } from '@/components/locale-provider'
import { localizedPath } from '@/lib/i18n/paths'

export function SiteFooter() {
  const { locale, dict } = useLocale()
  const t = dict.footer

  const explore = [
    { href: '/apothecary', label: dict.nav.apothecary },
    { href: '/consultation', label: dict.nav.consultation },
    { href: '/about', label: dict.nav.about },
  ]

  return (
    <footer className="bg-ink-900 px-6 pt-28 pb-12 text-paper-200 md:px-12">
      <div className="mx-auto max-w-[1280px]">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-[1.6fr_1fr_1fr]">
          <div>
            <Image
              src="/assets/logo-en-white.png"
              alt="FĀNG"
              width={136}
              height={34}
              className="h-[34px] w-auto"
            />
            <p className="mt-6 max-w-[300px] text-[14.5px] leading-relaxed text-ink-300">
              {t.tagline}
            </p>
          </div>

          <div>
            <div className="mb-5 text-xs tracking-[0.18em] text-ink-400 uppercase">
              {t.explore}
            </div>
            <div className="flex flex-col gap-3 text-[14.5px]">
              {explore.map((item) => (
                <Link
                  key={item.href}
                  href={localizedPath(item.href, locale)}
                  className="text-paper-200/80 transition hover:text-paper-000"
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </div>

          <div>
            <div className="mb-5 text-xs tracking-[0.18em] text-ink-400 uppercase">
              {t.visit}
            </div>
            <div className="flex flex-col gap-3 text-[14.5px] text-ink-300">
              <span>{t.address}</span>
              <span>{t.hours}</span>
              <Link
                href={localizedPath('/consultation', locale)}
                className="text-paper-200/80 transition hover:text-paper-000"
              >
                hello@fang.care
              </Link>
            </div>
          </div>
        </div>

        <div className="mt-20 flex items-center justify-between border-t border-paper-100/15 pt-7 text-[12.5px] text-ink-300">
          <span>{t.copyright}</span>
          <span>{t.motto}</span>
        </div>
      </div>
    </footer>
  )
}
