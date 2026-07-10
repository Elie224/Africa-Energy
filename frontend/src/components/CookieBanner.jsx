import React, { useState, useEffect } from 'react'
import { useI18n } from '../i18n/I18nContext.jsx'

const STORAGE_KEY = 'ae.cookieConsent'

const COPY = {
  fr: {
    title: 'Cookies & vie privée',
    text: 'Nous utilisons uniquement des cookies strictement nécessaires (mémorisation de la langue). Aucun cookie publicitaire ou de traçage tiers n’est déposé sans votre consentement.',
    policy: 'Politique de confidentialité',
    accept: 'Accepter',
    refuse: 'Refuser',
    settings: 'Personnaliser',
    necessary: 'Nécessaires (toujours actifs)',
    analytics: 'Mesure d’audience anonymisée',
    save: 'Enregistrer mes choix',
    saved: 'Vos préférences ont été enregistrées.',
    bannerAria: 'Bannière de consentement aux cookies'
  },
  en: {
    title: 'Cookies & privacy',
    text: 'We only use strictly necessary cookies (language memory). No advertising or third-party tracking cookies are set without your consent.',
    policy: 'Privacy policy',
    accept: 'Accept',
    refuse: 'Refuse',
    settings: 'Customize',
    necessary: 'Necessary (always on)',
    analytics: 'Anonymized audience measurement',
    save: 'Save my choices',
    saved: 'Your preferences have been saved.',
    bannerAria: 'Cookie consent banner'
  }
}

const CookieBanner = () => {
  const { lang } = useI18n()
  const c = COPY[lang] || COPY.fr
  const [visible, setVisible] = useState(false)
  const [showSettings, setShowSettings] = useState(false)
  const [analytics, setAnalytics] = useState(false)
  const [saved, setSaved] = useState(false)

  useEffect(() => {
    try {
      const v = localStorage.getItem(STORAGE_KEY)
      if (!v) setVisible(true)
      else {
        const p = JSON.parse(v)
        if (p && p.analytics) setAnalytics(true)
      }
    } catch { setVisible(true) }
  }, [])

  const persist = (mode) => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify({
        mode: mode,
        analytics: mode === 'all' ? true : (mode === 'custom' ? analytics : false),
        ts: Date.now()
      }))
    } catch {}
    setVisible(false)
    setSaved(true)
    setTimeout(() => setSaved(false), 3000)
  }

  if (saved) {
    return (
      <div className="ae-cookie-toast" role="status" aria-live="polite">
        <i className="bi bi-check-circle-fill"></i> {c.saved}
      </div>
    )
  }
  if (!visible) return null

  return (
    <>
      <div className="ae-cookie-overlay" onClick={() => {}} />
      <div className="ae-cookie-banner" role="dialog" aria-live="polite" aria-label={c.bannerAria}>
        <div className="ae-cookie-inner">
          <div className="ae-cookie-text">
            <h2 className="ae-cookie-title">
              <i className="bi bi-shield-check me-2" aria-hidden="true"></i>{c.title}
            </h2>
            <p>{c.text} <a href="/politique-de-confidentialite">{c.policy}</a>.</p>
            <div id='ae-cookie-settings'>{showSettings && (
              <div className="ae-cookie-settings">
                <label className="ae-cookie-row">
                  <input type="checkbox" checked disabled />
                  <span><strong>{c.necessary}</strong></span>
                </label>
                <label className="ae-cookie-row">
                  <input type="checkbox" checked={analytics} onChange={(e) => setAnalytics(e.target.checked)} />
                  <span>{c.analytics}</span>
                </label>
              </div>
            )}
            </div>
          </div>
          <div className="ae-cookie-actions">
            <button type="button" className="btn btn-sm btn-link" onClick={() => setShowSettings(s => !s)}>
              {c.settings}
            </button>
            <button type="button" className="btn btn-sm btn-outline-secondary" onClick={() => persist('refuse')}>
              {c.refuse}
            </button>
            {showSettings ? (
              <button type="button" className="btn btn-sm btn-ae-primary" onClick={() => persist('custom')}>
                {c.save}
              </button>
            ) : (
              <button type="button" className="btn btn-sm btn-ae-primary" onClick={() => persist('all')}>
                {c.accept}
              </button>
            )}
          </div>
        </div>
      </div>
    </>
  )
}

export default CookieBanner
