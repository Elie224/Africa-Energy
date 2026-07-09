import { Router } from 'express'
import rateLimit from 'express-rate-limit'
import { validateContact } from '../middleware/validate.js'
import { sendContactEmail } from '../config/mail.js'

const router = Router()

// 5 requetes / 15 min / IP (anti-spam)
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 5,
  standardHeaders: true,
  legacyHeaders: false,
  message: { error: 'Trop de demandes. Reessayez dans 15 minutes.' }
})

router.post('/', limiter, validateContact, async (req, res) => {
  // Honeypot : si le champ "website" est rempli, on repond OK sans rien faire
  if (req.body.website) {
    return res.json({ ok: true, queued: false })
  }
  try {
    const result = await sendContactEmail(req.body)
    res.json({ ok: true, queued: result.queued })
  } catch (err) {
    console.error('[contact] send failed:', err.message)
    res.status(502).json({ error: 'Envoi impossible. Reessayez plus tard.' })
  }
})

export default router
