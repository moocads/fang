import { Analytics } from '@vercel/analytics/next'
import type { Metadata, Viewport } from 'next'
import localFont from 'next/font/local'
import { notFound } from 'next/navigation'
import { LocaleProvider } from '@/components/locale-provider'
import { getDictionary } from '@/lib/i18n'
import { isLocale, locales, type Locale } from '@/lib/i18n/config'
import '../globals.css'

const proza = localFont({
  variable: '--font-proza',
  display: 'swap',
  src: [
    { path: '../../fonts/ProzaDisplay-Regular.ttf', weight: '400', style: 'normal' },
    { path: '../../fonts/ProzaDisplay-SemiBold.ttf', weight: '600', style: 'normal' },
  ],
})

const prozaRegular = localFont({
  variable: '--font-proza-regular',
  display: 'swap',
  src: [
    { path: '../../fonts/ProzaDisplay-Regular.ttf', weight: '400', style: 'normal' },
  ],
})

const shanHaiHeading = localFont({
  variable: '--font-zh-heading-serif',
  display: 'swap',
  src: [
    {
      path: '../../fonts/ShanHaiJiGuJiangNanSongKeW-2.woff2',
      weight: '400',
      style: 'normal',
    },
  ],
})

const hyMingYue55 = localFont({
  variable: '--font-zh-ui-serif',
  display: 'swap',
  src: [{ path: '../../fonts/HYMingYue-55W.woff2', weight: '400', style: 'normal' }],
})

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>
}): Promise<Metadata> {
  const { locale: raw } = await params
  if (!isLocale(raw)) return {}
  const dict = getDictionary(raw)
  return {
    title: dict.meta.siteTitle,
    description: dict.meta.siteDescription,
    generator: 'v0.app',
  }
}

export const viewport: Viewport = {
  colorScheme: 'light',
  themeColor: '#F5EEE1',
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode
  params: Promise<{ locale: string }>
}) {
  const { locale: raw } = await params
  if (!isLocale(raw)) notFound()

  const locale = raw as Locale
  const dict = getDictionary(locale)

  return (
    <html
      lang={locale}
      className={`${proza.variable} ${prozaRegular.variable} ${shanHaiHeading.variable} ${hyMingYue55.variable}`}
    >
      <body className="bg-paper-100 font-sans antialiased">
        <LocaleProvider locale={locale} dict={dict}>
          {children}
        </LocaleProvider>
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
