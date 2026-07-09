import 'dotenv/config'
import express from 'express'
import cors from 'cors'
import helmet from 'helmet'
import contactRouter from './routes/contact.js'

const app = express()
const PORT = process.env.PORT || 4000

// Securite HTTP (headers, CSP, HSTS, etc.)
app.use(helmet())

// CORS limite au frontend autorise
app.use(cors({
  origin: process.env.FRONTEND_ORIGIN || 'http://localhost:5173',
  methods: ['GET', 'POST'],
  credentials: false
}))

// Body parser
app.use(express.json({ limit: '20kb' }))

// Sante
app.get('/api/health', (_req, res) => res.json({ status: 'ok' }))

// Routes metier
app.use('/api/contact', contactRouter)

// 404
app.use((_req, res) => res.status(404).json({ error: 'Not found' }))

// Erreur globale
app.use((err, _req, res, _next) => {
  console.error(err)
  res.status(500).json({ error: 'Erreur serveur' })
})

app.listen(PORT, () => {
  console.log(`[africa-energy-backend] listening on http://localhost:${PORT}`)
})
