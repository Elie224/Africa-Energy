import { test } from 'node:test'
import assert from 'node:assert/strict'
import { z } from 'zod'

// Reproduit le schema de validation du contact
const contactSchema = z.object({
  nom: z.string().trim().min(2).max(80),
  email: z.string().trim().email().max(120),
  telephone: z.string().trim().regex(/^[+0-9\s().-]{6,}$/, 'Telephone invalide'),
  entreprise: z.string().trim().max(120).optional().default(''),
  produit: z.string().trim().max(80).optional().default(''),
  message: z.string().trim().min(10).max(2000),
  website: z.string().max(0).optional().default('')
})

test('valide un payload complet', () => {
  const r = contactSchema.safeParse({
    nom: 'Jean Dupont',
    email: 'jean@example.com',
    telephone: '+224 612 368 058',
    entreprise: 'Acme',
    produit: 'Gasoil',
    message: 'Bonjour, je souhaite un devis pour 5000 L de gasoil.'
  })
  assert.equal(r.success, true)
})

test('rejette un email invalide', () => {
  const r = contactSchema.safeParse({
    nom: 'Test',
    email: 'pas-un-email',
    telephone: '+224 612 368 058',
    message: 'Un message de plus de 10 caracteres ici.'
  })
  assert.equal(r.success, false)
})

test('rejette un nom trop court', () => {
  const r = contactSchema.safeParse({
    nom: 'A',
    email: 'a@b.com',
    telephone: '+224 612 368 058',
    message: 'Un message de plus de 10 caracteres ici.'
  })
  assert.equal(r.success, false)
})

test('rejette un telephone invalide', () => {
  const r = contactSchema.safeParse({
    nom: 'Test',
    email: 'a@b.com',
    telephone: 'abc',
    message: 'Un message de plus de 10 caracteres ici.'
  })
  assert.equal(r.success, false)
})

test('honeypot website detecte', () => {
  const r = contactSchema.safeParse({
    nom: 'Bot',
    email: 'bot@spam.com',
    telephone: '+224 612 368 058',
    message: 'Je suis un bot, je remplis tous les champs.',
    website: 'http://spam.com'
  })
  // Le schema accepte (max 0 chars = il refuse la cle non vide)
  assert.equal(r.success, false, 'honeypot doit faire echouer la validation')
})

test('honeypot vide = OK', () => {
  const r = contactSchema.safeParse({
    nom: 'Bot',
    email: 'bot@spam.com',
    telephone: '+224 612 368 058',
    message: 'Je suis un humain normal sans spam.',
    website: ''
  })
  assert.equal(r.success, true)
})

test('limites max respectees', () => {
  const r = contactSchema.safeParse({
    nom: 'A'.repeat(81),
    email: 'a@b.com',
    telephone: '+224 612 368 058',
    message: 'court'
  })
  assert.equal(r.success, false)
})
