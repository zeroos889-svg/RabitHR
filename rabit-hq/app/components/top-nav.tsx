'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React from 'react'
import { useLocale, useTranslations } from 'next-intl'

const SUPPORTED_LOCALES = ['ar', 'en'] as const

export function TopNav() {
  const pathname = usePathname()
  const locale = useLocale()
  const tNav = useTranslations('navigation')
  const tCommon = useTranslations('common')

  const links = [
    {
      href: `/${locale}`,
      label: tNav('home'),
      isActive: (path?: string | null) => path === `/${locale}`,
    },
    {
      href: `/${locale}/dashboard`,
      label: tNav('dashboard'),
      isActive: (path?: string | null) => path?.startsWith(`/${locale}/dashboard`) ?? false,
    },
    {
      href: `/${locale}/investor`,
      label: tNav('investor'),
      isActive: (path?: string | null) => path?.startsWith(`/${locale}/investor`) ?? false,
    },
  ]

  const targetLocale = locale === 'ar' ? 'en' : 'ar'
  const localeLessPath = pathname?.replace(/^\/(ar|en)/, '') || ''
  const localeSwitchHref = `/${targetLocale}${localeLessPath || ''}` || `/${targetLocale}`

  return (
    <nav className="top-nav" aria-label={tNav('primary')}>
      <div className="top-nav__brand">
        <span className="top-nav__logo-dot" />
        {tCommon('appName')}
      </div>

      <div className="top-nav__links">
        {links.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className={`top-nav__link${item.isActive(pathname) ? ' is-active' : ''}`}
          >
            {item.label}
          </Link>
        ))}
        {SUPPORTED_LOCALES.map((supportedLocale) => {
          if (supportedLocale === locale) return null
          return (
            <Link key={supportedLocale} href={localeSwitchHref} className="top-nav__link">
              {tNav(`switch.${supportedLocale}`)}
            </Link>
          )
        })}
      </div>
    </nav>
  )
}
