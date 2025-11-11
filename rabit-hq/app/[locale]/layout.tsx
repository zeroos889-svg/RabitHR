import React from 'react'
import { notFound } from 'next/navigation'
import { NextIntlClientProvider } from 'next-intl'
import { getMessages, getTranslations } from 'next-intl/server'
import { Cairo, Inter } from 'next/font/google'
import { locales } from '@/i18n'
import { AuthProvider } from '@/app/providers'
import { TopNav } from '@/app/components/top-nav'
import { LocaleHtmlUpdater } from '@/components/locale-html-updater'

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' })
const cairo = Cairo({ subsets: ['arabic'], variable: '--font-cairo' })

type LocaleLayoutProps = {
  children: React.ReactNode
  params: {
    locale: string
  }
}

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }))
}

export default async function LocaleLayout({ children, params: { locale } }: LocaleLayoutProps) {
  if (!locales.includes(locale)) notFound()

  const messages = await getMessages()
  const tLayout = await getTranslations({ locale, namespace: 'layout' })
  const direction = locale === 'ar' ? 'rtl' : 'ltr'
  const year = new Date().getFullYear()

  const fontClass = locale === 'ar' ? cairo.className : inter.className

  return (
    <NextIntlClientProvider locale={locale} messages={messages} timeZone="Asia/Riyadh">
      <AuthProvider>
        <LocaleHtmlUpdater locale={locale} direction={direction} />
        <div className={`${fontClass} layout`} dir={direction} data-locale={locale}>
          <header className="layout__header">
            <TopNav />
          </header>
          <main className="layout__main" role="main">
            {children}
          </main>
          <footer className="layout__footer">
            <span>{tLayout('footer.copyright', { year })}</span>
            <span>{tLayout('footer.tagline')}</span>
          </footer>
        </div>
      </AuthProvider>
    </NextIntlClientProvider>
  )
}
