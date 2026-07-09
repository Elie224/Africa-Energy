import React from 'react'
import Seo from '../components/Seo.jsx'
import { Link } from 'react-router-dom'

const Engagements = () => {
  const engagements = [
    { icon: 'bi-shield-fill-check', title: 'ConformitÃ© rÃ©glementaire', desc: 'Respect strict des normes OHADA et rÃ©glementations en vigueur en GuinÃ©e.', color: 'var(--ae-blue)' },
    { icon: 'bi-graph-up-arrow', title: 'TraÃ§abilitÃ© complÃ¨te', desc: 'Chaque produit est traÃ§able de la source jusquâ€™Ã  la livraison finale.', color: 'var(--ae-orange)' },
    { icon: 'bi-lock-fill', title: 'SÃ©curitÃ© des opÃ©rations', desc: 'Personnel formÃ©, Ã©quipements aux normes, protocoles stricts.', color: 'var(--ae-green)' },
    { icon: 'bi-people-fill', title: 'Service client exigeant', desc: 'RÃ©activitÃ©, transparence et suivi personnalisÃ© de chaque client.', color: 'var(--ae-gold)' },
    { icon: 'bi-tree-fill', title: 'Engagement environnemental', desc: 'DÃ©marche responsable pour limiter lâ€™impact environnemental.', color: 'var(--ae-green)' },
    { icon: 'bi-award-fill', title: 'Excellence opÃ©rationnelle', desc: 'AmÃ©lioration continue de nos processus et de notre logistique.', color: 'var(--ae-blue)' }
  ]

  return (
    <>
      <Seo title="Engagements et Conformite" description="Engagements QHSE, conformite SONAP, tracabilite OHADA, securite des operations petrolieres en Guinee." />
      <section className="ae-hero" style={{ padding: '80px 0' }}>
        <div className="container text-center">
          <h1>Nos engagements</h1>
          <p className="mt-3" style={{ fontSize: '1.2rem', opacity: 0.95 }}>
            QualitÃ©, sÃ©curitÃ© et conformitÃ© au cÅ“ur de notre dÃ©marche
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




