import { verifyToken } from '../config/auth.js'

// 4 roles : super_admin > editor > writer > reader
export const ROLES = ['super_admin', 'editor', 'writer', 'reader']
const RANK = { super_admin: 4, editor: 3, writer: 2, reader: 1 }

export const requireAuth = (req, res, next) => {
  const h = req.headers.authorization || ''
  const token = h.startsWith('Bearer ') ? h.slice(7) : null
  if (!token) return res.status(401).json({ error: 'Token manquant' })
  const payload = verifyToken(token)
  if (!payload) return res.status(401).json({ error: 'Token invalide ou expire' })
  req.user = payload
  next()
}

export const requireRole = (minRole) => (req, res, next) => {
  if (!req.user) return res.status(401).json({ error: 'Non authentifie' })
  if ((RANK[req.user.role] || 0) < (RANK[minRole] || 0)) {
    return res.status(403).json({ error: 'Permissions insuffisantes' })
  }
  next()
}
