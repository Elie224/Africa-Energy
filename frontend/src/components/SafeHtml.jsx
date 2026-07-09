import React, { useMemo } from 'react'

// Sanitisation partagee avec RichEditor pour l'affichage public.
// Meme politique : whitelist stricte de balises + attributs.
const ALLOWED_TAGS = new Set([
  'p', 'br', 'strong', 'b', 'em', 'i', 'u', 's',
  'h2', 'h3', 'h4', 'ul', 'ol', 'li', 'blockquote', 'a', 'hr', 'img'
])
const ALLOWED_ATTRS = {
  a: new Set(['href', 'title', 'target', 'rel']),
  img: new Set(['src', 'alt', 'title'])
}

function sanitize(html) {
  if (!html) return ''
  if (typeof window === 'undefined') return ''
  const tpl = document.createElement('template')
  tpl.innerHTML = String(html)
  const walk = (node) => {
    const children = Array.from(node.childNodes)
    for (const child of children) {
      if (child.nodeType === 1) {
        const tag = child.tagName.toLowerCase()
        if (!ALLOWED_TAGS.has(tag)) {
          child.replaceWith(document.createTextNode(child.textContent || ''))
          continue
        }
        for (const attr of Array.from(child.attributes)) {
          const name = attr.name.toLowerCase()
          const allowed = ALLOWED_ATTRS[tag]
          if (!allowed || !allowed.has(name)) {
            child.removeAttribute(attr.name)
            continue
          }
          if ((name === 'href' || name === 'src')) {
            const v = String(attr.value).trim()
            if (/^javascript:/i.test(v) || /^data:(?!image\/)/i.test(v)) {
              child.removeAttribute(attr.name)
            }
          }
        }
        if (tag === 'a' && child.getAttribute('href')) {
          child.setAttribute('target', '_blank')
          child.setAttribute('rel', 'noopener noreferrer')
        }
        walk(child)
      } else if (child.nodeType === 8) {
        child.remove()
      }
    }
  }
  walk(tpl.content)
  return tpl.innerHTML.replace(/<script[\s\S]*?<\/script>/gi, '')
}

const SafeHtml = ({ html, className = '' }) => {
  const clean = useMemo(() => sanitize(html), [html])
  return <div className={`ae-prose ${className}`.trim()} dangerouslySetInnerHTML={{ __html: clean }} />
}

export default SafeHtml
