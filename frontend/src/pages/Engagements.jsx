import React from 'react'
import { Link } from 'react-router-dom'

const Engagements = () => {
  const engagements = [
    { icon: 'bi-shield-fill-check', title: 'Conformité réglementaire', desc: 'Respect strict des normes OHADA et réglementations en vigueur en Guinée.', color: 'var(--ae-blue)' },
    { icon: 'bi-graph-up-arrow', title: 'Traçabilité complète', desc: 'Chaque produit est traçable de la source jusqu’à la livraison finale.', color: 'var(--ae-orange)' },
    { icon: 'bi-lock-fill', title: 'Sécurité des opérations', desc: 'Personnel formé, équipements aux normes, protocoles stricts.', color: 'var(--ae-green)' },
    { icon: 'bi-people-fill', title: 'Service client exigeant', desc: 'Réactivité, transparence et suivi personnalisé de chaque client.', color: 'var(--ae-gold)' },
    { icon: 'bi-tree-fill', title: 'Engagement environnemental', desc: 'Démarche responsable pour limiter l’impact environnemental.', color: 'var(--ae-green)' },
    { icon: 'bi-award-fill', title: 'Excellence opérationnelle', desc: 'Amélioration continue de nos processus et de notre logistique.', color: 'var(--ae-blue)' }
  ]

  return (
    <>
      <section className="ae-hero" style={{ padding: '80px 0' }}>
        <div className="container text-center">
          <h1>Nos engagements</h1>
          <p className="mt-3" style={{ fontSize: '1.2rem', opacity: 0.95 }}>
            Qualité, sécurité et conformité au cœur de notre démarche
          </p>
        </div>
      </section>

      <section className="section-padding">
        <div className="container">
          <div className="row g-4">
            {engagements.map((e, i) => (
              <div key={i} className="col-lg-4 col-md-6">
                <div className="ae-card">
                  <div className="icon" style={{ background: e.color }}>
                    <i className={`bi ${e.icon}`}></i>
                  </div>
                  <h4>{e.title}</h4>
                  <p>{e.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section-padding text-center" style={{ backgroundColor: 'var(--ae-light)' }}>
        <div className="container">
          <h2 className="mb-4">Une question sur nos engagements ?</h2>
          <Link to="/contact" className="btn btn-ae-primary btn-lg">Contactez-nous</Link>
        </div>
      </section>
    </>
  )
}

export default Engagements
