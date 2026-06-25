/** Shared button base — padding / typography */
export const btnBase =
  'inline-flex items-center justify-center px-6 py-2.5 text-sm font-semibold tracking-wide transition-[background-color,box-shadow,color] active:translate-y-px'

/** Cut-corner fill buttons */
export const chamferBtn = `btn-chamfer ${btnBase} transition-[background-color,box-shadow,color]`

export const chamferBtnPrimary = 'btn-chamfer-primary text-paper-000'

export const chamferBtnLight = 'btn-chamfer-light text-ink-900'

/** Bracket border (open corners) — for ghost / outline CTAs */
export const bracketBtnGhost = `btn-bracket btn-bracket-ghost ${btnBase}`

export const chamferBtnFull = 'w-full py-3.5'
