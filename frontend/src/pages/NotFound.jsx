import React from 'react'
import { Link } from 'react-router-dom'

const NotFound = () => {
  return (
    <section className="section-padding text-center" style={{ minHeight: '70vh', display: 'flex', alignItems: 'center' }}>
      <div className="container">
        <div style={{ fontSize: '120px', color: 'var(--ae-orange)' }}>
          <i className="bi bi-fuel-pump"></i>
        </div>
        <h1 className="display-1 fw-bold" style={{ color: 'var(--ae-blue-dark)' }}>404</h1>
        <h3 className="mb-3">Page introuvable</h3>
        <p className="text-muted mb-4">
          La page que vous recherchez n’existe pas ou a été déplacée.
        </p>
        <Link to="/" className="btn btn-ae-primary btn-lg">
          <i className="bi bi-house me-2"></i>Retour à l’accueil
        </Link>
      </div>
    </section>
  )
}

export default NotFound
