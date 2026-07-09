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
            Une sociÃ©tÃ© guinÃ©enne engagÃ©e pour lâ€™Ã©nergie de lâ€™Afrique
          </p>
        </div>
      </section>

      <section className="section-padding">
        <div className="container">
          <div className="row align-items-center g-5">
            <div className="col-lg-6">
              <h2 className="mb-4">Africa Energy SAU</h2>
              <p className="lead">
                Africa Energy SAU est une sociÃ©tÃ© guinÃ©enne spÃ©cialisÃ©e dans la distribution
                de produits pÃ©troliers et dÃ©rivÃ©s. ImplantÃ©e Ã  Dixinn Terrasse, Conakry,
                nous servons les entreprises et particuliers depuis 2025.
              </p>
              <p>
                Notre ambition est de faire dâ€™Africa Energy un pilier incontournable du
                secteur Ã©nergÃ©tique guinÃ©en. QualitÃ©, rigueur et Ã©thique guident chacune
                de nos opÃ©rations.
              </p>
            </div>
            <div className="col-lg-6">
              <div className="row g-3">
                <div className="col-6">
                  <div className="ae-card text-center">
                    <i className="bi bi-eye fs-1 mb-3" style={{ color: 'var(--ae-orange)' }}></i>
                    <h5>Notre vision</h5>
                    <p className="small">Devenir lâ€™opÃ©rateur pÃ©trolier de rÃ©fÃ©rence en GuinÃ©e et en Afrique de lâ€™Ouest.</p>
                  </div>
                </div>
                <div className="col-6">
                  <div className="ae-card text-center">
                    <i className="bi bi-bullseye fs-1 mb-3" style={{ color: 'var(--ae-blue)' }}></i>
                    <h5>Notre mission</h5>
                    <p className="small">Assurer un approvisionnement rÃ©gulier, sÃ©curisÃ© et de qualitÃ© sur tout le territoire.</p>
                  </div>
                </div>
                <div className="col-12">
                  <div className="ae-card text-center">
                    <i className="bi bi-heart fs-1 mb-3" style={{ color: 'var(--ae-green)' }}></i>
                    <h5>Nos valeurs</h5>
                    <p className="small mb-0">
                      <strong>IntÃ©gritÃ© Â· Excellence Â· FiabilitÃ© Â· ResponsabilitÃ© Â· Engagement national</strong>
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




