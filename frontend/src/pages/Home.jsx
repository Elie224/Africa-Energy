import React from 'react'
import { Link } from 'react-router-dom'

const Home = () => {
  return (
    <>
      {/* HERO */}
      <section className="ae-hero">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-lg-7 animate-fadeInUp">
              <span className="badge mb-3 px-3 py-2" style={{ backgroundColor: 'rgba(243, 146, 0, 0.2)', color: '#F39200', fontWeight: 600 }}>
                <i className="bi bi-fuel-pump me-2"></i>Distribution pétrolière depuis 2025
              </span>
              <h1>
                L’énergie qui fait <span className="highlight">avancer</span> l’Afrique
              </h1>
              <p>
                Africa Energy SAU, votre partenaire de confiance en Guinée pour la
                distribution de produits pétroliers, lubrifiants et GPL. Fiabilité,
                rapidité et conformité SONAP.
              </p>
              <div className="d-flex gap-3 flex-wrap">
                <Link to="/contact" className="btn btn-ae-primary">
                  <i className="bi bi-envelope-paper me-2"></i>Demander un devis
                </Link>
                <Link to="/a-propos" className="btn btn-outline-light rounded-pill px-4 py-2">
                  Découvrir l’entreprise <i className="bi bi-arrow-right ms-2"></i>
                </Link>
              </div>
            </div>
            <div className="col-lg-5 d-none d-lg-block text-center">
              <div style={{ fontSize: '180px', opacity: 0.15, color: '#F39200' }}>
                <i className="bi bi-fuel-pump-diesel"></i>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CHIFFRES CLES */}
      <section className="ae-stats">
        <div className="container">
          <div className="row">
            <div className="col-md-3 col-6">
              <div className="stat-item">
                <div className="stat-number">6+</div>
                <div className="stat-label">Produits distribués</div>
              </div>
            </div>
            <div className="col-md-3 col-6">
              <div className="stat-item">
                <div className="stat-number">5+</div>
                <div className="stat-label">Segments clients</div>
              </div>
            </div>
            <div className="col-md-3 col-6">
              <div className="stat-item">
                <div className="stat-number">3</div>
                <div className="stat-label">Partenaires clés</div>
              </div>
            </div>
            <div className="col-md-3 col-6">
              <div className="stat-item">
                <div className="stat-number">2025</div>
                <div className="stat-label">Année de fondation</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* PRODUITS & SERVICES */}
      <section className="section-padding">
        <div className="container">
          <div className="section-title">
            <h2>Notre offre</h2>
            <p>Une gamme complète de produits pétroliers et services adaptés à chaque secteur d’activité.</p>
          </div>

          <div className="row g-4">
            <div className="col-lg-3 col-md-6">
              <div className="ae-card">
                <div className="icon"><i className="bi bi-fuel-pump"></i></div>
                <h4>Carburants</h4>
                <p>Gasoil, essence super, pétrole lampant, fuel lourd HFO. Qualité SONAP garantie.</p>
              </div>
            </div>
            <div className="col-lg-3 col-md-6">
              <div className="ae-card">
                <div className="icon"><i className="bi bi-droplet-half"></i></div>
                <h4>Lubrifiants</h4>
                <p>Huiles et lubrifiants spécialisés pour l’automobile, l’industrie et les mines.</p>
              </div>
            </div>
            <div className="col-lg-3 col-md-6">
              <div className="ae-card">
                <div className="icon"><i className="bi bi-truck"></i></div>
                <h4>Livraison rapide</h4>
                <p>Livraison sécurisée 24/7 sur tous vos sites, y compris en zone Simandou.</p>
              </div>
            </div>
            <div className="col-lg-3 col-md-6">
              <div className="ae-card">
                <div className="icon"><i className="bi bi-bar-chart-line"></i></div>
                <h4>Gestion de stocks$1</h4>
                <p>Traçabilité complète et gestion rigoureuse de vos stocks$1 de carburants.</p>
              </div>
            </div>
          </div>

          <div className="text-center mt-5">
            <Link to="/produits-services" className="btn btn-ae-outline">
              Voir tous nos services <i className="bi bi-arrow-right ms-2"></i>
            </Link>
          </div>
        </div>
      </section>

      {/* POURQUOI NOUS */}
      <section className="section-padding" style={{ backgroundColor: 'var(--ae-light)' }}>
        <div className="container">
          <div className="section-title">
            <h2>Pourquoi Africa Energy ?</h2>
            <p>Quatre piliers font notre force sur le terrain.</p>
          </div>

          <div className="row g-4">
            <div className="col-lg-6">
              <div className="d-flex gap-3 mb-4">
                <div style={{ minWidth: 50, height: 50, background: 'var(--ae-orange)', borderRadius: 12, display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontSize: 24 }}>
                  <i className="bi bi-shield-check"></i>
                </div>
                <div>
                  <h5>Expertise sectorielle reconnue</h5>
                  <p className="text-muted mb-0">Connaissance approfondie du marché guinéen et des exigences du secteur pétrolier.</p>
                </div>
              </div>
              <div className="d-flex gap-3 mb-4">
                <div style={{ minWidth: 50, height: 50, background: 'var(--ae-blue)', borderRadius: 12, display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontSize: 24 }}>
                  <i className="bi bi-file-earmark-check"></i>
                </div>
                <div>
                  <h5>Rigueur administrative & financière</h5>
                  <p className="text-muted mb-0">Normes OHADA irréprochables, conformité SONAP, transparence totale.</p>
                </div>
              </div>
            </div>

            <div className="col-lg-6">
              <div className="d-flex gap-3 mb-4">
                <div style={{ minWidth: 50, height: 50, background: 'var(--ae-green)', borderRadius: 12, display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontSize: 24 }}>
                  <i className="bi bi-truck-front"></i>
                </div>
                <div>
                  <h5>Réseau logistique structuré</h5>
                  <p className="text-muted mb-0">Livraison dans les délais, suivi rigoureux des flux sur tout le territoire.</p>
                </div>
              </div>
              <div className="d-flex gap-3 mb-4">
                <div style={{ minWidth: 50, height: 50, background: 'var(--ae-gold)', borderRadius: 12, display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontSize: 24 }}>
                  <i className="bi bi-hand-thumbs-up"></i>
                </div>
                <div>
                  <h5>Engagement éthique</h5>
                  <p className="text-muted mb-0">Code de conduite strict, relations durables avec clients et partenaires.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTEURS CLIENTS */}
      <section className="section-padding">
        <div className="container">
          <div className="section-title">
            <h2>Secteurs desservis</h2>
            <p>Nous accompagnons les acteurs majeurs de l’économie guinéenne.</p>
          </div>

          <div className="row g-4 text-center">
            <div className="col-lg-3 col-md-6">
              <div className="p-4 h-100" style={{ borderRadius: 12, background: 'linear-gradient(135deg, #0B2A5B, #1E5BB8)', color: 'white' }}>
                <i className="bi bi-gem fs-1 mb-3 d-block" style={{ color: 'var(--ae-orange)' }}></i>
                <h5 className="text-white">Industries & Mines</h5>
                <p className="mb-0" style={{ fontSize: '0.9rem', opacity: 0.9 }}>Simandou, Boké et zones minières</p>
              </div>
            </div>
            <div className="col-lg-3 col-md-6">
              <div className="p-4 h-100" style={{ borderRadius: 12, background: 'linear-gradient(135deg, #F39200, #D4A017)', color: 'white' }}>
                <i className="bi bi-cone-striped fs-1 mb-3 d-block"></i>
                <h5 className="text-white">BTP & Chantiers</h5>
                <p className="mb-0" style={{ fontSize: '0.9rem', opacity: 0.9 }}>Approvisionnement continu des chantiers</p>
              </div>
            </div>
            <div className="col-lg-3 col-md-6">
              <div className="p-4 h-100" style={{ borderRadius: 12, background: 'linear-gradient(135deg, #2E7D32, #4CAF50)', color: 'white' }}>
                <i className="bi bi-building fs-1 mb-3 d-block"></i>
                <h5 className="text-white">Administrations</h5>
                <p className="mb-0" style={{ fontSize: '0.9rem', opacity: 0.9 }}>Marchés publics, conformité totale</p>
              </div>
            </div>
            <div className="col-lg-3 col-md-6">
              <div className="p-4 h-100" style={{ borderRadius: 12, background: 'linear-gradient(135deg, #6B7280, #374151)', color: 'white' }}>
                <i className="bi bi-shop fs-1 mb-3 d-block"></i>
                <h5 className="text-white">Commerce & Particuliers</h5>
                <p className="mb-0" style={{ fontSize: '0.9rem', opacity: 0.9 }}>Stations-service et revendeurs</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA FINAL */}
      <section className="section-padding text-center" style={{ background: 'linear-gradient(135deg, var(--ae-blue-dark), var(--ae-blue))', color: 'white' }}>
        <div className="container">
          <h2 className="text-white mb-3">Prêt à travailler avec nous ?</h2>
          <p className="mb-4" style={{ fontSize: '1.1rem', opacity: 0.9 }}>
            Demandez votre devis personnalisé en moins de 24 h.
          </p>
          <Link to="/contact" className="btn btn-ae-primary btn-lg">
            <i className="bi bi-telephone-fill me-2"></i>Nous contacter
          </Link>
        </div>
      </section>
    </>
  )
}

export default Home
