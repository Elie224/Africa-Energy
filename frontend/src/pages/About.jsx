import React from 'react'
import Seo from '../components/Seo.jsx'
import { Link } from 'react-router-dom'

const About = () => {
  return (
    <>
      <Seo title="A propos" description="Decouvrez Africa Energy SAU : histoire, mission, valeurs, ancrage en Guinee et ambition panafricaine dans la distribution petroliere." />
      <section className="ae-hero" style={{ padding: '80px 0' }}>
        <div className="container text-center">
          <h1>Qui sommes-nous ?</h1>
          <p className="mt-3" style={{ fontSize: '1.2rem', opacity: 0.95 }}>
            Une société guinéenne engagée pour lâ€™énergie de lâ€™Afrique
          </p>
        </div>
      </section>

      <section className="section-padding">
        <div className="container">
          <div className="row align-items-center g-5">
            <div className="col-lg-6">
              <h2 className="mb-4">Africa Energy SAU</h2>
              <p className="lead">
                Africa Energy SAU est une société guinéenne spécialisée dans la distribution
                de produits pétroliers et dérivés. Implantée à Dixinn Terrasse, Conakry,
                nous servons les entreprises et particuliers depuis 2025.
              </p>
              <p>
                Notre ambition est de faire dâ€™Africa Energy un pilier incontournable du
                secteur énergétique guinéen. Qualité, rigueur et éthique guident chacune
                de nos opérations.
              </p>
            </div>
            <div className="col-lg-6">
              <div className="row g-3">
                <div className="col-6">
                  <div className="ae-card text-center">
                    <i className="bi bi-eye fs-1 mb-3" style={{ color: 'var(--ae-orange)' }}></i>
                    <h5>Notre vision</h5>
                    <p className="small">Devenir lâ€™opérateur pétrolier de référence en Guinée et en Afrique de lâ€™Ouest.</p>
                  </div>
                </div>
                <div className="col-6">
                  <div className="ae-card text-center">
                    <i className="bi bi-bullseye fs-1 mb-3" style={{ color: 'var(--ae-blue)' }}></i>
                    <h5>Notre mission</h5>
                    <p className="small">Assurer un approvisionnement régulier, sécurisé et de qualité sur tout le territoire.</p>
                  </div>
                </div>
                <div className="col-12">
                  <div className="ae-card text-center">
                    <i className="bi bi-heart fs-1 mb-3" style={{ color: 'var(--ae-green)' }}></i>
                    <h5>Nos valeurs</h5>
                    <p className="small mb-0">
                      <strong>Intégrité · Excellence · Fiabilité · Responsabilité · Engagement national</strong>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section-padding" style={{ backgroundColor: 'var(--ae-light)' }}>
        <div className="container text-center">
          <Link to="/contact" className="btn btn-ae-primary btn-lg">
            <i className="bi bi-envelope me-2"></i>Discutons de votre projet
          </Link>
        </div>
      </section>
    </>
  )
}

export default About




