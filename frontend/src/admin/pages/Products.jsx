import React from 'react'
import CrudPage from '../components/CrudPage.jsx'

const Products = () => (
  <CrudPage
    endpoint="/api/admin/products"
    defaults={{ active: 1, order_idx: 0, category: 'carburant' }}
    columns={[
      { key: 'name', label: 'Nom', render: (i) => <><i className={`bi ${i.icon || 'bi-fuel-pump'} me-2 text-warning`}></i><strong>{i.name}</strong></> },
      { key: 'category', label: 'Categorie' },
      { key: 'order_idx', label: 'Ordre', width: 70 },
      { key: 'active', label: 'Actif', render: (i) => i.active ? <span className="status-pill published">Oui</span> : <span className="status-pill archived">Non</span> }
    ]}
    fields={[
      { name: 'name', label: 'Nom', required: true, full: true },
      { name: 'slug', label: 'Slug', hint: 'Auto-genere si vide' },
      { name: 'category', label: 'Categorie', type: 'select', required: true, options: [
        { value: 'carburant', label: 'Carburant' },
        { value: 'lubrifiant', label: 'Lubrifiant' },
        { value: 'gaz', label: 'Gaz / GPL' },
        { value: 'service', label: 'Service' }
      ] },
      { name: 'icon', label: 'Icone Bootstrap', placeholder: 'bi-fuel-pump-diesel', hint: 'Classe d\'icone Bootstrap Icons' },
      { name: 'description', label: 'Description', type: 'textarea', rows: 3, full: true },
      { name: 'order_idx', label: 'Ordre d\'affichage', type: 'number' },
      { name: 'active', label: 'Actif', type: 'checkbox' }
    ]}
  />
)

export default Products
