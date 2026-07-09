import { Router } from 'express'
import rateLimit from 'express-rate-limit'
import { z } from 'zod'
import db from '../db/index.js'
import {
  hashPassword, verifyPassword, signToken,
  generateTotpSecret, verifyTotp, totpUri, totpQrPng,
  audit, getClientIp
} from '../config/auth.js'
import { requireAuth } from '../middleware/auth.js'

const router = Router()

const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, max: 10,
  standardHeaders: true, legacyHeaders: false
})

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(1),
  totp: z.string().optional()
})

const MAX_FAILED = 5
const LOCK_MS = 15 * 60 * 1000

// POST /api/auth/login
router.post('/login', loginLimiter, (req, res) => {
  const ip = getClientIp(req)
  const ua = req.headers['user-agent'] || null
  const parsed = loginSchema.safeParse(req.body)
  if (!parsed.success) return res.status(400).json({ error: 'Donnees invalides' })
  const { email, password, totp } = parsed.data

  const user = db.prepare('SELECT * FROM users WHERE email = ? AND active = 1').get(email.toLowerCase())
  if (!user) {
    audit({ action: 'login.failed', ip, userAgent: ua, meta: { email, reason: 'unknown' } })
    return res.status(401).json({ error: 'Identifiants invalides' })
  }

  if (user.locked_until && user.locked_until > Date.now()) {
    audit({ user, action: 'login.locked', ip, userAgent: ua })
    return res.status(423).json({ error: 'Compte verrouille. Reessayez dans 15 minutes.' })
  }

  if (!verifyPassword(password, user.password_hash)) {
    const failed = (user.failed_attempts || 0) + 1
    const locked = failed >= MAX_FAILED ? Date.now() + LOCK_MS : null
    db.prepare('UPDATE users SET failed_attempts = ?, locked_until = ? WHERE id = ?')
      .run(failed, locked, user.id)
    audit({ user, action: 'login.failed', ip, userAgent: ua, meta: { reason: 'bad_password', failed } })
    if (locked) return res.status(423).json({ error: 'Compte verrouille apres 5 echecs.' })
    return res.status(401).json({ error: 'Identifiants invalides' })
  }

  if (user.totp_enabled) {
    if (!totp) return res.status(401).json({ error: 'Code 2FA requis', requiresTotp: true })
    if (!verifyTotp(totp, user.totp_secret)) {
      audit({ user, action: 'login.failed', ip, userAgent: ua, meta: { reason: 'bad_totp' } })
      return res.status(401).json({ error: 'Code 2FA invalide' })
    }
  }

  // Reset failed, update last_login
  db.prepare('UPDATE users SET failed_attempts = 0, locked_until = NULL, last_login_at = ?, last_login_ip = ? WHERE id = ?')
    .run(Date.now(), ip, user.id)

  const token = signToken(user)
  audit({ user, action: 'login.success', ip, userAgent: ua })
  res.json({
    token,
    user: { id: user.id, email: user.email, name: user.name, role: user.role, totpEnabled: !!user.totp_enabled }
  })
})

// GET /api/auth/me
router.get('/me', requireAuth, (req, res) => {
  const u = db.prepare('SELECT id, email, name, role, totp_enabled, last_login_at FROM users WHERE id = ?').get(req.user.sub)
  if (!u) return res.status(404).json({ error: 'Utilisateur introuvable' })
  res.json({ user: { ...u, totpEnabled: !!u.totp_enabled } })
})

// POST /api/auth/2fa/setup - retourne QR code + secret (a scanner dans Google Authenticator)
router.post('/2fa/setup', requireAuth, async (req, res) => {
  const user = db.prepare('SELECT * FROM users WHERE id = ?').get(req.user.sub)
  if (!user) return res.status(404).json({ error: 'Utilisateur introuvable' })
  if (user.totp_enabled) return res.status(400).json({ error: '2FA deja active' })
  const secret = generateTotpSecret()
  db.prepare('UPDATE users SET totp_secret = ?, updated_at = ? WHERE id = ?').run(secret, Date.now(), user.id)
  const uri = totpUri(user.email, secret)
  const qr = await totpQrPng(uri)
  res.json({ secret, qr })
})

// POST /api/auth/2fa/verify - confirme avec un 1er code pour activer 2FA
router.post('/2fa/verify', requireAuth, (req, res) => {
  const { code } = req.body || {}
  if (!code) return res.status(400).json({ error: 'Code requis' })
  const user = db.prepare('SELECT * FROM users WHERE id = ?').get(req.user.sub)
  if (!user?.totp_secret) return res.status(400).json({ error: 'Lancez d abord /2fa/setup' })
  if (!verifyTotp(code, user.totp_secret)) return res.status(401).json({ error: 'Code invalide' })
  db.prepare('UPDATE users SET totp_enabled = 1, updated_at = ? WHERE id = ?').run(Date.now(), user.id)
  audit({ user, action: '2fa.enabled', ip: getClientIp(req), userAgent: req.headers['user-agent'] })
  res.json({ ok: true })
})

// POST /api/auth/2fa/disable
router.post('/2fa/disable', requireAuth, (req, res) => {
  const { password } = req.body || {}
  if (!password) return res.status(400).json({ error: 'Mot de passe requis' })
  const user = db.prepare('SELECT * FROM users WHERE id = ?').get(req.user.sub)
  if (!user || !verifyPassword(password, user.password_hash)) return res.status(401).json({ error: 'Mot de passe invalide' })
  db.prepare('UPDATE users SET totp_enabled = 0, totp_secret = NULL, updated_at = ? WHERE id = ?').run(Date.now(), user.id)
  audit({ user, action: '2fa.disabled', ip: getClientIp(req), userAgent: req.headers['user-agent'] })
  res.json({ ok: true })
})

// POST /api/auth/logout (cote audit uniquement, JWT stateless)
router.post('/logout', requireAuth, (req, res) => {
  const user = db.prepare('SELECT * FROM users WHERE id = ?').get(req.user.sub)
  audit({ user, action: 'logout', ip: getClientIp(req), userAgent: req.headers['user-agent'] })
  res.json({ ok: true })
})

export default router
