'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { useLocale } from '@/components/locale-provider'
import { chamferBtn, chamferBtnFull, chamferBtnPrimary } from '@/lib/chamfer-button'
import { cn } from '@/lib/utils'
import { Locale } from '@/lib/i18n/config'
type Chip = { label: string; value: string; selected: boolean; onSelect: () => void }

function ChipRow({
  legend,
  options,
}: {
  legend: string
  options: Chip[]
}) {
  return (
    <fieldset className="mt-6">
      <legend className="text-xs font-semibold tracking-[0.08em] text-ink-500 uppercase">
        {legend}
      </legend>
      <div className="mt-3 flex flex-wrap gap-2.5">
        {options.map((option) => (
          <button
            key={option.value}
            type="button"
            onClick={option.onSelect}
            aria-pressed={option.selected}
            className={cn(
              'rounded-full border-[1.5px] px-4.5 py-2.5 text-sm font-medium transition-colors',
              option.selected
                ? 'border-cinnabar-500 bg-cinnabar-500 text-paper-000'
                : 'border-ink-300 bg-transparent text-ink-800 hover:border-cinnabar-300',
            )}
          >
            {option.label}
          </button>
        ))}
      </div>
    </fieldset>
  )
}

export function BookingForm() {
  const { locale: raw, dict } = useLocale()
  const t = dict.consultation.form
  const locale = raw as Locale
  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')
  const [day, setDay] = useState(t.days[2])
  const [slot, setSlot] = useState(t.slots[1])
  const [mode, setMode] = useState(t.modes[0])
  const [confirmed, setConfirmed] = useState(false)

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setConfirmed(true)
  }

  const confirmedBody = t.confirmedBody
    .replace('{day}', day)
    .replace('{slot}', slot)
    .replace('{mode}', mode)
    .replace('{name}', name || t.you)

  return (
    <div className="rounded-[14px] border-[1.5px] border-ink-900 bg-paper-000 p-8 shadow-[0_6px_18px_rgba(33,31,27,0.09)] md:p-12">
      {confirmed ? (
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="py-4 text-center"
        >
          <div className={cn("inline-flex size-[74px] items-center justify-center rounded-2xl bg-cinnabar-500 font-display text-4xl text-paper-000", locale === 'zh' ? 'font-han' : 'font-display')}>
            {t.confirmedGlyph}
          </div>
          <h3 className={cn("mt-6 font-display text-3xl font-semibold text-ink-900", locale === 'zh' ? 'font-han' : 'font-display')}>
            {t.confirmedTitle}
          </h3>
          <p className={cn("mt-2 font-body text-base leading-relaxed text-ink-500", locale === 'zh' ? 'font-zh-body' : 'font-body')}>
            {confirmedBody}
          </p>
        </motion.div>
      ) : (
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
            <label className="flex flex-col gap-2">
              <span className="text-xs font-semibold tracking-[0.08em] text-ink-500 uppercase">
                {t.name}
              </span>
              <input
                value={name}
                onChange={(event) => setName(event.target.value)}
                placeholder={t.namePlaceholder}
                className="rounded-[8px] border-[1.5px] border-ink-300 bg-white px-3.5 py-3 text-[15px] text-ink-900 outline-none focus:border-cinnabar-400"
              />
            </label>
            <label className="flex flex-col gap-2">
              <span className="text-xs font-semibold tracking-[0.08em] text-ink-500 uppercase">
                {t.phone}
              </span>
              <input
                value={phone}
                onChange={(event) => setPhone(event.target.value)}
                placeholder={t.phonePlaceholder}
                className="rounded-[8px] border-[1.5px] border-ink-300 bg-white px-3.5 py-3 text-[15px] text-ink-900 outline-none focus:border-cinnabar-400"
              />
            </label>
          </div>

          <ChipRow
            legend={t.day}
            options={t.days.map((value) => ({
              label: value,
              value,
              selected: day === value,
              onSelect: () => setDay(value),
            }))}
          />
          <ChipRow
            legend={t.time}
            options={t.slots.map((value) => ({
              label: value,
              value,
              selected: slot === value,
              onSelect: () => setSlot(value),
            }))}
          />
          <ChipRow
            legend={t.format}
            options={t.modes.map((value) => ({
              label: value,
              value,
              selected: mode === value,
              onSelect: () => setMode(value),
            }))}
          />

          <button
            type="submit"
            className={cn(chamferBtn, chamferBtnPrimary, chamferBtnFull, 'mt-9')}
          >
            {t.submit}
          </button>
        </form>
      )}
    </div>
  )
}
