import { describe, it, expect } from 'vitest'
import fr from '../i18n/fr.json'
import en from '../i18n/en.json'

const flatten = (obj, prefix = '') => {
  const out = []
  for (const k of Object.keys(obj)) {
    const v = obj[k]
    const key = prefix ? prefix + '.' + k : k
    if (typeof v === 'object' && v !== null && !Array.isArray(v)) out.push(...flatten(v, key))
    else out.push([key, v])
  }
  return out
}

describe('i18n FR/EN coverage', () => {
  it('toutes les cles FR existent en EN', () => {
    const frKeys = new Map(flatten(fr))
    const enKeys = new Map(flatten(en))
    const missing = []
    for (const k of frKeys.keys()) {
      if (!enKeys.has(k)) missing.push(k)
    }
    expect(missing).toEqual([])
  })

  it('les cles communes FR/EN sont des chaines non vides', () => {
    const frKeys = new Map(flatten(fr))
    const enKeys = new Map(flatten(en))
    for (const [k, v] of frKeys) {
      if (enKeys.has(k)) {
        expect(typeof v, 'FR ' + k).toBe('string')
        expect(v.length, 'FR ' + k).toBeGreaterThan(0)
        const ve = enKeys.get(k)
        expect(typeof ve, 'EN ' + k).toBe('string')
        expect(ve.length, 'EN ' + k).toBeGreaterThan(0)
      }
    }
  })

  it('les chaines contiennent des mots, pas des cles i18n brutes', () => {
    const frKeys = new Map(flatten(fr))
    for (const [k, v] of frKeys) {
      if (typeof v !== 'string') continue
      // Une cle non traduite ressemblerait a "pages.home.ctaXxx" (avec points)
      // On accepte les emails et telephones
      if (v.includes('@') || v.includes('+224')) continue
      expect(v).not.toMatch(/^[a-z]+\.[a-z]+\.[a-z]/, k + ' ressemble a une cle non traduite')
    }
  })

  it('les balises hreflang sont coherentes entre FR et EN', () => {
    expect(fr.pages.home.seoTitle).toBeTruthy()
    expect(en.pages.home.seoTitle).toBeTruthy()
    expect(fr.pages.contact.seoTitle).toBe(en.pages.contact.seoTitle)
  })

  it('les telephones ont un format international', () => {
    const tels = [fr.footer.phone, en.footer.phone].filter(Boolean)
    for (const t of tels) {
      expect(t).toMatch(/^\+\d{1,3}\s\d{3}\s\d{3}\s\d{3}$/)
    }
  })
})
