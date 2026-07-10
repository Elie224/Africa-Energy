import React from 'react'
import { useI18n } from '../i18n/I18nContext.jsx'

const labels = { fr: 'FR', en: 'EN' }
const full = { fr: 'Francais', en: 'English' }

const LanguageSwitcher = ({ variant = 'light' }) => {
  const { lang, setLang, available } = useI18n()
  const base = variant === 'dark' ? '#fff' : '#0B2A5B'
  return (
    <div className={'ae-lang-switch ae-lang-switch--' + variant} role='group' aria-label="Sélecteur de langue" aria-orientation="horizontal">
      {available.map((code) => {
        const active = lang === code
        return (
          <button
            key={code}
            type='button'
            onClick={() => setLang(code)}
            aria-pressed={active}
            aria-label={"Switch to " + full[code]}
            title={full[code]}
            className={active ? 'is-active' : ''}
          >
            {labels[code]}
          </button>
        )
      })}
    </div>
  )
}

export default LanguageSwitcher
