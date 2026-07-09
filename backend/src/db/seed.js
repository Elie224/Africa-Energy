import 'dotenv/config'
import db from './index.js'
import { hashPassword } from '../config/auth.js'

const email = (process.env.SEED_ADMIN_EMAIL || 'admin@africaenergy.com').toLowerCase()
const password = process.env.SEED_ADMIN_PASSWORD || 'ChangeMe!2026'
const name = process.env.SEED_ADMIN_NAME || 'Administrateur'

const existing = db.prepare('SELECT id FROM users WHERE email = ?').get(email)
const now = Date.now()
if (existing) {
  console.log('[seed] admin existe deja:', email)
  process.exit(0)
}
db.prepare(`
  INSERT INTO users (email, password_hash, name, role, active, created_at, updated_at)
  VALUES (?, ?, ?, 'super_admin', 1, ?, ?)
`).run(email, hashPassword(password), name, now, now)

console.log('[seed] super-admin cree:', email)
console.log('[seed] mot de passe initial :', password)
console.log('[seed] IMPORTANT : changez ce mot de passe apres la 1ere connexion.')
