const rawBase = (import.meta.env.VITE_API_URL || '').trim()

export const apiBase = rawBase.replace(/\/+$/, '')

export const apiUrl = (path = '') => {
  const normalizedPath = path.startsWith('/') ? path : `/${path}`
  return `${apiBase}${normalizedPath}`
}

export const assetUrl = (value = '') => {
  if (!value || typeof value !== 'string') return value
  if (/^(?:https?:)?\/\//i.test(value) || value.startsWith('data:') || value.startsWith('blob:')) return value
  const normalizedValue = value.startsWith('/') ? value : `/${value}`
  const legacyUploadMatch = normalizedValue.match(/^\/uploads\/([^/?#]+)$/i)
  if (legacyUploadMatch) return apiUrl(`/api/public/media/${legacyUploadMatch[1]}`)
  return apiUrl(normalizedValue)
}
