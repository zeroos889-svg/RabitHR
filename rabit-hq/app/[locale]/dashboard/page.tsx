import React from 'react'
import { calculateFinancials } from '@/lib/finance'
import { generateInsights } from '@/lib/ai'
import { getTranslations } from 'next-intl/server'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { CreateCapitalForm } from '@/components/forms/create-capital-form'
import { CreateExpenseForm } from '@/components/forms/create-expense-form'

const SAR_CURRENCY = 'SAR'

type DashboardPageProps = {
  params: {
    locale: string
  }
}

export default async function DashboardPage({ params: { locale } }: DashboardPageProps) {
  const t = await getTranslations({ locale, namespace: 'dashboardPage' })
  const metrics = await calculateFinancials(6)
  const insights = await generateInsights(metrics)

  const bars = metrics.monthlyBurnHistory
  const maxBar = Math.max(...bars.map((point) => point.total), 1)
  const currency = new Intl.NumberFormat(locale === 'ar' ? 'ar-SA' : 'en-US', {
    style: 'currency',
    currency: SAR_CURRENCY,
    maximumFractionDigits: 0,
  })

  return (
    <div className="page">
      <header className="page-header">
        <div>
          <p className="eyebrow">{t('eyebrow')}</p>
          <h1 style={{ margin: 0 }}>{t('title')}</h1>
          <p className="page-header__meta">{t('subtitle')}</p>
        </div>
        <div className={`pill pill--${metrics.status}`} aria-live="polite">
          {t('statusPill', { status: t(`status.${metrics.status}`) })}
        </div>
      </header>

      <Card className="border-slate-200 shadow-sm">
        <CardHeader className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <CardTitle className="text-lg font-semibold">{t('quickActions.title')}</CardTitle>
            <CardDescription>{t('quickActions.description')}</CardDescription>
          </div>
          <p className="text-sm text-slate-500">{t('quickActions.note')}</p>
        </CardHeader>
        <CardContent className="flex flex-wrap items-center gap-3">
          <CreateCapitalForm />
          <CreateExpenseForm />
        </CardContent>
      </Card>

      <section className="stat-grid">
        <article className="stat-card">
          <p className="stat-label">{t('stats.totalCapital.label')}</p>
          <p className="stat-value">{formatCurrency(metrics.totalCapital, currency)}</p>
          <p className="stat-sub">{t('stats.totalCapital.description')}</p>
        </article>

        <article className="stat-card">
          <p className="stat-label">{t('stats.totalExpenses.label')}</p>
          <p className="stat-value">{formatCurrency(metrics.totalExpenses, currency)}</p>
          <p className="stat-sub">{t('stats.totalExpenses.description')}</p>
        </article>

        <article className="stat-card">
          <p className="stat-label">{t('stats.remaining.label')}</p>
          <p className="stat-value">{formatCurrency(metrics.remaining, currency)}</p>
          <p className="stat-sub">{t('stats.remaining.description')}</p>
        </article>

        <article className="stat-card">
          <p className="stat-label">{t('stats.monthlyBurn.label')}</p>
          <p className="stat-value">{formatCurrency(metrics.monthlyBurn, currency)}</p>
          <p className="stat-sub">{t('stats.monthlyBurn.description', { months: metrics.lookbackMonths })}</p>
        </article>
      </section>

      <section className="panel">
        <div className="panel-header">
          <div>
            <h3 style={{ margin: 0 }}>{t('burnTrend.title')}</h3>
            <p className="page-header__meta">{t('burnTrend.description', { months: metrics.lookbackMonths })}</p>
          </div>
          <span className={`pill pill--${metrics.status}`}>{t(`statusDescription.${metrics.status}`)}</span>
        </div>

        <div className="burn-chart" role="img" aria-label={t('burnTrend.chartAria')}>
          {bars.map((point) => {
            const height = Math.max(10, Math.round((point.total / maxBar) * 100))
            return (
              <div key={point.label} className="burn-bar">
                <div className="burn-bar__fill" style={{ height: `${height}%` }} />
                <span className="burn-bar__label">{point.label}</span>
              </div>
            )
          })}
        </div>
      </section>

      <section className="panel">
        <div className="panel-header">
          <div>
            <h3 style={{ margin: 0 }}>{t('insights.title')}</h3>
            <p className="page-header__meta">
              {insights.source === 'ai' && insights.enabled ? t('insights.aiSource') : t('insights.ruleSource')}
            </p>
          </div>
        </div>

        <div className="insights-grid">
          <div>
            <h4>{t('insights.keySignals')}</h4>
            <ul className="insights-list">
              {(insights.insights.length ? insights.insights : [t('insights.empty')]).map((line, index) => (
                <li key={`${line}-${index}`}>{line}</li>
              ))}
            </ul>
          </div>
          <div>
            <h4>{t('insights.suggestedActions')}</h4>
            <ul className="actions-list">
              {(insights.actions.length ? insights.actions : [t('insights.actionsEmpty')]).map((line, index) => (
                <li key={`${line}-${index}`}>{line}</li>
              ))}
            </ul>
          </div>
        </div>

        {insights.message && <p className="note">{insights.message}</p>}
      </section>

      <section className="panel">
        <div className="panel-header">
          <div>
            <h3 style={{ margin: 0 }}>{t('systemStatus.title')}</h3>
            <p className="page-header__meta">{t('systemStatus.description')}</p>
          </div>
        </div>

        <ul className="insights-list">
          <li>
            {t('systemStatus.dataSource', {
              source: metrics.source === 'database' ? t('systemStatus.sources.database') : t('systemStatus.sources.fallback'),
            })}
          </li>
          <li>
            {t('systemStatus.runway', {
              runway: metrics.runwayMonths ?? t('systemStatus.runwayUnknown'),
            })}
          </li>
          <li>
            {t('systemStatus.aiMode', {
              mode: insights.source === 'ai' && insights.enabled
                ? t('systemStatus.aiModes.enabled')
                : t('systemStatus.aiModes.heuristic'),
            })}
          </li>
        </ul>

        {metrics.note && <p className="note">{metrics.note}</p>}
      </section>
    </div>
  )
}

function formatCurrency(value: number, formatter: Intl.NumberFormat) {
  if (!Number.isFinite(value)) return '—'
  return formatter.format(Math.round(value))
}
