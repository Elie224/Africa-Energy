import React from 'react'
import CrudPage from '../components/CrudPage.jsx'

const Partners = () => (
  <CrudPage
    endpoint="/api/admin/partners"
    defaults={{ active: 1, order_idx: 0 }}
    columns={[
      { key: 'name', label: 'Nom', render: (i) => <strong>{i.name}</strong> },
      { key: 'type', label: 'Type' },
      { key: 'website', label: 'Site web', render: (i) => i.website ? <a href={i.website} target="_blank" rel="noreferrer">{i.website}</a> : '-' },
      { key: 'active', label: 'Actif', render: (i) => i.active ? <span className="status-pill published">Oui</span> : <span className="status-pill archived">Non</span> }
    ]}
    fields={[
      { name: 'name', label: 'Nom du partenaire', required: true, full: true },
      { name: 'type', label: 'Type', placeholder: 'Institutionnel, Industriel, Commercial...' },
      { name: 'logo_url', label: 'Logo (URL)', placeholder: 'https://... ou /api/public/media/...' },
      { name: 'website', label: 'Site web', type: 'url' },
      { name: 'description', label: 'Description', type: 'textarea', rows: 3, full: true },
      { name: 'order_idx', label: 'Ordre', type: 'number' },
      { name: 'active', label: 'Actif', type: 'checkbox' }
    ]}
  />
)

export default Partners
