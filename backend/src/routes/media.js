import { Router } from 'express'
import multer from 'multer'
import path from 'node:path'
import fs from 'node:fs'
import crypto from 'node:crypto'
import db from '../db/index.js'
import { requireAuth, requireRole } from '../middleware/auth.js'
import { audit, getClientIp } from '../config/auth.js'
import { uploadsDir } from '../config/paths.js'

if (!fs.existsSync(uploadsDir)) fs.mkdirSync(uploadsDir, { recursive: true })

const storage = multer.diskStorage({
  destination: (_req, _file, cb) => cb(null, uploadsDir),
  filename: (_req, file, cb) => {
    const ext = path.extname(file.originalname).toLowerCase().slice(0, 8) || ''
    const safe = crypto.randomBytes(12).toString('hex')
    cb(null, `${Date.now()}-${safe}${ext}`)
  }
})

const ALLOWED = new Set(['image/jpeg','image/png','image/webp','image/gif'])
// PDF autorise separement (document, pas image - pas de risque XSS)
const ALLOWED_DOCS = new Set(['application/pdf'])
const upload = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 },
  fileFilter: (_req, file, cb) => {
    if (!ALLOWED.has(file.mimetype) && !ALLOWED_DOCS.has(file.mimetype)) {
      return cb(new Error('Type de fichier non autorise'))
    }
    cb(null, true)
  }
})

const router = Router()
router.use(requireAuth)

const publicMediaUrl = (filename) => `/api/public/media/${filename}`

router.post('/', requireRole('editor'), upload.single('file'), (req, res) => {
  if (!req.file) return res.status(400).json({ error: 'Fichier manquant (champ "file")' })
  const url = publicMediaUrl(req.file.filename)
  const r = db.prepare(`INSERT INTO media (filename, original_name, mime, size, url, uploaded_by, created_at)
    VALUES (?, ?, ?, ?, ?, ?, ?)`).run(
      req.file.filename, req.file.originalname, req.file.mimetype, req.file.size, url, req.user.sub, Date.now()
  )
  audit({ user: req.user, action: 'media.upload', target: String(r.lastInsertRowid), meta: { filename: req.file.filename, size: req.file.size }, ip: getClientIp(req), userAgent: req.headers['user-agent'] })
  res.status(201).json({ item: { id: r.lastInsertRowid, url, filename: req.file.filename, original_name: req.file.originalname, mime: req.file.mimetype, size: req.file.size } })
})

// Servir un fichier uploade avec authentification (usage admin/interne)
router.get('/file/:filename', (req, res) => {
  const safe = req.params.filename.replace(/[^a-zA-Z0-9_.-]/g, '')
  if (safe !== req.params.filename) return res.status(400).json({ error: 'Nom invalide' })
  const fp = path.join(uploadsDir, safe)
  if (!fs.existsSync(fp)) return res.status(404).json({ error: 'Introuvable' })
  const m = db.prepare('SELECT mime FROM media WHERE filename = ?').get(safe)
  res.setHeader('Content-Type', m?.mime || 'application/octet-stream')
  res.setHeader('Cache-Control', 'private, max-age=3600')
  res.sendFile(fp)
})

router.get('/', (req, res) => {
  const items = db.prepare('SELECT id, filename, original_name, mime, size, url, created_at FROM media ORDER BY created_at DESC LIMIT 200').all()
  res.json({ items })
})

router.delete('/:id', requireRole('editor'), (req, res) => {
  const m = db.prepare('SELECT * FROM media WHERE id = ?').get(req.params.id)
  if (!m) return res.status(404).json({ error: 'Introuvable' })
  const fp = path.join(uploadsDir, m.filename)
  if (fs.existsSync(fp)) try { fs.unlinkSync(fp) } catch {}
  db.prepare('DELETE FROM media WHERE id = ?').run(req.params.id)
  audit({ user: req.user, action: 'media.delete', target: req.params.id, ip: getClientIp(req), userAgent: req.headers['user-agent'] })
  res.json({ ok: true })
})

export default router
