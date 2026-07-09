import React from 'react'
import { useI18n } from '../i18n/I18nContext.jsx'

const labels = { fr: 'FR', en: 'EN' }
const full = { fr: 'Français', en: 'English' }

const LanguageSwitcher = ({ variant = 'light' }) => {
  const { lang, setLang, available } = useI18n()
  const baseStyle = variant === 'dark'
    ? { color: '#fff', borderColor: 'rgba(255,255,255,0.4)' }
    : { color: '#0B2A5B', borderColor: '#0B2A5B' }
  return (
    <div className="ae-lang-switch" role="group" aria-label="Sélecteur de langue">
      {available.map((code) => (
        <button
          key={code}
          type="button"
          onClick={() => setLang(code)}
          aria-pressed={lang === code}
          title={full[code]}
          style={{
            background: lang === code ? '#0B2A5B' : 'transparent',
            color: lang === code ? '#fff' : baseStyle.color,
            border: `1px solid ${baseStyle.borderColor}`,
            padding: '4px 10px',
            marginLeft: 6,
            borderRadius: 6,
            fontSize: 13,
            fontWeight: 700,
            cursor: 'pointer',
            lineHeight: 1.4,
            letterSpacing: 1
          }}
        >
          {labels[code]}
        </button>
      ))}
    </div>
  )
}

export default LanguageSwitcher
