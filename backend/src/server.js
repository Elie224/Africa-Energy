import 'dotenv/config'
import express from 'express'
import cors from 'cors'
import helmet from 'helmet'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import './db/index.js'
import contactRouter from './routes/contact.js'
import authRouter from './routes/auth.js'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const app = express()
const PORT = process.env.PORT || 4000

app.use(helmet({
  contentSecurityPolicy: false // admin + public servis separemment
}))

app.use(cors({
  origin: process.env.FRONTEND_ORIGIN || 'http://localhost:5173',
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
  credentials: false
}))

app.use(express.json({ limit: '50kb' }))

// Fichiers uploades (mediatheque)
app.use('/uploads', express.static(path.resolve(__dirname, '../uploads')))

app.get('/api/health', (_req, res) => res.json({ status: 'ok' }))

// Public
app.use('/api/contact', contactRouter)

// Admin : auth
app.use('/api/auth', authRouter)

// 404 + erreurs
app.use((_req, res) => res.status(404).json({ error: 'Not found' }))
app.use((err, _req, res, _next) => {
  console.error(err)
  res.status(500).json({ error: 'Erreur serveur' })
})

app.listen(PORT, () => {
  console.log(`[africa-energy-backend] listening on http://localhost:${PORT}`)
})
