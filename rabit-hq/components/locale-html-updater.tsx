'use client'

import { useEffect } from 'react'

type LocaleHtmlUpdaterProps = {
  locale: string
  direction: 'ltr' | 'rtl'
}

export function LocaleHtmlUpdater({ locale, direction }: LocaleHtmlUpdaterProps) {
  useEffect(() => {
    const html = document.documentElement
    html.lang = locale
    html.dir = direction
  }, [locale, direction])

  return null
}
