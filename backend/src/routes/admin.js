import { Router } from 'express'
import db from '../db/index.js'
import { buildCrudRouter, slugify, now } from '../util/crud.js'
import { requireAuth, requireRole } from '../middleware/auth.js'
import { audit, getClientIp } from '../config/auth.js'

const router = Router()
router.use(requireAuth)

// ---------- LEADS ----------
const leadsRouter = Router()
leadsRouter.get('/', (req, res) => {
  const { status, page = 1, limit = 50 } = req.query
  const lim = Math.min(Math.max(parseInt(limit) || 50, 1), 200)
  const off = (Math.max(parseInt(page) || 1, 1) - 1) * lim
  let where = ''
  const params = []
  if (status) { where = ' WHERE status = ?'; params.push(status) }
  const items = db.prepare(`SELECT * FROM leads${where} ORDER BY created_at DESC LIMIT ? OFFSET ?`).all(...params, lim, off)
  const { c: total } = db.prepare(`SELECT COUNT(*) c FROM leads${where}`).get(...params)
  res.json({ items, total, page: parseInt(page) || 1, limit: lim })
})
leadsRouter.get('/:id', (req, res) => {
  const row = db.prepare('SELECT * FROM leads WHERE id = ?').get(req.params.id)
  if (!row) return res.status(404).json({ error: 'Introuvable' })
  res.json({ item: row })
})
leadsRouter.patch('/:id/status', requireRole('editor'), (req, res) => {
  const { status, notes } = req.body || {}
  if (!['new', 'in_progress', 'done', 'archived'].includes(status)) {
    return res.status(400).json({ error: 'Statut invalide' })
  }
  const r = db.prepare('UPDATE leads SET status = ?, notes = COALESCE(?, notes), updated_at = ? WHERE id = ?')
    .run(status, notes ?? null, now(), req.params.id)
  if (r.changes === 0) return res.status(404).json({ error: 'Introuvable' })
  audit({ user: req.user, action: 'lead.status', target: req.params.id, meta: { status }, ip: getClientIp(req), userAgent: req.headers['user-agent'] })
  res.json({ item: db.prepare('SELECT * FROM leads WHERE id = ?').get(req.params.id) })
})
leadsRouter.delete('/:id', requireRole('editor'), (req, res) => {
  const r = db.prepare('DELETE FROM leads WHERE id = ?').run(req.params.id)
  if (r.changes === 0) return res.status(404).json({ error: 'Introuvable' })
  audit({ user: req.user, action: 'lead.delete', target: req.params.id, ip: getClientIp(req), userAgent: req.headers['user-agent'] })
  res.json({ ok: true })
})
leadsRouter.get('/export.csv', requireRole('editor'), (_req, res) => {
  const rows = db.prepare('SELECT * FROM leads ORDER BY created_at DESC').all()
  const headers = ['id','nom','email','telephone','entreprise','produit','message','status','created_at']
  // B17 : anti-injection formule CSV. Si la valeur commence par =, +, -, @ ou \t\r, on la prefixe par \t.
  const esc = (v) => {
    let s = String(v ?? '')
    if (/^[=+\-@\t\r]/.test(s)) s = "'" + s
    return '"' + s.replace(/"/g, '""') + '"'
  }
  const lines = [headers.join(',')]
  for (const r of rows) lines.push(headers.map((h) => esc(r[h])).join(','))
  res.setHeader('Content-Type', 'text/csv; charset=utf-8')
  res.setHeader('Content-Disposition', 'attachment; filename="leads.csv"')
  res.send(lines.join('\n'))
})
router.use('/leads', leadsRouter)

// ---------- NEWS ----------
const newsCrud = buildCrudRouter({
  db, table: 'news', auditLabel: 'news',
  columns: ['title','slug','excerpt','content','image_url','status','published_at','created_by','created_at','updated_at'],
  required: ['title'],
  writeRole: 'writer',
  orderBy: 'created_at DESC',
  beforeInsert: (b) => {
    if (!b.slug) b.slug = slugify(b.title)
    if (!b.created_at) b.created_at = now()
    b.updated_at = now()
    if (b.status === 'published' && !b.published_at) b.published_at = now()
  }
})
const newsBeforeUpdate = (req, _res, next) => {
  if (req.body?.status === 'published' && !req.body.published_at) req.body.published_at = now()
  req.body.updated_at = now()
  next()
}
newsCrud.use((req, _res, next) => {
  if (req.method === 'PUT' || req.method === 'POST') newsBeforeUpdate(req, _res, next)
  else next()
})
router.use('/news', newsCrud)

// ---------- PRODUCTS ----------
const productsCrud = buildCrudRouter({
  db, table: 'products', auditLabel: 'product',
  columns: ['name','slug','category','description','icon','image_url','order_idx','active','created_at','updated_at'],
  required: ['name'],
  writeRole: 'editor',
  orderBy: 'order_idx ASC, id ASC',
  beforeInsert: (b) => { if (!b.slug) b.slug = slugify(b.name); if (!b.created_at) b.created_at = now(); b.updated_at = now() }
})
productsCrud.use((req, _res, next) => { if (req.method === 'PUT' || req.method === 'POST') req.body.updated_at = now(); next() })
router.use('/products', productsCrud)

// ---------- TEAM ----------
const teamCrud = buildCrudRouter({
  db, table: 'team', auditLabel: 'team',
  columns: ['name','role','email','phone','photo_url','bio','order_idx','active','created_at','updated_at'],
  required: ['name','role'],
  writeRole: 'editor',
  orderBy: 'order_idx ASC, id ASC',
  beforeInsert: (b) => { if (!b.created_at) b.created_at = now(); b.updated_at = now() }
})
teamCrud.use((req, _res, next) => { if (req.method === 'PUT' || req.method === 'POST') req.body.updated_at = now(); next() })
router.use('/team', teamCrud)

// ---------- PARTNERS ----------
const partnersCrud = buildCrudRouter({
  db, table: 'partners', auditLabel: 'partner',
  columns: ['name','type','logo_url','website','description','order_idx','active','created_at','updated_at'],
  required: ['name'],
  writeRole: 'editor',
  orderBy: 'order_idx ASC, id ASC',
  beforeInsert: (b) => { if (!b.created_at) b.created_at = now(); b.updated_at = now() }
})
partnersCrud.use((req, _res, next) => { if (req.method === 'PUT' || req.method === 'POST') req.body.updated_at = now(); next() })
router.use('/partners', partnersCrud)

// ---------- EVENTS ----------
const eventsCrud = buildCrudRouter({
  db, table: 'events', auditLabel: 'event',
  columns: ['title','description','location','start_at','end_at','created_at','updated_at'],
  required: ['title','start_at'],
  writeRole: 'editor',
  orderBy: 'start_at DESC',
  beforeInsert: (b) => { if (!b.created_at) b.created_at = now(); b.updated_at = now() }
})
eventsCrud.use((req, _res, next) => { if (req.method === 'PUT' || req.method === 'POST') req.body.updated_at = now(); next() })
router.use('/events', eventsCrud)

// ---------- SETTINGS ----------
const settingsRouter = Router()
settingsRouter.get('/', (_req, res) => {
  const rows = db.prepare('SELECT key, value, updated_at FROM settings').all()
  res.json({ items: rows })
})
settingsRouter.put('/:key', requireRole('editor'), (req, res) => {
  const { value } = req.body || {}
  db.prepare(`INSERT INTO settings (key, value, updated_at) VALUES (?, ?, ?)
              ON CONFLICT(key) DO UPDATE SET value = excluded.value, updated_at = excluded.updated_at`)
    .run(req.params.key, JSON.stringify(value ?? null), now())
  audit({ user: req.user, action: 'settings.update', target: req.params.key, ip: getClientIp(req), userAgent: req.headers['user-agent'] })
  res.json({ ok: true, key: req.params.key })
})
router.use('/settings', settingsRouter)

// ---------- DASHBOARD ----------
router.get('/dashboard', (_req, res) => {
  const counts = {
    leads_new: db.prepare("SELECT COUNT(*) c FROM leads WHERE status = 'new'").get().c,
    leads_in_progress: db.prepare("SELECT COUNT(*) c FROM leads WHERE status = 'in_progress'").get().c,
    leads_total: db.prepare('SELECT COUNT(*) c FROM leads').get().c,
    news_published: db.prepare("SELECT COUNT(*) c FROM news WHERE status = 'published'").get().c,
    news_draft: db.prepare("SELECT COUNT(*) c FROM news WHERE status = 'draft'").get().c,
    products: db.prepare('SELECT COUNT(*) c FROM products WHERE active = 1').get().c,
    team: db.prepare('SELECT COUNT(*) c FROM team WHERE active = 1').get().c,
    partners: db.prepare('SELECT COUNT(*) c FROM partners WHERE active = 1').get().c,
    events: db.prepare('SELECT COUNT(*) c FROM events').get().c,
    users: db.prepare('SELECT COUNT(*) c FROM users WHERE active = 1').get().c
  }
  const recentLeads = db.prepare('SELECT id, nom, email, status, created_at FROM leads ORDER BY created_at DESC LIMIT 5').all()
  const recentAudit = db.prepare('SELECT id, user_email, action, target, created_at FROM audit_logs ORDER BY created_at DESC LIMIT 10').all()
  res.json({ counts, recentLeads, recentAudit })
})

export default router
