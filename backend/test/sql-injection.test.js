import { test } from 'node:test'
import assert from 'node:assert/strict'
import { z } from 'zod'
import { readFileSync } from 'node:fs'
import { resolve } from 'node:path'

const contactSchema = z.object({
  nom: z.string().trim().min(2).max(80),
  email: z.string().trim().email().max(120),
  telephone: z.string().trim().regex(/^[+0-9\s().-]{6,}$/, 'Telephone invalide'),
  message: z.string().trim().min(10).max(2000)
})

// Payloads d'injection SQL classiques
const SQL_INJECTIONS = [
  "'; DROP TABLE users; --",
  "' OR '1'='1",
  "' OR 1=1--",
  "admin'--",
  "' UNION SELECT * FROM users--",
  "1' OR '1'='1",
  "'; DELETE FROM leads WHERE '1'='1",
  "' OR SLEEP(5)--",
  '"; DROP TABLE users; --',
  "'; EXEC xp_cmdshell('dir'); --"
]

test('contact validation : les injections SQL restent des strings (pas executees)', () => {
  for (const payload of SQL_INJECTIONS) {
    const r = contactSchema.safeParse({
      nom: payload,
      email: 'ok@test.com',
      telephone: '+224 612 368 058',
      message: 'Message valide de plus de 10 caracteres'
    })
    // Important : la string est preservee telle quelle, jamais executee comme SQL.
    // C est la requete parametree (db.prepare("... ?").run(value)) qui protege.
    if (r.success) {
      assert.equal(typeof r.data.nom, 'string')
      assert.equal(r.data.nom, payload, 'la string est preservee intacte')
    }
  }
})

test('les requetes SQL des routes utilisent des parametres (pas d interpolation directe)', () => {
  const files = [
    'src/routes/contact.js',
    'src/routes/auth.js',
    'src/routes/admin.js',
    'src/routes/public.js',
    'src/routes/audit.js',
    'src/routes/media.js',
    'src/routes/users.js'
  ]
  for (const f of files) {
    const src = readFileSync(resolve(f), 'utf8')
    // Recherche de patterns dangereux : interpolation directe de req.body/req.query/req.params
    // dans une requete SQL sans passer par un placeholder ?
    const dangerPatterns = [
      /db\.prepare\([^)]*\$\{req\.(body|query|params)/,
      /db\.exec\([^)]*\+[^)]*req\./
    ]
    for (const pat of dangerPatterns) {
      assert.equal(pat.test(src), false, 'Pattern dangereux detecte dans ' + f + ' : ' + pat)
    }
  }
})

test('le schema zod limite la longueur des inputs (anti-DoS)', () => {
  // 2001 chars -> doit etre rejete par max(2000)
  const huge = 'a'.repeat(2001)
  const r = contactSchema.safeParse({
    nom: 'Test',
    email: 'a@b.com',
    telephone: '+224 612 368 058',
    message: huge
  })
  assert.equal(r.success, false, 'un message de 2001 chars doit etre rejete (max 2000)')
})

test('le schema zod accepte 2000 chars exactement', () => {
  const ok = 'a'.repeat(2000)
  const r = contactSchema.safeParse({
    nom: 'Test',
    email: 'a@b.com',
    telephone: '+224 612 368 058',
    message: ok
  })
  assert.equal(r.success, true, 'un message de 2000 chars est la limite max')
})
