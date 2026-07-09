// Client API pour l'admin
const BASE = import.meta.env.VITE_API_URL || ''

const TOKEN_KEY = 'ae_admin_token'

export const getToken = () => localStorage.getItem(TOKEN_KEY)
export const setToken = (t) => localStorage.setItem(TOKEN_KEY, t)
export const clearToken = () => localStorage.removeItem(TOKEN_KEY)

const buildHeaders = (extra = {}, isForm = false) => {
  const h = { ...extra }
  const t = getToken()
  if (t) h['Authorization'] = `Bearer ${t}`
  if (!isForm && !h['Content-Type']) h['Content-Type'] = 'application/json'
  return h
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
  get: (path) => fetch(`${BASE}${path}`, { method: 'GET', headers: buildHeaders() }).then(handle),
  post: (path, body) => fetch(`${BASE}${path}`, { method: 'POST', headers: buildHeaders(), body: JSON.stringify(body || {}) }).then(handle),
  put: (path, body) => fetch(`${BASE}${path}`, { method: 'PUT', headers: buildHeaders(), body: JSON.stringify(body || {}) }).then(handle),
  patch: (path, body) => fetch(`${BASE}${path}`, { method: 'PATCH', headers: buildHeaders(), body: JSON.stringify(body || {}) }).then(handle),
  del: (path) => fetch(`${BASE}${path}`, { method: 'DELETE', headers: buildHeaders() }).then(handle),
  upload: (path, file) => {
    const fd = new FormData()
    fd.append('file', file)
    return fetch(`${BASE}${path}`, { method: 'POST', headers: buildHeaders({}, true), body: fd }).then(handle)
  }
}
