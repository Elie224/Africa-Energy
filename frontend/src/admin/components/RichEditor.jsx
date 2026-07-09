import React, { useEffect, useRef, useState } from 'react'

// Mini editeur WYSIWYG base sur contentEditable (sans dependance externe).
// Sortie : HTML sanitise (whitelist de balises + attributs autorises).

const ALLOWED_TAGS = new Set([
  'p', 'br', 'strong', 'b', 'em', 'i', 'u', 's',
  'h2', 'h3', 'h4', 'ul', 'ol', 'li', 'blockquote', 'a', 'hr', 'img'
])

const ALLOWED_ATTRS = {
  a: new Set(['href', 'title', 'target', 'rel']),
  img: new Set(['src', 'alt', 'title'])
}

function sanitizeHtml(html) {
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

const ToolbarButton = ({ onClick, title, children }) => (
  <button type="button" className="ae-rich-btn" title={title}
    onMouseDown={(e) => e.preventDefault()} onClick={onClick}>{children}</button>
)

const RichEditor = ({ value = '', onChange, placeholder = 'Ecrivez ici...' }) => {
  const ref = useRef(null)
  const [empty, setEmpty] = useState(!value)

  useEffect(() => {
    if (!ref.current) return
    const incoming = sanitizeHtml(value || '')
    if (ref.current.innerHTML !== incoming) ref.current.innerHTML = incoming
    setEmpty(!ref.current.textContent.trim())
  }, [value])

  const exec = (cmd, val = null) => {
    document.execCommand(cmd, false, val)
    if (ref.current) {
      const html = sanitizeHtml(ref.current.innerHTML)
      onChange && onChange(html)
      setEmpty(!ref.current.textContent.trim())
    }
  }

  const onInput = () => {
    if (!ref.current) return
    const html = sanitizeHtml(ref.current.innerHTML)
    onChange && onChange(html)
    setEmpty(!ref.current.textContent.trim())
  }

  const insertLink = () => {
    const url = window.prompt('URL du lien :', 'https://')
    if (!url) return
    exec('createLink', url)
  }

  const insertImage = () => {
    const url = window.prompt("URL de l'image :", '/uploads/')
    if (!url) return
    exec('insertImage', url)
  }

  return (
    <div className="ae-rich">
      <div className="ae-rich-toolbar" role="toolbar" aria-label="Mise en forme">
        <ToolbarButton title="Gras" onClick={() => exec('bold')}><strong>B</strong></ToolbarButton>
        <ToolbarButton title="Italique" onClick={() => exec('italic')}><em>I</em></ToolbarButton>
        <ToolbarButton title="Souligne" onClick={() => exec('underline')}><span style={{ textDecoration: 'underline' }}>U</span></ToolbarButton>
        <span className="ae-rich-sep" />
        <ToolbarButton title="Titre H2" onClick={() => exec('formatBlock', 'H2')}>H2</ToolbarButton>
        <ToolbarButton title="Titre H3" onClick={() => exec('formatBlock', 'H3')}>H3</ToolbarButton>
        <ToolbarButton title="Paragraphe" onClick={() => exec('formatBlock', 'P')}>P</ToolbarButton>
        <span className="ae-rich-sep" />
        <ToolbarButton title="Liste a puces" onClick={() => exec('insertUnorderedList')}><i className="bi bi-list-ul" /></ToolbarButton>
        <ToolbarButton title="Liste numerotee" onClick={() => exec('insertOrderedList')}><i className="bi bi-list-ol" /></ToolbarButton>
        <ToolbarButton title="Citation" onClick={() => exec('formatBlock', 'BLOCKQUOTE')}>&ldquo;&rdquo;</ToolbarButton>
        <span className="ae-rich-sep" />
        <ToolbarButton title="Lien" onClick={insertLink}><i className="bi bi-link-45deg" /></ToolbarButton>
        <ToolbarButton title="Image" onClick={insertImage}><i className="bi bi-image" /></ToolbarButton>
        <ToolbarButton title="Ligne" onClick={() => exec('insertHorizontalRule')}>-</ToolbarButton>
        <span className="ae-rich-sep" />
        <ToolbarButton title="Tout effacer" onClick={() => { if (ref.current) ref.current.innerHTML = ''; onChange && onChange(''); setEmpty(true) }}>
          <i className="bi bi-trash" />
        </ToolbarButton>
      </div>
      <div
        ref={ref}
        className="ae-rich-area form-control"
        contentEditable
        suppressContentEditableWarning
        data-placeholder={placeholder}
        onInput={onInput}
        onBlur={onInput}
        spellCheck
      />
      {empty && <small className="text-muted d-block mt-1">Saisissez votre texte, utilisez la barre ci-dessus pour la mise en forme.</small>}
    </div>
  )
}

export default RichEditor
