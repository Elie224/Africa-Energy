import { useEffect } from 'react'
import { useI18n } from '../i18n/I18nContext.jsx'

const BASE_TITLE = 'Africa Energy SAU'
const DEFAULT_OG_IMAGE = 'https://africaenergy.com/og-image.svg'

const Seo = ({ title, description, keywords, ogImage, canonicalPath }) => {
  const { lang } = useI18n()
  useEffect(() => {
    const full = title ? title + ' · ' + BASE_TITLE : BASE_TITLE
    document.title = full

    setMeta('description', description || 'Africa Energy SAU - Distribution de produits petroliers et derives en Guinee. Gasoil, essence, lubrifiants, GPL, HFO. Conformite SONAP, livraison rapide sur Conakry et Simandou.')
    setMeta('keywords', keywords || 'africa energy, hydrocarbures guinee, gasoil conakry, distribution petroliere, lubrifiants, GPL, HFO, SONAP')

    setOg('og:title', full)
    setOg('og:description', description || '')
    setOg('og:type', 'website')
    setOg('og:locale', lang === 'en' ? 'en_US' : 'fr_FR')
    setOg('og:locale:alternate', lang === 'en' ? 'fr_FR' : 'en_US')
    setOg('og:site_name', BASE_TITLE)

    const image = ogImage || DEFAULT_OG_IMAGE
    setOg('og:image', image)
    setOg('og:image:width', '1200')
    setOg('og:image:height', '630')
    setOg('og:image:alt', 'Africa Energy SAU')
    setMeta('twitter:image', image)
    setMeta('twitter:image:alt', 'Africa Energy SAU')

    setMeta('twitter:card', 'summary_large_image')
    setMeta('twitter:title', full)
    setMeta('twitter:description', description || '')

    const canonicalUrl = canonicalPath
      ? window.location.origin + canonicalPath
      : window.location.origin + window.location.pathname
    setLink('canonical', canonicalUrl)
  }, [title, description, keywords, ogImage, canonicalPath, lang])
  return null
}

const setMeta = (name, content, isHttpEquiv) => {
  if (!content) return
  const attr = isHttpEquiv ? 'http-equiv' : 'name'
  let el = document.head.querySelector('meta[' + attr + '="' + name + '"]')
  if (!el) {
    el = document.createElement('meta')
    el.setAttribute(attr, name)
    document.head.appendChild(el)
  }
  el.setAttribute('content', content)
}

const setOg = (property, content) => {
  if (!content) return
  let el = document.head.querySelector('meta[property="' + property + '"]')
  if (!el) {
    el = document.createElement('meta')
    el.setAttribute('property', property)
    document.head.appendChild(el)
  }
  el.setAttribute('content', content)
}

const setLink = (rel, href) => {
  if (!href) return
  let el = document.head.querySelector('link[rel="' + rel + '"]')
  if (!el) {
    el = document.createElement('link')
    el.setAttribute('rel', rel)
    document.head.appendChild(el)
  }
  el.setAttribute('href', href)
}

export default Seo
