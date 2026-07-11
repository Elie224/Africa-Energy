import { apiUrl } from '../../lib/apiBase.js'

const TOKEN_KEY = 'ae_admin_token'
const REFRESH_KEY = 'ae_admin_refresh'

// F1 : utiliser sessionStorage pour le access token (perdu a la fermeture)
// et localStorage pour le refresh token (survit a la fermeture pour le confort UX)
export const getToken = () => sessionStorage.getItem(TOKEN_KEY) || localStorage.getItem(TOKEN_KEY)
export const setToken = (t) => { sessionStorage.setItem(TOKEN_KEY, t); localStorage.setItem(TOKEN_KEY, t) }
export const clearToken = () => { sessionStorage.removeItem(TOKEN_KEY); localStorage.removeItem(TOKEN_KEY) }

export const getRefreshToken = () => localStorage.getItem(REFRESH_KEY)
export const setRefreshToken = (t) => localStorage.setItem(REFRESH_KEY, t)
export const clearRefreshToken = () => localStorage.removeItem(REFRESH_KEY)

const buildHeaders = (extra = {}, isForm = false) => {
  const h = { ...extra }
  const t = getToken()
  if (t) h['Authorization'] = `Bearer ${t}`
  if (!isForm && !h['Content-Type']) h['Content-Type'] = 'application/json'
  return h
}

const TIMEOUT_MS = 15000
const withTimeout = (promise) => {
  const ctrl = new AbortController()
  const t = setTimeout(() => ctrl.abort(), TIMEOUT_MS)
  return promise.finally(() => clearTimeout(t))
}

const handle = async (res) => {
  if (res.status === 204) return null
  const data = res.headers.get('content-type')?.includes('json') ? await res.json() : await res.text()
  if (!res.ok) {
    const msg = (data && data.error) || res.statusText || 'Erreur'
    const err = new Error(msg)
    err.status = res.status
    err.data = data
    throw err
  }
  return data
}

export const api = {
  get: (path) => withTimeout(fetch(apiUrl(path), { method: 'GET', headers: buildHeaders() })).then(handle),
  post: (path, body) => withTimeout(fetch(apiUrl(path), { method: 'POST', headers: buildHeaders(), body: JSON.stringify(body || {}) })).then(handle),
  put: (path, body) => withTimeout(fetch(apiUrl(path), { method: 'PUT', headers: buildHeaders(), body: JSON.stringify(body || {}) })).then(handle),
  patch: (path, body) => withTimeout(fetch(apiUrl(path), { method: 'PATCH', headers: buildHeaders(), body: JSON.stringify(body || {}) })).then(handle),
  del: (path) => withTimeout(fetch(apiUrl(path), { method: 'DELETE', headers: buildHeaders() })).then(handle),
  upload: (path, file) => {
    const fd = new FormData()
    fd.append('file', file)
    return withTimeout(fetch(apiUrl(path), { method: 'POST', headers: buildHeaders({}, true), body: fd })).then(handle)
  }
}
