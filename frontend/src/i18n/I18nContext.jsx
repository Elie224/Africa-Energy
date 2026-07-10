import React, { createContext, useContext, useEffect, useState, useCallback } from 'react'
import fr from './fr.json'
import en from './en.json'

const DICTS = { fr, en }
const STORAGE_KEY = 'ae.lang'
const SUPPORTED = ['fr', 'en']

const I18nContext = createContext({
  lang: 'fr',
  setLang: () => {},
  t: (k) => k,
  available: SUPPORTED
})

// Detection initiale : on respecte localStorage si l''utilisateur a deja choisi,
// sinon on essaie navigator.language, sinon defaut = fr (site corporate francophone).
const detectInitial = () => {
  try {
    const saved = localStorage.getItem(STORAGE_KEY)
    if (saved && SUPPORTED.includes(saved)) return saved
  } catch {}
  try {
    const nav = (navigator.language || 'fr').slice(0, 2).toLowerCase()
    if (SUPPORTED.includes(nav)) return nav
  } catch {}
  return 'fr'
}

const getByPath = (obj, path) => {
  return path.split('.').reduce((acc, k) => (acc && acc[k] !== undefined ? acc[k] : undefined), obj)
}

export const I18nProvider = ({ children }) => {
  const [lang, setLangState] = useState(detectInitial)

  useEffect(() => {
    try { localStorage.setItem(STORAGE_KEY, lang) } catch {}
    document.documentElement.lang = lang
  }, [lang])

  const setLang = useCallback((l) => {
    if (SUPPORTED.includes(l)) setLangState(l)
  }, [])

  const t = useCallback((key, fallback) => {
    if (!key) return ''
    const v = getByPath(DICTS[lang], key)
    if (v !== undefined) return v
    const fr = getByPath(DICTS.fr, key)
    if (fr !== undefined) return fr
    if (fallback !== undefined) return fallback
    // Securite : ne JAMAIS afficher une cle brute du type 'pages.news.heroSubtitle'.
    // En dev on prefere un placeholder lisible pour reperer la cle manquante.
    if (typeof window !== 'undefined' && window.location && window.location.hostname === 'localhost') {
      return '[' + key + ']'
    }
    return ''
  }, [lang])

  return (
    <I18nContext.Provider value={{ lang, setLang, t, available: SUPPORTED }}>
      {children}
    </I18nContext.Provider>
  )
}

export const useI18n = () => useContext(I18nContext)
