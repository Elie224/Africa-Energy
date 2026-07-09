import { z } from 'zod'

export const contactSchema = z.object({
  nom: z.string().trim().min(2).max(80),
  email: z.string().trim().email().max(120),
  telephone: z.string().trim().regex(/^[+0-9\s().-]{6,}$/, 'Telephone invalide'),
  entreprise: z.string().trim().max(120).optional().default(''),
  produit: z.string().trim().max(80).optional().default(''),
  message: z.string().trim().min(10).max(2000),
  // Honeypot : doit rester vide (les bots le remplissent)
  website: z.string().max(0).optional().default('')
})

export const validateContact = (req, res, next) => {
  const parsed = contactSchema.safeParse(req.body)
  if (!parsed.success) {
    return res.status(400).json({
      error: 'Donnees invalides',
      details: parsed.error.flatten().fieldErrors
    })
  }
  req.body = parsed.data
  next()
}
