'use client'

import Image from 'next/image'
import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { useLocale } from '@/components/locale-provider'
import { categoryKeys, productAssets } from '@/lib/products'
import type { ProductCategoryKey } from '@/lib/products'
import { cn } from '@/lib/utils'

export function ProductGrid() {
  const { locale, dict } = useLocale()
  const t = dict.apothecary
  const [active, setActive] = useState<ProductCategoryKey | 'all'>('all')

  const products = productAssets.map((asset, index) => ({
    ...asset,
    ...t.products[index],
  }))

  const visible =
    active === 'all'
      ? products
      : products.filter((product) => product.category === active)

  const categoryLabels: Record<ProductCategoryKey | 'all', string> = {
    all: t.categories.all,
    teas: t.categories.teas,
    pastes: t.categories.pastes,
    tinctures: t.categories.tinctures,
    seasonal: t.categories.seasonal,
  }

  return (
    <>
      <div className="mx-auto flex max-w-[1280px] flex-wrap justify-center gap-2.5 px-6 pb-12 md:px-12">
        {categoryKeys.map((category) => {
          const on = active === category
          return (
            <button
              key={category}
              type="button"
              onClick={() => setActive(category)}
              className={cn(
                'rounded-full border-[1.5px] px-6 py-2.5 text-sm font-semibold tracking-wide transition-colors',
                on
                  ? 'border-cinnabar-500 bg-cinnabar-500 text-paper-000'
                  : 'border-ink-300 bg-transparent text-ink-800 hover:bg-cinnabar-100 hover:border-cinnabar-100',
              )}
            >
              {categoryLabels[category]}
            </button>
          )
        })}
      </div>

      <section className="px-6 pb-28 md:px-12">
        <div className="mx-auto grid max-w-[1280px] grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
          <AnimatePresence mode="popLayout">
            {visible.map((product) => (
              <motion.article
                key={product.display}
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                className="group cursor-pointer"
              >
                <div className="relative aspect-[4/5] overflow-hidden rounded-[14px]">
                  <Image
                    src={product.src}
                    alt={product.alt}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    className="object-cover transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-105"
                  />
                </div>
                <div className="mt-4 flex items-baseline justify-between">
                  <div>
                    <div
                      className={cn(
                        'text-[22px] text-ink-900',
                        locale === 'zh' ? 'font-han' : 'font-display',
                      )}
                    >
                      {product.display}
                    </div>
                    <div className="mt-0.5 text-[13px] text-ink-400">
                      {product.name} · {product.nature}
                    </div>
                  </div>
                  <div className="font-display text-lg text-cinnabar-600">
                    {product.price}
                  </div>
                </div>
              </motion.article>
            ))}
          </AnimatePresence>
        </div>
      </section>
    </>
  )
}
