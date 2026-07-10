import { describe, it, expect } from 'vitest'

// Reproduit la logique de sanitizeHtml de RichEditor.jsx pour les tests unitaires
const ALLOWED_TAGS = new Set([
  'p', 'br', 'strong', 'b', 'em', 'i', 'u', 's',
  'h2', 'h3', 'h4', 'ul', 'ol', 'li', 'blockquote', 'a', 'hr', 'img'
])
const ALLOWED_ATTRS = {
  a: new Set(['href', 'title', 'target', 'rel']),
  img: new Set(['src', 'alt', 'title'])
}

const sanitizeHtml = (html) => {
  if (!html) return ''
  const tpl = document.createElement('template')
  tpl.innerHTML = html
  const walk = (node) => {
    const children = Array.from(node.childNodes)
    for (const child of children) {
      if (child.nodeType === 1) {
        const tag = child.tagName.toLowerCase()
        if (!ALLOWED_TAGS.has(tag)) {
          const text = document.createTextNode(child.textContent || '')
          child.replaceWith(text)
          continue
        }
        for (const attr of Array.from(child.attributes)) {
          const name = attr.name.toLowerCase()
          const allowed = ALLOWED_ATTRS[tag]
          if (!allowed || !allowed.has(name)) {
            child.removeAttribute(attr.name)
            continue
          }
          if (name === 'href' || name === 'src') {
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

describe('RichEditor sanitizeHtml', () => {
  it('autorise les balises safe', () => {
    const out = sanitizeHtml('<p>Hello <strong>world</strong></p>')
    expect(out).toContain('<p>')
    expect(out).toContain('<strong>')
  })

  it('supprime les balises interdites (script, iframe, style)', () => {
    expect(sanitizeHtml('<script>alert(1)</script>hello')).not.toContain('script')
    expect(sanitizeHtml('<iframe src="evil.com"></iframe>x')).not.toContain('iframe')
    expect(sanitizeHtml('<style>body{}</style>x')).not.toContain('style')
  })

  it('supprime les attributs dangereux (onclick, onerror)', () => {
    const out = sanitizeHtml('<p onclick="alert(1)">x</p>')
    expect(out).not.toContain('onclick')
  })

  it('bloque javascript: dans href', () => {
    const out = sanitizeHtml('<a href="javascript:alert(1)">x</a>')
    expect(out.toLowerCase()).not.toContain('javascript:')
  })

  it('bloque data: non image dans src', () => {
    const out = sanitizeHtml('<img src="data:text/html,<script>alert(1)</script>">')
    expect(out).not.toContain('text/html')
  })

  it('autorise data:image dans img', () => {
    const out = sanitizeHtml('<img src="data:image/png;base64,iVBORw0KGgo=">')
    expect(out).toContain('data:image/png')
  })

  it('ajoute target=_blank et rel=noopener noreferrer sur les liens', () => {
    const out = sanitizeHtml('<a href="https://example.com">x</a>')
    expect(out).toContain('target="_blank"')
    expect(out).toContain('rel="noopener noreferrer"')
  })

  it('supprime les commentaires HTML', () => {
    expect(sanitizeHtml('<!-- secret -->x')).not.toContain('<!--')
  })
})
