import { Router } from 'express'
import db from '../db/index.js'

const router = Router()

router.get('/news', (_req, res) => {
  const items = db.prepare("SELECT id, title, slug, excerpt, image_url, published_at FROM news WHERE status = 'published' ORDER BY published_at DESC LIMIT 50").all()
  res.json({ items })
})
router.get('/news/:slug', (req, res) => {
  const row = db.prepare("SELECT * FROM news WHERE slug = ? AND status = 'published'").get(req.params.slug)
  if (!row) return res.status(404).json({ error: 'Introuvable' })
  res.json({ item: row })
})
router.get('/products', (_req, res) => {
  const items = db.prepare("SELECT * FROM products WHERE active = 1 ORDER BY order_idx ASC, id ASC").all()
  res.json({ items })
})
router.get('/team', (_req, res) => {
  const items = db.prepare("SELECT * FROM team WHERE active = 1 ORDER BY order_idx ASC, id ASC").all()
  res.json({ items })
})
router.get('/partners', (_req, res) => {
  const items = db.prepare("SELECT * FROM partners WHERE active = 1 ORDER BY order_idx ASC, id ASC").all()
  res.json({ items })
})
router.get('/events', (_req, res) => {
  const items = db.prepare("SELECT * FROM events ORDER BY start_at DESC LIMIT 100").all()
  res.json({ items })
})

router.get('/jobs', (_req, res) => {
  try {
    const items = db.prepare('SELECT id, title, location, contract_type, description FROM jobs WHERE active = 1 ORDER BY created_at DESC LIMIT 50').all()
    res.json({ items })
  } catch (e) {
    res.json({ items: [] })
  }
})

// B15 : whitelist des cles exposees au public
const PUBLIC_SETTINGS = ['site.tagline', 'site.email', 'site.phone', 'site.address', 'social.whatsapp', 'social.maps']
router.get('/settings', (_req, res) => {
  const placeholders = PUBLIC_SETTINGS.map(() => '?').join(',')
  const rows = db.prepare(`SELECT key, value FROM settings WHERE key IN (${placeholders})`).all(...PUBLIC_SETTINGS)
  const out = {}
  for (const r of rows) { try { out[r.key] = JSON.parse(r.value) } catch { out[r.key] = r.value } }
  res.json({ settings: out })
})

export default router
