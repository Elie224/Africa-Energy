import jwt from 'jsonwebtoken'
import bcrypt from 'bcryptjs'
import crypto from 'node:crypto'
import { authenticator } from 'otplib'
import QRCode from 'qrcode'
import db from '../db/index.js'

const JWT_SECRET = process.env.JWT_SECRET || crypto.randomBytes(48).toString('hex')
if (!process.env.JWT_SECRET) {
  console.warn('[auth] JWT_SECRET non defini - generation aleatoire (sessions invalidees au reboot)')
}
const JWT_TTL = '24h'

export const hashPassword = (plain) => bcrypt.hashSync(plain, 12)
export const verifyPassword = (plain, hash) => bcrypt.compareSync(plain, hash)

// req.user est issu du JWT (champs standard : sub = id, email, role, name)
export const signToken = (user) => jwt.sign(
  { sub: user.id, email: user.email, role: user.role, name: user.name },
  JWT_SECRET,
  { expiresIn: JWT_TTL }
)

export const verifyToken = (token) => {
  try { return jwt.verify(token, JWT_SECRET) } catch { return null }
}

export const generateTotpSecret = () => authenticator.generateSecret()
export const verifyTotp = (token, secret) => authenticator.check(token, secret)
export const totpUri = (email, secret) => authenticator.keyuri(email, 'Africa Energy Admin', secret)
export const totpQrPng = (uri) => QRCode.toDataURL(uri)

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
