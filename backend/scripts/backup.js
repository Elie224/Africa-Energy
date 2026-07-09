import 'dotenv/config'
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const dataDir = path.resolve(__dirname, '../data')
const backupDir = path.resolve(__dirname, '../backups')
if (!fs.existsSync(backupDir)) fs.mkdirSync(backupDir, { recursive: true })

const dbPath = process.env.DB_PATH || path.join(dataDir, 'africa-energy.db')
if (!fs.existsSync(dbPath)) {
  console.error('[backup] BDD introuvable :', dbPath)
  process.exit(1)
}

const stamp = new Date().toISOString().replace(/[:.]/g, '-')
const dest = path.join(backupDir, `africa-energy-${stamp}.db`)
fs.copyFileSync(dbPath, dest)

// Purge : garder 30 jours
const cutoff = Date.now() - 30 * 24 * 60 * 60 * 1000
for (const f of fs.readdirSync(backupDir)) {
  const p = path.join(backupDir, f)
  if (fs.statSync(p).mtimeMs < cutoff) fs.unlinkSync(p)
}
console.log('[backup] OK ->', dest)
