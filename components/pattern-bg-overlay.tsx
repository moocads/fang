'use client'

import { useId, useLayoutEffect, useRef, useState } from 'react'
import { cn } from '@/lib/utils'

const TILE_W = 215

function PatternTile() {
  return (
    <>
      <rect
        x="31.49"
        y="31.72"
        width="152.03"
        height="152.03"
        fill="none"
        stroke="currentColor"
        strokeWidth="0.99"
        transform="rotate(-45 107.5 107.73)"
      />
      <rect
        x="61.68"
        y="61.92"
        width="91.63"
        height="91.63"
        fill="none"
        stroke="currentColor"
        strokeWidth="0.99"
        transform="rotate(-45 107.5 107.73)"
      />
      <polyline
        fill="none"
        stroke="currentColor"
        strokeWidth="0.99"
        points="0.47 80.92 27.28 107.74 0.47 134.55"
      />
      <polyline
        fill="none"
        stroke="currentColor"
        strokeWidth="0.99"
        points="215 80.92 188.18 107.74 215 134.55"
      />
      <polyline
        fill="none"
        stroke="currentColor"
        strokeWidth="0.99"
        points="134.55 0.47 107.73 27.29 80.92 0.47"
      />
      <polyline
        fill="none"
        stroke="currentColor"
        strokeWidth="0.99"
        points="134.55 215 107.73 188.19 80.92 215"
      />
    </>
  )
}

type PatternVars = {
  scale: number
  color: string
  opacity: number
}

function PatternBgOverlay({ className }: { className?: string }) {
  const patternId = useId().replace(/:/g, '')
  const svgRef = useRef<SVGSVGElement>(null)
  const [vars, setVars] = useState<PatternVars>({
    scale: 50 / TILE_W,
    color: '#5e7c6b',
    opacity: 0.16,
  })

  useLayoutEffect(() => {
    const host = svgRef.current?.parentElement
    if (!host) return

    const sync = () => {
      const styles = getComputedStyle(host)
      const size = parseFloat(styles.getPropertyValue('--pattern-size') || '50')
      const opacity = parseFloat(styles.getPropertyValue('--pattern-opacity') || '0.16')

      const prevColor = host.style.color
      host.style.color = 'var(--pattern-color)'
      const color = getComputedStyle(host).color
      if (prevColor) host.style.color = prevColor
      else host.style.removeProperty('color')

      setVars({
        scale: size / TILE_W,
        color: color || '#5e7c6b',
        opacity: Number.isFinite(opacity) ? opacity : 0.16,
      })
    }

    sync()
    const observer = new ResizeObserver(sync)
    observer.observe(host)
    return () => observer.disconnect()
  }, [])

  return (
    <svg
      ref={svgRef}
      aria-hidden="true"
      className={cn('pointer-events-none absolute inset-0 z-0 h-full w-full', className)}
      style={{ color: vars.color, opacity: vars.opacity }}
      preserveAspectRatio="none"
    >
      <defs>
        <pattern
          id={patternId}
          width={TILE_W}
          height={216}
          patternUnits="userSpaceOnUse"
          patternTransform={`scale(${vars.scale})`}
        >
          <PatternTile />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill={`url(#${patternId})`} />
    </svg>
  )
}

export { PatternBgOverlay }
