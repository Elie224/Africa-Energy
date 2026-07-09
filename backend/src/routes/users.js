import { Router } from 'express'
import db from '../db/index.js'
import { hashPassword, verifyPassword, audit, getClientIp, generateTotpSecret, verifyTotp, totpUri, totpQrPng } from '../config/auth.js'
import { requireAuth, requireRole } from '../middleware/auth.js'

const router = Router()
router.use(requireAuth)

// LISTE
router.get('/', requireRole('reader'), (_req, res) => {
  const rows = db.prepare('SELECT id, email, name, role, active, totp_enabled, last_login_at, last_login_ip, created_at FROM users ORDER BY id ASC').all()
  res.json({ items: rows })
})

// CREATION (super_admin uniquement)
router.post('/', requireRole('super_admin'), (req, res) => {
  const { email, password, name, role } = req.body || {}
  if (!email || !password || !name || !role) return res.status(400).json({ error: 'email, password, name, role requis' })
  if (!['super_admin','editor','writer','reader'].includes(role)) return res.status(400).json({ error: 'Role invalide' })
  try {
    const r = db.prepare(`INSERT INTO users (email, password_hash, name, role, active, created_at, updated_at)
      VALUES (?, ?, ?, ?, 1, ?, ?)`).run(email.toLowerCase(), hashPassword(password), name, role, Date.now(), Date.now())
    audit({ user: req.user, action: 'user.create', target: String(r.lastInsertRowid), meta: { role, email }, ip: getClientIp(req), userAgent: req.headers['user-agent'] })
    res.status(201).json({ ok: true, id: r.lastInsertRowid })
  } catch (e) {
    if (String(e.message).includes('UNIQUE')) return res.status(409).json({ error: 'Email deja utilise' })
    res.status(500).json({ error: e.message })
  }
})

// MISE A JOUR (role, active, name)
router.put('/:id', requireRole('super_admin'), (req, res) => {
  const { name, role, active, password } = req.body || {}
  const u = db.prepare('SELECT * FROM users WHERE id = ?').get(req.params.id)
  if (!u) return res.status(404).json({ error: 'Introuvable' })
  const updates = []
  const values = []
  if (name) { updates.push('name = ?'); values.push(name) }
  if (role && ['super_admin','editor','writer','reader'].includes(role)) { updates.push('role = ?'); values.push(role) }
  if (active !== undefined) { updates.push('active = ?'); values.push(active ? 1 : 0) }
  if (password) { updates.push('password_hash = ?'); values.push(hashPassword(password)) }
  if (!updates.length) return res.status(400).json({ error: 'Rien a mettre a jour' })
  updates.push('updated_at = ?'); values.push(Date.now())
  values.push(req.params.id)
  db.prepare(`UPDATE users SET ${updates.join(', ')} WHERE id = ?`).run(...values)
  audit({ user: req.user, action: 'user.update', target: req.params.id, meta: { name, role, active: active !== undefined ? !!active : undefined }, ip: getClientIp(req), userAgent: req.headers['user-agent'] })
  res.json({ ok: true })
})

// RESET mot de passe (admin)
router.put('/:id/password', requireRole('super_admin'), (req, res) => {
  const { password } = req.body || {}
  if (!password || password.length < 8) return res.status(400).json({ error: 'Mot de passe >= 8 caracteres' })
  db.prepare('UPDATE users SET password_hash = ?, updated_at = ? WHERE id = ?').run(hashPassword(password), Date.now(), req.params.id)
  audit({ user: req.user, action: 'user.password.reset', target: req.params.id, ip: getClientIp(req), userAgent: req.headers['user-agent'] })
  res.json({ ok: true })
})

// RESET 2FA (admin peut reset pour un user)
router.delete('/:id/2fa', requireRole('super_admin'), (req, res) => {
  db.prepare('UPDATE users SET totp_enabled = 0, totp_secret = NULL, updated_at = ? WHERE id = ?').run(Date.now(), req.params.id)
  audit({ user: req.user, action: 'user.2fa.reset', target: req.params.id, ip: getClientIp(req), userAgent: req.headers['user-agent'] })
  res.json({ ok: true })
})

export default router
