import React, { useEffect, useState } from 'react'
import CrudPage from '../components/CrudPage.jsx'
import { api } from '../lib/api.js'

const fmt = (ts) => ts ? new Date(ts).toLocaleString('fr-FR', { dateStyle: 'short', timeStyle: 'short' }) : '-'

const News = () => {
  const [images, setImages] = useState([])
  useEffect(() => { api.get('/api/media').then(({ items }) => setImages(items)).catch(() => {}) }, [])

  return (
    <CrudPage
      endpoint="/api/admin/news"
      defaults={{ status: 'draft' }}
      columns={[
        { key: 'title', label: 'Titre', render: (i) => <strong>{i.title}</strong> },
        { key: 'status', label: 'Statut', render: (i) => <span className={`status-pill ${i.status}`}>{i.status}</span> },
        { key: 'published_at', label: 'Publication', render: (i) => fmt(i.published_at) }
      ]}
      fields={[
        { name: 'title', label: 'Titre', required: true, full: true },
        { name: 'slug', label: 'Slug', hint: 'Auto-genere si vide' },
        { name: 'excerpt', label: 'Chapô', full: true },
        { name: 'content', label: 'Contenu', type: 'textarea', rows: 8, full: true },
        { name: 'image_url', label: 'Image (URL)', placeholder: '/uploads/...' },
        { name: 'status', label: 'Statut', type: 'select', required: true, options: [
          { value: 'draft', label: 'Brouillon' },
          { value: 'published', label: 'Publie' }
        ]}
      ]}
    />
  )
}

export default News
