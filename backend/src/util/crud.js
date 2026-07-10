// Factory CRUD minimaliste
import { Router } from 'express'
import { audit, getClientIp } from '../config/auth.js'

export const slugify = (s) => String(s || '')
  .toLowerCase()
  .normalize('NFD').replace(/[\u0300-\u036f]/g, '')
  .replace(/[^a-z0-9]+/g, '-')
  .replace(/^-+|-+$/g, '')
  .slice(0, 80) || 'item'

export const now = () => Date.now()

// Garde-fou : tout identifiant SQL injecte via template literal doit passer ce filtre.
// Format : lettres minuscules, chiffres et underscore uniquement (convention SQL standard).
// Exemples valides : 'users', 'news', 'audit_logs', 'order_idx'
// Exemples rejetés : 'users; DROP TABLE', 'users--', 'users/*', 'ORDER BY 1'
const isSafeIdent = (s) => typeof s === 'string' && /^[a-z_][a-z0-9_]{0,62}$/i.test(s)
const validateIdents = (table, columns, orderBy) => {
  if (!isSafeIdent(table)) throw new Error(`Identifiant de table invalide: ${table}`)
  for (const c of columns) {
    if (!isSafeIdent(c)) throw new Error(`Identifiant de colonne invalide: ${c}`)
  }
  // orderBy peut contenir 'column ASC' ou 'column DESC' (separateur virgule)
  if (orderBy) {
    for (const part of orderBy.split(',')) {
      const ident = part.trim().split(/\s+/)[0]
      if (!isSafeIdent(ident)) throw new Error(`Identifiant dans orderBy invalide: ${orderBy}`)
    }
  }
}

export const buildCrudRouter = (opts) => {
  const { table, columns, required = [], editable = columns, writeRole = 'writer' } = opts
  // Defense en profondeur : valider les identifiants meme si on les considere surs (hardcoded).
  validateIdents(table, columns, opts.orderBy)
  // Verifier que editable est un sous-ensemble de columns
  for (const c of editable) {
    if (!columns.includes(c)) throw new Error(`Colonne editable '${c}' n'est pas dans columns`)
  }
  const router = Router()
  const allowedWrite = (req, res, next) => {
    const RANK = { super_admin: 4, editor: 3, writer: 2, reader: 1 }
    if ((RANK[req.user?.role] || 0) < (RANK[writeRole] || 0)) {
      return res.status(403).json({ error: 'Permissions insuffisantes' })
    }
    next()
  }

  router.get('/', (_req, res) => {
    const rows = opts.db.prepare(`SELECT * FROM ${table} ORDER BY ${opts.orderBy || 'id DESC'} LIMIT 500`).all()
    res.json({ items: rows })
  })

  router.get('/:id', (req, res) => {
    const row = opts.db.prepare(`SELECT * FROM ${table} WHERE id = ?`).get(req.params.id)
    if (!row) return res.status(404).json({ error: 'Introuvable' })
    res.json({ item: row })
  })

  router.post('/', allowedWrite, (req, res) => {
    const body = req.body || {}
    for (const k of required) {
      if (!body[k] && body[k] !== 0) return res.status(400).json({ error: `Champ requis: ${k}` })
    }
    if (opts.beforeInsert) opts.beforeInsert(body)
    const cols = columns.filter((c) => body[c] !== undefined)
    const placeholders = cols.map(() => '?').join(',')
    const values = cols.map((c) => body[c] ?? null)
    try {
      const r = opts.db.prepare(`INSERT INTO ${table} (${cols.join(',')}) VALUES (${placeholders})`).run(...values)
      const newId = r.lastInsertRowid
      audit({ user: req.user, action: `${opts.auditLabel || table}.create`, target: String(newId), ip: getClientIp(req), userAgent: req.headers['user-agent'] })
      const row = opts.db.prepare(`SELECT * FROM ${table} WHERE id = ?`).get(newId)
      res.status(201).json({ item: row })
    } catch (e) {
      if (String(e.message).includes('UNIQUE')) return res.status(409).json({ error: 'Valeur deja utilisee' })
      res.status(500).json({ error: e.message })
    }
  })

  router.put('/:id', allowedWrite, (req, res) => {
    const body = req.body || {}
    const cols = editable.filter((c) => body[c] !== undefined)
    if (!cols.length) return res.status(400).json({ error: 'Rien a mettre a jour' })
    const setSql = cols.map((c) => `${c} = ?`).join(', ')
    const values = cols.map((c) => body[c] ?? null)
    try {
      const r = opts.db.prepare(`UPDATE ${table} SET ${setSql} WHERE id = ?`).run(...values, req.params.id)
      if (r.changes === 0) return res.status(404).json({ error: 'Introuvable' })
      audit({ user: req.user, action: `${opts.auditLabel || table}.update`, target: req.params.id, ip: getClientIp(req), userAgent: req.headers['user-agent'] })
      const row = opts.db.prepare(`SELECT * FROM ${table} WHERE id = ?`).get(req.params.id)
      res.json({ item: row })
    } catch (e) {
      if (String(e.message).includes('UNIQUE')) return res.status(409).json({ error: 'Valeur deja utilisee' })
      res.status(500).json({ error: e.message })
    }
  })

  router.delete('/:id', allowedWrite, (req, res) => {
    let r
    if (opts.hardDelete) {
      r = opts.db.prepare(`DELETE FROM ${table} WHERE id = ?`).run(req.params.id)
    } else if (columns.includes('active')) {
      r = opts.db.prepare(`UPDATE ${table} SET active = 0 WHERE id = ?`).run(req.params.id)
    } else {
      r = opts.db.prepare(`DELETE FROM ${table} WHERE id = ?`).run(req.params.id)
    }
    if (r.changes === 0) return res.status(404).json({ error: 'Introuvable' })
    audit({ user: req.user, action: `${opts.auditLabel || table}.delete`, target: req.params.id, ip: getClientIp(req), userAgent: req.headers['user-agent'] })
    res.json({ ok: true })
  })

  return router
}
