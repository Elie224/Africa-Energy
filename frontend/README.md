# Africa Energy SAU — Site Web

Site institutionnel d'Africa Energy SAU (Distribution petroliere, Guinee).
Frontend React (Vite) + Backend Node/Express + SQLite.

## Stack technique

- **Frontend** : React 18, Vite 5, React Router 6, Bootstrap 5, Bootstrap Icons
- **Backend** : Node 22 (natif `node:sqlite`), Express 4, Helmet 8, Zod 3
- **Auth** : JWT 1h + refresh token 7j (rotation), 2FA TOTP, bcryptjs cost 12
- **i18n** : FR + EN via JSON, detection auto navigateur, persistance localStorage
- **DevOps** : Docker Compose (web + api), nginx, GitHub Actions CI

## Demarrage rapide (dev)

```bash
# Terminal 1 : backend
cd backend
cp .env.example .env       # ajuster SMTP/JWT_SECRET
npm install
npm run seed               # cree le super-admin (voir .env)
npm run dev                # http://localhost:4000

# Terminal 2 : frontend
cd frontend
npm install
npm run dev                # http://localhost:5173
```

## Demarrage rapide (prod)

```bash
docker compose up -d --build
# Frontend : http://localhost:8080
# Backend  : http://localhost:4000 (interne)
```

Voir `frontend/nginx-prod.conf` pour la config nginx production (TLS + reverse-proxy + HSTS).

## Variables d'environnement (backend `.env`)

| Variable | Description | Defaut |
|---|---|---|
| `PORT` | Port HTTP | `4000` |
| `FRONTEND_ORIGIN` | Origine CORS | `http://localhost:5173` |
| `JWT_SECRET` | Secret JWT (>= 48 chars) — **OBLIGATOIRE en prod** | aléatoire en dev |
| `DB_PATH` | Chemin SQLite | `backend/data/africa-energy.db` |
| `SMTP_HOST/USER/PASS/PORT/SECURE` | Config SMTP pour l'envoi email | - |
| `CONTACT_TO` | Destinataire des demandes de contact | `africaenergysau@gmail.com` |
| `SEED_ADMIN_EMAIL/PASSWORD/NAME` | Super-admin cree au 1er seed | - |

> **Important** : sans `JWT_SECRET` en production, le backend refuse de demarrer (exit 1).

## Tests

```bash
# Frontend (Vitest + jsdom)
cd frontend
npm test                    # execution unique
npm run test:watch          # mode watch

# Backend (node:test natif)
cd backend
npm test
```

## CI / CD

`.github/workflows/ci.yml` execute a chaque push / PR sur `main` :
- Backend : `npm ci` + tests + boot smoke (`/api/health`)
- Frontend : `npm ci` + tests + build + artifact

## Structure du repo

```
.
+- frontend/         # React + Vite
|  +- src/
|  |  +- pages/      # Pages publiques
|  |  +- admin/      # Espace admin (leads, news, team, etc.)
|  |  +- components/ # Composants partages (Navbar, Footer, Seo, CookieBanner)
|  |  +- i18n/       # Dictionnaires FR/EN
|  |  +- data/       # Donnees statiques (team.json)
|  |  +- __tests__/  # Tests Vitest
|  +- vitest.config.js
|  +- vite.config.js
|  +- nginx.conf         # Dev (HMR-friendly)
|  +- nginx-prod.conf    # Prod (TLS + reverse proxy)
+- backend/          # Node + Express
|  +- src/
|  |  +- config/     # auth.js (JWT + 2FA), mail.js
|  |  +- routes/     # auth, contact, admin, public, audit, media, users
|  |  +- middleware/ # auth (RBAC), validate (Zod)
|  |  +- db/         # index.js (schema), seed.js
|  |  +- util/       # crud.js (factory CRUD)
|  +- test/          # Tests node:test
+- .github/workflows/ci.yml
+- docker-compose.yml
+- .gitignore
```

## Securite

Voir `frontend/src/components/Seo.jsx` (headers) et `backend/src/server.js` (helmet + CSP).

Points cles :
- JWT 1h + refresh token rotation (revocation)
- 2FA TOTP obligatoire recommande
- Account lockout apres 5 echecs
- Helmet CSP stricte
- Anti-XSS upload (whitelist MIME, pas de SVG)
- /uploads protege par auth en prod
- Anti-injection formule CSV
- Honeypot anti-spam sur le formulaire contact
- Validation Zod cote backend

## i18n

- `frontend/src/i18n/fr.json` et `en.json` : 322 cles
- Detection : localStorage > navigator.language > fr
- Cle absente en EN : fallback FR puis placeholder `[key]` en dev

## Deploiement production

1. **Certificats TLS** : Let's Encrypt via certbot, stocker dans `/etc/ssl/`
2. **DNS** : `africaenergy.com` et `www.africaenergy.com` pointent vers le serveur
3. **Env** : `cp backend/.env.example backend/.env` + remplir `JWT_SECRET`, `SMTP_*`
4. **Premier demarrage** : `docker compose up -d` puis `docker compose exec api npm run seed`
5. **Connexion admin** : `https://africaenergy.com/admin` (credentials du `.env`)
6. **Activer 2FA** : obligatoire apres la 1ere connexion
