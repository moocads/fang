'use client'

import Image from 'next/image'
import { useRef } from 'react'
import {
  motion,
  useScroll,
  useTransform,
  useReducedMotion,
} from 'framer-motion'
import { cn } from '@/lib/utils'

type ParallaxImageProps = {
  src: string
  alt: string
  className?: string
  sizes?: string
  priority?: boolean
}

/** Image that drifts vertically as it passes through the viewport.
 *  The inner layer is over-sized (-inset-y-16) so no gaps appear at the
 *  travel extremes. */
export function ParallaxImage({
  src,
  alt,
  className,
  sizes = '100vw',
  priority = false,
}: ParallaxImageProps) {
  const ref = useRef<HTMLDivElement>(null)
  const reduce = useReducedMotion()
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  })
  const y = useTransform(scrollYProgress, [0, 1], [-56, 56])

  return (
    <div ref={ref} className={cn('relative overflow-hidden', className)}>
      <motion.div
        className="absolute -inset-y-16 inset-x-0 will-change-transform"
        style={reduce ? undefined : { y }}
      >
        <Image
          src={src}
          alt={alt}
          fill
          sizes={sizes}
          priority={priority}
          className="object-cover"
        />
      </motion.div>
    </div>
  )
}
