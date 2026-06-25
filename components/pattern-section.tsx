'use client'

import type { ComponentPropsWithoutRef, CSSProperties, ReactNode } from 'react'
import { PatternBgOverlay } from '@/components/pattern-bg-overlay'
import { cn } from '@/lib/utils'

export type PatternOptions = {
  color?: string
  opacity?: number
  size?: number
}

type PatternSectionProps = ComponentPropsWithoutRef<'section'> & {
  children: ReactNode
  /** Pattern defaults; inline style — not overridden by `.pattern-bg` in CSS. */
  pattern?: PatternOptions
}

const defaultPattern: Required<PatternOptions> = {
  color: 'var(--color-jade-500)',
  opacity: 0.16,
  size: 50,
}

function patternStyle(
  pattern: PatternOptions | undefined,
  style: CSSProperties | undefined,
): CSSProperties {
  const p = { ...defaultPattern, ...pattern }
  return {
    ['--pattern-color' as string]: p.color,
    ['--pattern-opacity' as string]: String(p.opacity),
    ['--pattern-size' as string]: String(p.size),
    ...style,
  }
}

export function PatternSection({
  className,
  children,
  pattern,
  style,
  ...props
}: PatternSectionProps) {
  return (
    <section
      className={cn('pattern-bg', className)}
      style={patternStyle(pattern, style)}
      {...props}
    >
      <PatternBgOverlay />
      {children}
    </section>
  )
}
