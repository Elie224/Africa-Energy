import { Router } from 'express'
import db from '../db/index.js'
import { requireAuth, requireRole } from '../middleware/auth.js'

const router = Router()
router.use(requireAuth)
router.use(requireRole('super_admin'))

router.get('/', (req, res) => {
  const { user, action, limit = 100 } = req.query
  let sql = 'SELECT * FROM audit_logs WHERE 1=1'
  const params = []
  if (user) { sql += ' AND user_email LIKE ?'; params.push('%' + user + '%') }
  if (action) { sql += ' AND action LIKE ?'; params.push('%' + action + '%') }
  sql += ' ORDER BY created_at DESC LIMIT ?'
  params.push(Math.min(Number(limit) || 100, 500))
  res.json({ items: db.prepare(sql).all(...params) })
})

export default router
