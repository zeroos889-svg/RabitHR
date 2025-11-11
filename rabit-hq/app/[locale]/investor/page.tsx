import React from 'react'
import { prisma } from '@/lib/db'
import { config } from '@/lib/config'
import { calculateFinancials } from '@/lib/finance'
import { getTranslations } from 'next-intl/server'

const SAR_CURRENCY = 'SAR'

type InvestorPageProps = {
  params: {
    locale: string
  }
}

const STATUS_META: Record<
  string,
  {
    badgeClass: string
    nodeClass: string
    translationKey: string
  }
> = {
  COMPLETED: {
    badgeClass: 'status-badge--green',
    nodeClass: 'timeline-node--done',
    translationKey: 'statuses.completed',
  },
  IN_PROGRESS: {
    badgeClass: 'status-badge--amber',
    nodeClass: 'timeline-node--current',
    translationKey: 'statuses.inProgress',
  },
  NOT_STARTED: {
    badgeClass: 'status-badge--slate',
    nodeClass: 'timeline-node--pending',
    translationKey: 'statuses.notStarted',
  },
}

export default async function InvestorPage({ params: { locale } }: InvestorPageProps) {
  const t = await getTranslations({ locale, namespace: 'investorPage' })

  if (!config.featureEnableInvestor) {
    return (
      <div className="page">
        <section className="panel">
          <h2 style={{ marginTop: 0 }}>{t('disabled.title')}</h2>
          <p className="page-header__meta">{t('disabled.subtitle')}</p>
        </section>
      </div>
    )
  }

  const snapshot = await calculateFinancials(6)
  const currency = new Intl.NumberFormat(locale === 'ar' ? 'ar-SA' : 'en-US', {
    style: 'currency',
    currency: SAR_CURRENCY,
    maximumFractionDigits: 0,
  })

  let phases: Array<{
    id: string
    name: string
    description?: string | null
    status: string
    order: number
  }> = []

  try {
    phases = await prisma.projectPhase.findMany({
      orderBy: { order: 'asc' },
    })
  } catch (error) {
    console.warn('InvestorPage: database unavailable; using fallback phases.', (error as Error).message)
  }

  if (!phases.length) {
    phases = getFallbackPhases(t)
  }

  return (
    <div className="page">
      <header className="page-header">
        <div>
          <p className="eyebrow">{t('eyebrow')}</p>
          <h1 style={{ margin: 0 }}>{t('title')}</h1>
          <p className="page-header__meta">{t('subtitle')}</p>
        </div>
      </header>

      <section className="stat-grid">
        <article className="stat-card">
          <p className="stat-label">{t('stats.remaining.label')}</p>
          <p className="stat-value">{formatCurrency(snapshot.remaining, currency)}</p>
          <p className="stat-sub">
            {snapshot.source === 'database'
              ? t('stats.remaining.verified')
              : t('stats.remaining.fallback')}
          </p>
        </article>
        <article className="stat-card">
          <p className="stat-label">{t('stats.runway.label')}</p>
          <p className="stat-value">
            {snapshot.runwayMonths ? t('stats.runway.value', { months: snapshot.runwayMonths }) : t('stats.runway.pending')}
          </p>
          <p className="stat-sub">{t(`stats.runway.health.${snapshot.status.toLowerCase() as 'healthy' | 'warning' | 'critical'}`)}</p>
        </article>
        <article className="stat-card">
          <p className="stat-label">{t('stats.burn.label')}</p>
          <p className="stat-value">{formatCurrency(snapshot.monthlyBurn, currency)}</p>
          <p className="stat-sub">{t('stats.burn.description', { months: snapshot.lookbackMonths })}</p>
        </article>
      </section>

      <section className="panel">
        <div className="panel-header">
          <div>
            <h3 style={{ margin: 0 }}>{t('roadmap.title')}</h3>
            <p className="page-header__meta">{t('roadmap.subtitle')}</p>
          </div>
        </div>

        <div className="timeline">
          {phases.map((phase) => {
            const meta = STATUS_META[phase.status] ?? STATUS_META.NOT_STARTED
            return (
              <div key={phase.id} className="timeline-item">
                <span className={`timeline-node ${meta.nodeClass}`} aria-hidden />

                <article className="timeline-card">
                  <div className={`status-badge ${meta.badgeClass}`}>{t(meta.translationKey)}</div>
                  <h4 style={{ margin: '0.35rem 0' }}>{phase.name}</h4>
                  <p className="page-header__meta">{phase.description ?? t('roadmap.missingDescription')}</p>
                </article>
              </div>
            )
          })}
        </div>
      </section>
    </div>
  )
}

function getFallbackPhases(t: Awaited<ReturnType<typeof getTranslations>>) {
  return [
    {
      id: 'fallback-1',
      name: t('fallbackPhases.foundation.title'),
      description: t('fallbackPhases.foundation.description'),
      status: 'COMPLETED',
      order: 1,
    },
    {
      id: 'fallback-2',
      name: t('fallbackPhases.beta.title'),
      description: t('fallbackPhases.beta.description'),
      status: 'IN_PROGRESS',
      order: 2,
    },
    {
      id: 'fallback-3',
      name: t('fallbackPhases.scale.title'),
      description: t('fallbackPhases.scale.description'),
      status: 'NOT_STARTED',
      order: 3,
    },
  ]
}

function formatCurrency(value: number, formatter: Intl.NumberFormat) {
  if (!Number.isFinite(value)) return '—'
  return formatter.format(Math.round(value))
}
