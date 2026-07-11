import { Router } from 'express'
import fs from 'node:fs'
import path from 'node:path'
import db from '../db/index.js'
import { uploadsDir } from '../config/paths.js'

const router = Router()

const resolvePublicAssetUrl = (value) => {
  if (!value || typeof value !== 'string') return value
  return value.replace(/^\/uploads\/([^/?#]+)$/i, '/api/public/media/$1')
}

const mapPublicAssetFields = (item) => {
  if (!item || typeof item !== 'object') return item
  const mapped = { ...item }
  for (const key of ['image_url', 'photo_url', 'logo_url']) {
    if (mapped[key]) mapped[key] = resolvePublicAssetUrl(mapped[key])
  }
  return mapped
}

router.get('/media/:filename', (req, res) => {
  const safe = req.params.filename.replace(/[^a-zA-Z0-9_.-]/g, '')
  if (safe !== req.params.filename) return res.status(400).json({ error: 'Nom invalide' })
  const fp = path.join(uploadsDir, safe)
  if (!fs.existsSync(fp)) return res.status(404).json({ error: 'Introuvable' })
  const m = db.prepare('SELECT mime, original_name FROM media WHERE filename = ?').get(safe)
  res.setHeader('Content-Type', m?.mime || 'application/octet-stream')
  res.setHeader('Cache-Control', 'public, max-age=3600')
  res.setHeader('Content-Disposition', `inline; filename="${m?.original_name || safe}"`)
  res.sendFile(fp)
})

router.get('/news', (_req, res) => {
  const items = db.prepare("SELECT id, title, slug, excerpt, image_url, published_at FROM news WHERE status = 'published' ORDER BY published_at DESC LIMIT 50").all()
  res.json({ items: items.map(mapPublicAssetFields) })
})
router.get('/news/:slug', (req, res) => {
  const row = db.prepare("SELECT * FROM news WHERE slug = ? AND status = 'published'").get(req.params.slug)
  if (!row) return res.status(404).json({ error: 'Introuvable' })
  res.json({ item: mapPublicAssetFields(row) })
})
router.get('/products', (_req, res) => {
  const items = db.prepare("SELECT * FROM products WHERE active = 1 ORDER BY order_idx ASC, id ASC").all()
  res.json({ items: items.map(mapPublicAssetFields) })
})
router.get('/team', (_req, res) => {
  const items = db.prepare("SELECT * FROM team WHERE active = 1 ORDER BY order_idx ASC, id ASC").all()
  res.json({ items: items.map(mapPublicAssetFields) })
})
router.get('/partners', (_req, res) => {
  const items = db.prepare("SELECT * FROM partners WHERE active = 1 ORDER BY order_idx ASC, id ASC").all()
  res.json({ items: items.map(mapPublicAssetFields) })
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
