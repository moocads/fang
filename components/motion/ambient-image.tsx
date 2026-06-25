'use client'

import Image from 'next/image'
import { motion, useReducedMotion } from 'framer-motion'
import { cn } from '@/lib/utils'

type AmbientImageProps = {
  src: string
  alt: string
  className?: string
  sizes?: string
  priority?: boolean
}

/** Full-bleed image with a slow, looping scale + drift — feels alive, not mechanical. */
export function AmbientImage({
  src,
  alt,
  className,
  sizes = '100vw',
  priority = false,
}: AmbientImageProps) {
  const reduce = useReducedMotion()

  return (
    <div className={cn('relative overflow-hidden', className)}>
      <motion.div
        className="absolute -inset-[10%] will-change-transform"
        initial={false}
        animate={
          reduce
            ? undefined
            : {
                scale: [1, 1.045, 1.02, 1.055, 1.015, 1],
                x: ['0%', '-1.6%', '0.7%', '-0.9%', '1.1%', '0%'],
                y: ['0%', '0.8%', '-1.2%', '0.5%', '-0.7%', '0%'],
              }
        }
        transition={
          reduce
            ? undefined
            : {
                duration: 32,
                repeat: Infinity,
                ease: 'easeInOut',
              }
        }
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
