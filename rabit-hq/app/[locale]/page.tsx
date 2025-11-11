import Link from 'next/link'
import { getTranslations } from 'next-intl/server'

type LocaleHomePageProps = {
  params: {
    locale: string
  }
}

export default async function LocaleHomePage({ params: { locale } }: LocaleHomePageProps) {
  const t = await getTranslations('landing')

  const cards = [
    {
      href: `/${locale}/dashboard`,
      title: t('cards.dashboard.title'),
      description: t('cards.dashboard.description'),
    },
    {
      href: `/${locale}/investor`,
      title: t('cards.investor.title'),
      description: t('cards.investor.description'),
    },
    {
      href: '/api/capital',
      title: t('cards.api.title'),
      description: t('cards.api.description'),
    },
  ]

  return (
    <div className="page">
      <section className="hero">
        <div>
          <p className="eyebrow">{t('eyebrow')}</p>
          <h1 style={{ fontSize: '2.2rem', margin: 0 }}>{t('headline')}</h1>
          <p className="page-header__meta">{t('description')}</p>
        </div>

        <div className="hero__actions">
          <Link href={`/${locale}/dashboard`} className="btn btn--primary">
            {t('primaryCta')}
          </Link>
          <Link href={`/${locale}/auth/signin`} className="btn btn--ghost">
            {t('secondaryCta')}
          </Link>
        </div>
      </section>

      <div className="card-grid">
        {cards.map((card) => (
          <Link key={card.href} href={card.href} className="link-card">
            <div className="link-card__title">{card.title}</div>
            <p className="link-card__desc">{card.description}</p>
          </Link>
        ))}
      </div>
    </div>
  )
}
