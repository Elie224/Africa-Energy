import React from 'react'
import Seo from '../components/Seo.jsx'
import { Link } from 'react-router-dom'

const iconStyle = {
  width: 72,
  height: 72,
  borderRadius: 16,
  background: 'linear-gradient(135deg, var(--ae-orange), var(--ae-gold))',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  color: '#fff',
  fontSize: 34,
  margin: '0 auto 20px',
  boxShadow: '0 8px 22px rgba(243,146,0,0.28)'
}

const Services = () => {
  const products = [
    { icon: 'bi-fuel-pump-diesel', title: 'Gasoil / Diesel', desc: 'Carburant de qualitÃ© pour vÃ©hicules et industries. Disponible en vrac et dÃ©taillÃ©.' },
    { icon: 'bi-fuel-pump', title: 'Essence Super', desc: 'Essence haute performance pour vÃ©hicules particuliers et professionnels.' },
    { icon: 'bi-droplet-fill', title: 'PÃ©trole lampant', desc: 'Pour usages domestiques, Ã©clairage et certaines activitÃ©s industrielles.' },
    { icon: 'bi-fire', title: 'Fuel lourd (HFO)', desc: 'Pour centrales thermiques, cimenteries et industries lourdes.' },
    { icon: 'bi-droplet-half', title: 'Lubrifiants & huiles', desc: 'Gamme complÃ¨te pour automobiles, engins miniers et Ã©quipements industriels.' },
    { icon: 'bi-wind', title: 'Gaz GPL & dÃ©rivÃ©s', desc: 'Gaz propane et butane pour mÃ©nages, restaurants et industries.' }
  ]

  const services = [
    { icon: 'bi-truck', title: 'Livraison rapide', desc: 'Livraison sÃ©curisÃ©e 24/7 sur tous vos sites.' },
    { icon: 'bi-shield-check', title: 'ConformitÃ© SONAP', desc: 'Tous nos produits sont certifiÃ©s et traÃ§ables.' },
    { icon: 'bi-bar-chart-line', title: 'Gestion de stocks$1', desc: 'Suivi en temps rÃ©el et traÃ§abilitÃ© complÃ¨te.' },
    { icon: 'bi-people', title: 'Conseil & accompagnement', desc: 'Expertise sectorielle pour optimiser vos approvisionnements.' }
  ]

  return (
    <>
      <Seo title="Produits et Services" description="Catalogue complet : gasoil, essence super, petrole lampant, fuel lourd HFO, lubrifiants, GPL. Livraison rapide, conformite SONAP, gestion de stocks." />
      <section className='ae-hero' style={{ padding: '80px 0' }}>
        <div className='container text-center'>
          <h1>Produits & Services</h1>
          <p className='mt-3' style={{ fontSize: '1.2rem', opacity: 0.95 }}>
            Une offre complÃ¨te pour rÃ©pondre Ã  tous vos besoins Ã©nergÃ©tiques
          </p>
        </div>
      </section>

      <section className='section-padding'>
        <div className='container'>
          <div className='section-title'>
            <h2>Nos produits</h2>
            <p>Une gamme complÃ¨te de produits pÃ©troliers et dÃ©rivÃ©s, certifiÃ©e SONAP.</p>
          </div>

          <div className='row g-4'>
            {products.map((p, i) => (
              <div key={i} className='col-lg-4 col-md-6'>
                <div className='ae-card h-100 text-center'>
                  <div style={iconStyle}><i className={`bi ${p.icon}`}></i></div>
                  <h4 className='mb-3'>{p.title}</h4>
                  <p className='mb-0'>{p.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className='section-padding' style={{ backgroundColor: 'var(--ae-light)' }}>
        <div className='container'>
          <div className='section-title'>
            <h2>Nos services</h2>
            <p>Au-delÃ  des produits, nous vous accompagnons avec des services sur-mesure.</p>
          </div>

          <div className='row g-4'>
            {services.map((s, i) => (
              <div key={i} className='col-lg-3 col-md-6'>
                <div className='ae-card text-center'>
                  <div className='icon mx-auto'><i className={s.icon}></i></div>
                  <h5>{s.title}</h5>
                  <p className='small'>{s.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className='section-padding text-center'>
        <div className='container'>
          <h2 className='mb-4'>Besoin d'un devis personnalisÃ© ?</h2>
          <Link to='/contact' className='btn btn-ae-primary btn-lg'>
            Demander un devis <i className='bi bi-arrow-right ms-2'></i>
          </Link>
        </div>
      </section>
    </>
  )
}

export default Services




