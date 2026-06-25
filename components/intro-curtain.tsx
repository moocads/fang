'use client'

import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { useEffect, useState } from 'react'

export function IntroCurtain() {
  const reduce = useReducedMotion()
  const [show, setShow] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    let seen = false
    try {
      seen = sessionStorage.getItem('fang-intro') === '1'
    } catch {
      seen = false
    }
    if (seen || reduce) return

    setShow(true)
    document.body.style.overflow = 'hidden'
    const openTimer = window.setTimeout(() => setOpen(true), 850)
    const doneTimer = window.setTimeout(() => {
      setShow(false)
      document.body.style.overflow = ''
      try {
        sessionStorage.setItem('fang-intro', '1')
      } catch {
        /* ignore */
      }
    }, 2100)

    return () => {
      window.clearTimeout(openTimer)
      window.clearTimeout(doneTimer)
      document.body.style.overflow = ''
    }
  }, [reduce])

  const transition = { duration: 1.15, ease: [0.76, 0, 0.24, 1] as const }

  return (
    <AnimatePresence>
      {show && (
        <div
          aria-hidden="true"
          className="pointer-events-none fixed inset-0 z-[100]"
        >
          <motion.div
            className="absolute inset-x-0 top-0 flex h-1/2 items-end justify-center overflow-hidden bg-paper-100"
            initial={{ y: 0 }}
            animate={{ y: open ? '-100%' : 0 }}
            exit={{ y: '-100%' }}
            transition={transition}
          >
            <div className="h-[110px] w-[220px] flex-none bg-[url('/assets/logo-mark-black.png')] bg-[length:220px_220px] bg-[position:center_top] bg-no-repeat" />
          </motion.div>
          <motion.div
            className="absolute inset-x-0 bottom-0 flex h-1/2 items-start justify-center overflow-hidden bg-paper-100"
            initial={{ y: 0 }}
            animate={{ y: open ? '100%' : 0 }}
            exit={{ y: '100%' }}
            transition={transition}
          >
            <div className="h-[110px] w-[220px] flex-none bg-[url('/assets/logo-mark-black.png')] bg-[length:220px_220px] bg-[position:center_bottom] bg-no-repeat" />
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  )
}
