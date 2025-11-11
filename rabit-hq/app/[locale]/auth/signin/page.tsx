'use client'

import { useState } from 'react'
import { signIn } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { useLocale, useTranslations } from 'next-intl'

export default function SignInPage() {
  const router = useRouter()
  const locale = useLocale()
  const t = useTranslations('authPage')
  const tAuth = useTranslations('auth')

  const [email, setEmail] = useState('founder@rabit.test')
  const [password, setPassword] = useState('password123')
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault()
    setLoading(true)
    setError(null)

    const result = await signIn('credentials', {
      email,
      password,
      redirect: false,
    })

    if (result?.error) {
      setError(tAuth('invalidCredentials'))
    } else if (result?.ok) {
      router.push(`/${locale}/dashboard`)
      router.refresh()
    }

    setLoading(false)
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

      <div className="auth-shell">
        <section className="auth-card">
          <form className="auth-form" onSubmit={handleSubmit}>
            {error && <div className="error-box">{error}</div>}

            <div className="form-field">
              <label htmlFor="email">{tAuth('email')}</label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                autoComplete="email"
                required
              />
            </div>

            <div className="form-field">
              <label htmlFor="password">{tAuth('password')}</label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                autoComplete="current-password"
                required
              />
            </div>

            <button type="submit" className="btn btn--primary" disabled={loading}>
              {loading ? t('signingIn') : tAuth('signIn')}
            </button>
          </form>
        </section>

        <aside className="auth-aside">
          <h3 style={{ marginTop: 0 }}>{t('demo.title')}</h3>
          <p className="page-header__meta">{t('demo.subtitle')}</p>
          <ul className="demo-list">
            <li>{t('demo.founder')}</li>
            <li>{t('demo.finance')}</li>
            <li>{t('demo.investor')}</li>
          </ul>

          <p className="note" style={{ marginTop: '1rem' }}>
            {t('demo.note')}
          </p>
        </aside>
      </div>
    </div>
  )
}
