import React from 'react'
import { useI18n } from '../i18n/I18nContext.jsx'

const flags = { fr: '🇫🇷', en: '🇬🇧' }
const labels = { fr: 'FR', en: 'EN' }

const LanguageSwitcher = ({ variant = 'light' }) => {
  const { lang, setLang, available } = useI18n()
  const baseStyle = variant === 'dark'
    ? { color: '#fff', borderColor: 'rgba(255,255,255,0.4)' }
    : { color: '#0B2A5B', borderColor: '#0B2A5B' }
  return (
    <div className="ae-lang-switch" role="group" aria-label="Language switcher">
      {available.map((code) => (
        <button
          key={code}
          type="button"
          onClick={() => setLang(code)}
          aria-pressed={lang === code}
          title={code.toUpperCase()}
          style={{
            background: lang === code ? '#0B2A5B' : 'transparent',
            color: lang === code ? '#fff' : baseStyle.color,
            border: `1px solid ${baseStyle.borderColor}`,
            padding: '4px 10px',
            marginLeft: 6,
            borderRadius: 6,
            fontSize: 13,
            fontWeight: 600,
            cursor: 'pointer',
            lineHeight: 1.4
          }}
        >
          <span aria-hidden="true" style={{ marginRight: 4 }}>{flags[code]}</span>{labels[code]}
        </button>
      ))}
    </div>
  )
}

export default LanguageSwitcher
