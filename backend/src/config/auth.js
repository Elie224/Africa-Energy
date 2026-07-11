import jwt from 'jsonwebtoken'
import bcrypt from 'bcryptjs'
import crypto from 'node:crypto'
import { authenticator } from 'otplib'
import QRCode from 'qrcode'
import db from '../db/index.js'

let JWT_SECRET = process.env.JWT_SECRET
if (!JWT_SECRET) {
  if (process.env.NODE_ENV === 'production') {
    console.error('[auth] FATAL: JWT_SECRET manquant en production. Generation aleatoire refusee.')
    process.exit(1)
  }
  console.warn('[auth] JWT_SECRET non defini - generation aleatoire (DEV UNIQUEMENT, sessions invalidees au reboot)')
  JWT_SECRET = crypto.randomBytes(48).toString('hex')
}
const JWT_TTL = '1h'
const REFRESH_TTL_MS = 7 * 24 * 60 * 60 * 1000 // 7 jours
const REFRESH_BYTES = 48

export const hashPassword = (plain) => bcrypt.hashSync(plain, 12)
export const verifyPassword = (plain, hash) => bcrypt.compareSync(plain, hash)

// req.user est issu du JWT (champs standard : sub = id, email, role, name)
export const signToken = (user) => jwt.sign(
  { sub: user.id, email: user.email, role: user.role, name: user.name },
  JWT_SECRET,
  { expiresIn: JWT_TTL, algorithm: "HS256" }
)

export const verifyToken = (token) => {
  try { return jwt.verify(token, JWT_SECRET, { algorithms: ["HS256"] }) } catch { return null }
}

export const generateTotpSecret = () => authenticator.generateSecret()
export const verifyTotp = (token, secret) => authenticator.check(token, secret)
export const totpUri = (email, secret) => authenticator.keyuri(email, 'Africa Energy Admin', secret)
export const totpQrPng = (uri) => QRCode.toDataURL(uri)



// ---------- REFRESH TOKEN ----------
// Le refresh token est une chaine aleatoire envoyee au client.
// Seul le SHA-256 est stocke en DB (le token brut n'est jamais persiste).
export const generateRefreshToken = () => crypto.randomBytes(REFRESH_BYTES).toString('base64url')
const hashRefresh = (t) => crypto.createHash('sha256').update(t).digest('hex')

export const persistRefreshToken = (userId, token) => {
  const hash = hashRefresh(token)
  const expiresAt = Date.now() + REFRESH_TTL_MS
  db.prepare('INSERT INTO refresh_tokens (user_id, token_hash, expires_at, created_at) VALUES (?, ?, ?, ?)')
    .run(userId, hash, expiresAt, Date.now())
  return { token, expiresAt }
}

export const rotateRefreshToken = (oldToken, userId) => {
  const oldHash = hashRefresh(oldToken)
  const row = db.prepare('SELECT id, expires_at, revoked FROM refresh_tokens WHERE token_hash = ?').get(oldHash)
  if (!row || row.revoked || row.expires_at < Date.now()) return null
  // Revoke l'ancien, creer le nouveau
  const newToken = generateRefreshToken()
  const newHash = hashRefresh(newToken)
  const expiresAt = Date.now() + REFRESH_TTL_MS
  db.prepare('UPDATE refresh_tokens SET revoked = 1 WHERE id = ?').run(row.id)
  db.prepare('INSERT INTO refresh_tokens (user_id, token_hash, expires_at, created_at) VALUES (?, ?, ?, ?)')
    .run(userId, newHash, expiresAt, Date.now())
  return { token: newToken, expiresAt }
}

export const revokeRefreshToken = (token) => {
  const hash = hashRefresh(token)
  db.prepare('UPDATE refresh_tokens SET revoked = 1 WHERE token_hash = ?').run(hash)
}

export const revokeAllUserTokens = (userId) => {
  db.prepare('UPDATE refresh_tokens SET revoked = 1 WHERE user_id = ?').run(userId)
}

// Purge les refresh tokens expires (a appeler periodiquement)
export const purgeExpiredRefreshTokens = () => {
  const r = db.prepare('DELETE FROM refresh_tokens WHERE expires_at < ? OR revoked = 1').run(Date.now() - 24*60*60*1000)
  return r.changes
}

// ---------- AUDIT ----------
// Accepte soit un req.user (JWT payload) soit un user DB (row)
// Normalise en { id, email }
const normUser = (u) => {
  if (!u) return null
  return { id: u.id ?? u.sub ?? null, email: u.email ?? null }
}

export const audit = ({ user, action, target = null, ip = null, userAgent = null, meta = null }) => {
  try {
    const u = normUser(user)
    db.prepare(`
      INSERT INTO audit_logs (user_id, user_email, action, target, ip, user_agent, meta, created_at)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    `).run(
      u?.id || null,
      u?.email || null,
      action,
      target,
      ip,
      userAgent,
      meta ? JSON.stringify(meta) : null,
      Date.now()
    )
  } catch (e) {
    console.error('[audit] failed:', e.message)
  }
}

export const getClientIp = (req) =>
  req.headers['x-forwarded-for']?.split(',')[0]?.trim() || req.socket?.remoteAddress || null
