import 'dotenv/config'
import express from 'express'
import cors from 'cors'
import helmet from 'helmet'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import './db/index.js'
import { uploadsDir } from './config/paths.js'
import contactRouter from './routes/contact.js'
import authRouter from './routes/auth.js'
import adminRouter from './routes/admin.js'
import usersRouter from './routes/users.js'
import auditRouter from './routes/audit.js'
import mediaRouter from './routes/media.js'
import publicRouter from './routes/public.js'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const app = express()
const PORT = process.env.PORT || 4000
const HOST = process.env.HOST || '0.0.0.0'

app.use(helmet({
  contentSecurityPolicy: {
    useDefaults: true,
    directives: {
      defaultSrc: ["'self'"],
      scriptSrc: ["'self'"],
      styleSrc: ["'self'", "'unsafe-inline'"],
      imgSrc: ["'self'", 'data:', 'https:'],
      connectSrc: ["'self'"],
      fontSrc: ["'self'", 'data:'],
      objectSrc: ["'none'"],
      frameAncestors: ["'self'"],
      baseUri: ["'self'"],
      formAction: ["'self'"],
      upgradeInsecureRequests: []
    }
  },
  crossOriginEmbedderPolicy: false
}))
// Whitelist des origines autorisees (CORS)
const ALLOWED_ORIGINS = [
  'https://africa-energy.netlify.app',
  'https://africaenergy.com',
  'https://www.africaenergy.com',
  'http://localhost:5173',
  'http://localhost:5174',
  process.env.FRONTEND_ORIGIN
].filter(Boolean)

app.use(cors({
  origin: (origin, cb) => {
    // Pas d'origin (curl, server-to-server) -> autorise
    if (!origin) return cb(null, true)
    if (ALLOWED_ORIGINS.includes(origin)) return cb(null, true)
    return cb(new Error('CORS: origine non autorisee: ' + origin))
  },
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With'],
  credentials: false
}))
app.use(express.json({ limit: '50kb' }))

// B7 : les fichiers uploades ne sont plus servis en static public.
// En prod, les assets publics passent par /api/public/media/:filename et
// l'acces authentifie reste disponible via /api/media/file/:filename.
// On garde le static uniquement en DEV pour faciliter le developpement.
if (process.env.NODE_ENV !== 'production') {
  app.use('/uploads', express.static(uploadsDir))
}

app.get('/api/health', (_req, res) => res.json({ status: 'ok' }))

app.use('/api/contact', contactRouter)
app.use('/api/auth', authRouter)
app.use('/api/public', publicRouter)
app.use('/api/admin', adminRouter)
app.use('/api/users', usersRouter)
app.use('/api/audit', auditRouter)
app.use('/api/media', mediaRouter)

app.use((_req, res) => res.status(404).json({ error: 'Not found' }))
app.use((err, _req, res, _next) => {
  console.error(err)
  res.status(500).json({ error: 'Erreur serveur' })
})

app.listen(PORT, HOST, () => {
  console.log(`[africa-energy-backend] listening on http://${HOST}:${PORT}`)
})

