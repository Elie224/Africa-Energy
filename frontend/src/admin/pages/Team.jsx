import React from 'react'
import CrudPage from '../components/CrudPage.jsx'

const Team = () => (
  <CrudPage
    endpoint="/api/admin/team"
    defaults={{ active: 1, order_idx: 0 }}
    columns={[
      { key: 'name', label: 'Nom', render: (i) => <strong>{i.name}</strong> },
      { key: 'role', label: 'Role' },
      { key: 'email', label: 'Email', render: (i) => i.email ? <a href={`mailto:${i.email}`}>{i.email}</a> : '-' },
      { key: 'active', label: 'Actif', render: (i) => i.active ? <span className="status-pill published">Oui</span> : <span className="status-pill archived">Non</span> }
    ]}
    fields={[
      { name: 'name', label: 'Nom complet', required: true },
      { name: 'role', label: 'Role / Poste', required: true },
      { name: 'email', label: 'Email', type: 'email' },
      { name: 'phone', label: 'Telephone' },
      { name: 'photo_url', label: 'Photo (URL)', placeholder: '/uploads/...' },
      { name: 'bio', label: 'Biographie', type: 'textarea', rows: 3, full: true },
      { name: 'order_idx', label: 'Ordre', type: 'number' },
      { name: 'active', label: 'Actif', type: 'checkbox' }
    ]}
  />
)

export default Team
