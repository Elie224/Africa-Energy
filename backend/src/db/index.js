// Wrapper autour de node:sqlite (integre a Node 22+, API compatible better-sqlite3)
import { DatabaseSync } from 'node:sqlite'
import path from 'node:path'
import fs from 'node:fs'
import { fileURLToPath } from 'node:url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const dataDir = path.resolve(__dirname, '../../data')
if (!fs.existsSync(dataDir)) fs.mkdirSync(dataDir, { recursive: true })
const dbPath = process.env.DB_PATH || path.join(dataDir, 'africa-energy.db')

class DB {
  constructor(path) { this._d = new DatabaseSync(path) }
  exec(sql) { this._d.exec(sql) }
  prepare(sql) {
    const stmt = this._d.prepare(sql)
    return {
      run: (...args) => {
        const r = stmt.run(...args)
        return { lastInsertRowid: Number(r.lastInsertRowid), changes: Number(r.changes) }
      },
      get: (...args) => stmt.get(...args) || null,
      all: (...args) => stmt.all(...args)
    }
  }
}

export const db = new DB(dbPath)
db.exec('PRAGMA journal_mode = WAL')
db.exec('PRAGMA foreign_keys = ON')

db.exec(`
CREATE TABLE IF NOT EXISTS users (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  email TEXT UNIQUE NOT NULL,
  password_hash TEXT NOT NULL,
  name TEXT NOT NULL,
  role TEXT NOT NULL DEFAULT 'reader',
  totp_secret TEXT,
  totp_enabled INTEGER DEFAULT 0,
  failed_attempts INTEGER DEFAULT 0,
  locked_until INTEGER,
  last_login_at INTEGER,
  last_login_ip TEXT,
  active INTEGER DEFAULT 1,
  created_at INTEGER NOT NULL,
  updated_at INTEGER NOT NULL
);

CREATE TABLE IF NOT EXISTS audit_logs (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  user_id INTEGER,
  user_email TEXT,
  action TEXT NOT NULL,
  target TEXT,
  ip TEXT,
  user_agent TEXT,
  meta TEXT,
  created_at INTEGER NOT NULL
);

CREATE TABLE IF NOT EXISTS settings (
  key TEXT PRIMARY KEY,
  value TEXT,
  updated_at INTEGER NOT NULL
);

CREATE TABLE IF NOT EXISTS news (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  title TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  excerpt TEXT,
  content TEXT,
  image_url TEXT,
  status TEXT DEFAULT 'draft',
  published_at INTEGER,
  created_by INTEGER,
  created_at INTEGER NOT NULL,
  updated_at INTEGER NOT NULL
);

CREATE TABLE IF NOT EXISTS products (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  category TEXT,
  description TEXT,
  icon TEXT,
  image_url TEXT,
  order_idx INTEGER DEFAULT 0,
  active INTEGER DEFAULT 1,
  created_at INTEGER NOT NULL,
  updated_at INTEGER NOT NULL
);

CREATE TABLE IF NOT EXISTS team (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT NOT NULL,
  role TEXT NOT NULL,
  email TEXT,
  phone TEXT,
  photo_url TEXT,
  bio TEXT,
  order_idx INTEGER DEFAULT 0,
  active INTEGER DEFAULT 1,
  created_at INTEGER NOT NULL,
  updated_at INTEGER NOT NULL
);

CREATE TABLE IF NOT EXISTS partners (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT NOT NULL,
  type TEXT,
  logo_url TEXT,
  website TEXT,
  description TEXT,
  order_idx INTEGER DEFAULT 0,
  active INTEGER DEFAULT 1,
  created_at INTEGER NOT NULL,
  updated_at INTEGER NOT NULL
);

CREATE TABLE IF NOT EXISTS events (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  title TEXT NOT NULL,
  description TEXT,
  location TEXT,
  start_at INTEGER NOT NULL,
  end_at INTEGER,
  created_at INTEGER NOT NULL,
  updated_at INTEGER NOT NULL
);

CREATE TABLE IF NOT EXISTS leads (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  nom TEXT,
  email TEXT,
  telephone TEXT,
  entreprise TEXT,
  produit TEXT,
  message TEXT,
  ip TEXT,
  user_agent TEXT,
  status TEXT DEFAULT 'new',
  notes TEXT,
  created_at INTEGER NOT NULL,
  updated_at INTEGER NOT NULL
);

CREATE TABLE IF NOT EXISTS media (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  filename TEXT NOT NULL,
  original_name TEXT,
  mime TEXT,
  size INTEGER,
  url TEXT NOT NULL,
  uploaded_by INTEGER,
  created_at INTEGER NOT NULL
);

CREATE INDEX IF NOT EXISTS idx_news_status ON news(status);
CREATE INDEX IF NOT EXISTS idx_leads_status ON leads(status);
CREATE INDEX IF NOT EXISTS idx_audit_user ON audit_logs(user_id);
CREATE INDEX IF NOT EXISTS idx_audit_created ON audit_logs(created_at);
`)

export default db
