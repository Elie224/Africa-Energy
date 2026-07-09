import React from 'react'
import CrudPage from '../components/CrudPage.jsx'

const fmt = (ts) => ts ? new Date(ts).toLocaleString('fr-FR', { dateStyle: 'short', timeStyle: 'short' }) : '-'

const Events = () => (
  <CrudPage
    endpoint="/api/admin/events"
    columns={[
      { key: 'title', label: 'Titre', render: (i) => <strong>{i.title}</strong> },
      { key: 'location', label: 'Lieu' },
      { key: 'start_at', label: 'Debut', render: (i) => fmt(i.start_at) }
    ]}
    fields={[
      { name: 'title', label: 'Titre', required: true, full: true },
      { name: 'description', label: 'Description', type: 'textarea', rows: 3, full: true },
      { name: 'location', label: 'Lieu' },
      { name: 'start_at', label: 'Date de debut (timestamp ms ou ISO)', required: true, placeholder: '1735689600000 ou 2025-01-15T09:00:00Z' },
      { name: 'end_at', label: 'Date de fin (optionnel)' }
    ]}
    transform={(b) => ({
      ...b,
      start_at: parseTs(b.start_at),
      end_at: b.end_at ? parseTs(b.end_at) : null
    })}
  />
)

const parseTs = (v) => {
  if (typeof v === 'number') return v
  if (!v) return null
  const n = Number(v)
  if (!Number.isNaN(n) && n > 1e9) return n
  const d = new Date(v)
  return d.getTime() || null
}

export default Events
