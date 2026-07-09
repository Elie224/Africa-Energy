import { useEffect } from 'react'
import { useI18n } from '../i18n/I18nContext.jsx'

// Met a jour <title> et les balises <meta> (description, og, twitter, canonical).
// Si la cle SEO est dans les dictionnaires, elle prend le pas sur la valeur passee en prop.
// Props : title?, description?, keywords?, ogImage?, canonicalPath?
const BASE_TITLE = 'Africa Energy SAU'

const Seo = ({ title, description, keywords, ogImage, canonicalPath }) => {
  const { lang } = useI18n()
  useEffect(() => {
    const full = title ? `${title} · ${BASE_TITLE}` : BASE_TITLE
    document.title = full

    setMeta('description', description || "Africa Energy SAU - Distribution de produits petroliers et derives en Guinee. Gasoil, essence, lubrifiants, GPL, HFO. Conformite SONAP, livraison rapide sur Conakry et Simandou.")
    setMeta('keywords', keywords || "africa energy, hydrocarbures guinee, gasoil conakry, distribution petroliere, lubrifiants, GPL, HFO, SONAP")
    setOg('og:title', full)
    setOg('og:description', description || '')
    setOg('og:type', 'website')
    setOg('og:locale', lang === 'en' ? 'en_US' : 'fr_FR')
    if (ogImage) setOg('og:image', ogImage)
    setOg('og:site_name', BASE_TITLE)

    setMeta('twitter:card', 'summary_large_image')
    setMeta('twitter:title', full)
    setMeta('twitter:description', description || '')

    setLink('canonical', canonicalPath ? `${window.location.origin}${canonicalPath}` : window.location.href)
    setMeta('lang', lang, true)
  }, [title, description, keywords, ogImage, canonicalPath, lang])
  return null
}

const setMeta = (name, content, isHttpEquiv = false) => {
  if (!content) return
  const attr = isHttpEquiv ? 'http-equiv' : 'name'
  let el = document.head.querySelector(`meta[${attr}="${name}"]`)
  if (!el) {
    el = document.createElement('meta')
    el.setAttribute(attr, name)
    document.head.appendChild(el)
  }
  el.setAttribute('content', content)
}

const setOg = (property, content) => {
  if (!content) return
  let el = document.head.querySelector(`meta[property="${property}"]`)
  if (!el) {
    el = document.createElement('meta')
    el.setAttribute('property', property)
    document.head.appendChild(el)
  }
  el.setAttribute('content', content)
}

const setLink = (rel, href) => {
  if (!href) return
  let el = document.head.querySelector(`link[rel="${rel}"]`)
  if (!el) {
    el = document.createElement('link')
    el.setAttribute('rel', rel)
    document.head.appendChild(el)
  }
  el.setAttribute('href', href)
}

export default Seo
