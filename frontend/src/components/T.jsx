import { useI18n } from '../i18n/I18nContext.jsx'

// Composant de traduction pratique :
//   <T k="pages.home.heroTitle" />
//   <T k="pages.home.heroTitle" fr="L'energie..." en="The energy..." />
// Le fallback FR est obligatoire pour eviter d''afficher la cle brute.
const T = ({ k, fr, en: enFallback, children }) => {
  const { t, lang } = useI18n()
  // Priorite : 1) cle i18n dans le dict, 2) fallback EN si lang=en, 3) fallback FR, 4) children, 5) cle brute
  const fromDict = t(k)
  if (fromDict !== k) return fromDict
  if (lang === 'en' && enFallback) return enFallback
  if (fr) return fr
  if (children) return children
  return k
}

export default T
