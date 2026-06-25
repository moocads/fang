'use client'

import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { useEffect, useState } from 'react'
import { LanguageSwitcher } from '@/components/language-switcher'
import { useLocale } from '@/components/locale-provider'
import { localizedPath } from '@/lib/i18n/paths'
import { chamferBtn, chamferBtnPrimary } from '@/lib/chamfer-button'
import { cn } from '@/lib/utils'

const slideEase = [0.32, 0.08, 0.24, 1] as const
const fadeEase = [0.16, 1, 0.3, 1] as const

function CloseIcon() {
  return (
    <span className="relative block size-5" aria-hidden="true">
      <span className="absolute left-0 top-[9px] block h-px w-5 rotate-45 bg-current" />
      <span className="absolute left-0 top-[9px] block h-px w-5 -rotate-45 bg-current" />
    </span>
  )
}

function MenuIcon({ open }: { open: boolean }) {
  return (
    <span className="relative block size-5" aria-hidden="true">
      <span
        className={cn(
          'absolute left-0 block h-px w-5 bg-current transition-all duration-300',
          open ? 'top-[9px] rotate-45' : 'top-1',
        )}
      />
      <span
        className={cn(
          'absolute left-0 top-[11px] block h-px w-5 bg-current transition-all duration-300',
          open ? 'opacity-0' : 'opacity-100',
        )}
      />
      <span
        className={cn(
          'absolute left-0 block h-px w-5 bg-current transition-all duration-300',
          open ? 'top-[19px] -rotate-45' : 'top-[19px]',
        )}
      />
    </span>
  )
}

export function SiteNav({ onDark = false }: { onDark?: boolean }) {
  const pathname = usePathname()
  const { locale, dict } = useLocale()
  const reduce = useReducedMotion()
  const [solid, setSolid] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  const links = [
    { href: '/', label: dict.nav.home },
    { href: '/apothecary', label: dict.nav.apothecary },
    { href: '/consultation', label: dict.nav.consultation },
    { href: '/about', label: dict.nav.about },
  ]

  const isDesktopOnlyLink = (index: number) => index === 0 || index === links.length - 1

  useEffect(() => {
    const onScroll = () => setSolid(window.scrollY > 40)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    setMenuOpen(false)
  }, [pathname])

  useEffect(() => {
    if (!menuOpen) return
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setMenuOpen(false)
    }
    document.body.style.overflow = 'hidden'
    window.addEventListener('keydown', onKeyDown)
    return () => {
      document.body.style.overflow = ''
      window.removeEventListener('keydown', onKeyDown)
    }
  }, [menuOpen])

  const dark = onDark && !solid && !menuOpen
  const panelSlide = reduce
    ? { duration: 0 }
    : { duration: 0.45, ease: slideEase }
  const itemFade = (index: number) =>
    reduce
      ? { duration: 0 }
      : { delay: 0.1 + index * 0.07, duration: 0.4, ease: fadeEase }

  return (
    <>
      <nav
        className={cn(
          'fixed inset-x-0 top-0 z-50 flex items-center justify-between transition-all duration-300',
          solid || menuOpen
            ? 'bg-paper-100/85 px-6 py-3.5 shadow-[0_1px_0_var(--color-ink-200)] backdrop-blur-md md:px-12'
            : 'px-6 py-5 md:px-12',
        )}
      >
        <Link
          href={localizedPath('/', locale)}
          aria-label={dict.nav.homeAria}
          className="flex items-center"
        >
          <Image
            src="/assets/logo-mark-black.png"
            alt="FĀNG"
            width={220}
            height={30}
            priority
            className={cn(
              'h-[100px] w-auto transition md:h-[100px]',
              dark && !menuOpen && 'brightness-0 invert',
            )}
          />
        </Link>

        <div className="hidden items-center gap-4 md:flex md:gap-8">
          {links.map((link, index) => {
            const href = localizedPath(link.href, locale)
            const active = pathname === href
            return (
              <Link
                key={link.href}
                href={href}
                className={cn(
                  'group relative py-1 text-lg tracking-wide transition-colors',
                  isDesktopOnlyLink(index) && 'hidden md:inline-block',
                  dark ? 'text-paper-100' : 'text-ink-800',
                )}
              >
                {link.label}
                <span
                  className={cn(
                    'absolute inset-x-0 bottom-0 h-px origin-left bg-cinnabar-500 transition-transform duration-300',
                    active ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100',
                  )}
                />
              </Link>
            )
          })}
          <Link
            href={localizedPath('/consultation', locale)}
            className={cn(chamferBtn, chamferBtnPrimary)}
          >
            {dict.nav.book}
          </Link>
          <LanguageSwitcher
            locale={locale}
            dark={dark}
            labels={{ en: dict.nav.langEn, zh: dict.nav.langZh }}
          />
        </div>

        <button
          type="button"
          className={cn(
            'inline-flex size-11 items-center justify-center md:hidden',
            menuOpen || !dark ? 'text-ink-800' : 'text-paper-100',
          )}
          aria-expanded={menuOpen}
          aria-controls="mobile-nav"
          aria-label={menuOpen ? 'Close menu' : 'Open menu'}
          onClick={() => setMenuOpen((open) => !open)}
        >
          <MenuIcon open={menuOpen} />
        </button>
      </nav>

      <AnimatePresence>
        {menuOpen && (
          <>
            <motion.button
              type="button"
              aria-label="Close menu"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={panelSlide}
              className="fixed inset-0 z-40 bg-ink-900/40 md:hidden"
              onClick={() => setMenuOpen(false)}
            />

            <motion.aside
              id="mobile-nav"
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={panelSlide}
              className="fixed inset-y-0 right-0 z-50 flex w-[min(100%,320px)] flex-col bg-paper-100 px-8 pb-10 pt-8 shadow-lg md:hidden"
            >
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={itemFade(0)}
                className="mb-10 flex justify-end"
              >
                <button
                  type="button"
                  aria-label="Close menu"
                  className="inline-flex size-11 items-center justify-center text-ink-800"
                  onClick={() => setMenuOpen(false)}
                >
                  <CloseIcon />
                </button>
              </motion.div>

              <nav className="flex flex-col gap-1">
                {links.map((link, index) => {
                  const href = localizedPath(link.href, locale)
                  const active = pathname === href
                  return (
                    <motion.div
                      key={link.href}
                      initial={{ opacity: 0, y: 14 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 8 }}
                      transition={itemFade(index + 1)}
                    >
                      <Link
                        href={href}
                        onClick={() => setMenuOpen(false)}
                        className={cn(
                          'block py-3 text-2xl tracking-wide transition-colors',
                          active ? 'text-cinnabar-600' : 'text-ink-800 hover:text-cinnabar-600',
                        )}
                      >
                        {link.label}
                      </Link>
                    </motion.div>
                  )
                })}
              </nav>

              <motion.div
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 8 }}
                transition={itemFade(links.length + 1)}
                className="mt-8"
              >
                <Link
                  href={localizedPath('/consultation', locale)}
                  onClick={() => setMenuOpen(false)}
                  className={cn(chamferBtn, chamferBtnPrimary, 'w-full justify-center')}
                >
                  {dict.nav.book}
                </Link>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 8 }}
                transition={itemFade(links.length + 2)}
                className="mt-6"
              >
                <LanguageSwitcher
                  locale={locale}
                  labels={{ en: dict.nav.langEn, zh: dict.nav.langZh }}
                />
              </motion.div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  )
}
