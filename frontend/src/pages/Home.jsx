import React from 'react'
import Seo from '../components/Seo.jsx'
import { Link } from 'react-router-dom'
import { useI18n } from '../i18n/I18nContext.jsx'

const Home = () => {
  const { t } = useI18n()
  return (
    <>
      <Seo title={t('pages.home.seoTitle', 'Accueil')} description={t('pages.home.seoDesc', 'Africa Energy SAU, votre partenaire de confiance pour la distribution de produits petroliers en Guinee.')} />
      {/* HERO */}
      <section className="ae-hero">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-lg-7 animate-fadeInUp">
              <span className="badge mb-3 px-3 py-2" style={{ backgroundColor: 'rgba(243, 146, 0, 0.2)', color: '#F39200', fontWeight: 600 }}>
                <i className="bi bi-fuel-pump me-2"></i>{t('pages.home.heroBadge', 'Distribution petroliere depuis 2025')}
              </span>
              <h1>
                {t('pages.home.heroTitle', "L'energie qui fait")} <span className="highlight">{t('pages.home.heroHighlight', 'avancer')}</span> {t('pages.home.heroTail', "l'Afrique")}
              </h1>
              <p>
                {t('pages.home.heroSubtitle', 'Africa Energy SAU, votre partenaire de confiance en Guinee pour la distribution de produits petroliers, lubrifiants et GPL. Fiabilite, rapidite et conformite SONAP.')}
              </p>
              <div className="d-flex gap-3 flex-wrap">
                <Link to="/contact" className="btn btn-ae-primary">
                  <i className="bi bi-envelope-paper me-2"></i>{t('pages.home.ctaQuote', 'Demander un devis')}
                </Link>
                <Link to="/a-propos" className="btn btn-outline-light rounded-pill px-4 py-2">
                  {t('pages.home.ctaDiscover', "Decouvrir l'entreprise")} <i className="bi bi-arrow-right ms-2"></i>
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
                <div className="stat-label">{t('pages.home.kpi1Label', 'Produits distribues')}</div>
              </div>
            </div>
            <div className="col-md-3 col-6">
              <div className="stat-item">
                <div className="stat-number">5+</div>
                <div className="stat-label">{t('pages.home.kpi2Label', 'Segments clients')}</div>
              </div>
            </div>
            <div className="col-md-3 col-6">
              <div className="stat-item">
                <div className="stat-number">3</div>
                <div className="stat-label">{t('pages.home.kpi3Label', 'Partenaires cles')}</div>
              </div>
            </div>
            <div className="col-md-3 col-6">
              <div className="stat-item">
                <div className="stat-number">2025</div>
                <div className="stat-label">{t('pages.home.kpi4Label', 'Annee de fondation')}</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* PRODUITS & SERVICES */}
      <section className="section-padding">
        <div className="container">
          <div className="section-title">
            <h2>{t('pages.home.offerTitle', 'Notre offre')}</h2>
            <p>{t('pages.home.offerSubtitle', 'Une gamme complete de produits petroliers et services adaptes a chaque secteur d\'activite.')}</p>
          </div>

          <div className="row g-4">
            <div className="col-lg-3 col-md-6">
              <div className="ae-card">
                <div className="icon"><i className="bi bi-fuel-pump"></i></div>
                <h4>{t('pages.home.offer1Title', 'Carburants')}</h4>
                <p>{t('pages.home.offer1Desc', 'Gasoil, essence super, petrole lampant, fuel lourd HFO. Qualite SONAP garantie.')}</p>
              </div>
            </div>
            <div className="col-lg-3 col-md-6">
              <div className="ae-card">
                <div className="icon"><i className="bi bi-droplet-half"></i></div>
                <h4>{t('pages.home.offer2Title', 'Lubrifiants')}</h4>
                <p>{t('pages.home.offer2Desc', 'Huiles et lubrifiants specialises pour l\'automobile, l\'industrie et les mines.')}</p>
              </div>
            </div>
            <div className="col-lg-3 col-md-6">
              <div className="ae-card">
                <div className="icon"><i className="bi bi-truck"></i></div>
                <h4>{t('pages.home.offer3Title', 'Livraison rapide')}</h4>
                <p>{t('pages.home.offer3Desc', 'Livraison securisee 24/7 sur tous vos sites, y compris en zone Simandou.')}</p>
              </div>
            </div>
            <div className="col-lg-3 col-md-6">
              <div className="ae-card">
                <div className="icon"><i className="bi bi-bar-chart-line"></i></div>
                <h4>{t('pages.home.offer4Title', 'Gestion de stocks')}</h4>
                <p>{t('pages.home.offer4Desc', 'Tracabilite complete et gestion rigoureuse de vos stocks de carburants.')}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* POURQUOI NOUS */}
      <section className="section-padding" style={{ background: '#F5F7FA' }}>
        <div className="container">
          <div className="section-title">
            <h2>{t('pages.home.whyTitle', 'Pourquoi Africa Energy ?')}</h2>
            <p>{t('pages.home.whySubtitle', 'Quatre piliers font notre force sur le terrain.')}</p>
          </div>

          <div className="row g-4">
            <div className="col-lg-6">
              <div className="d-flex gap-3 mb-4">
                <div style={{ minWidth: 50, height: 50, background: 'var(--ae-orange)', borderRadius: 12, display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontSize: 24 }}>
                  <i className="bi bi-award"></i>
                </div>
                <div>
                  <h5>{t('pages.home.why1Title', 'Expertise sectorielle reconnue')}</h5>
                  <p className="text-muted mb-0">{t('pages.home.why1Desc', 'Connaissance approfondie du marche guineen et des exigences du secteur petrolier.')}</p>
                </div>
              </div>
              <div className="d-flex gap-3 mb-4">
                <div style={{ minWidth: 50, height: 50, background: 'var(--ae-blue)', borderRadius: 12, display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontSize: 24 }}>
                  <i className="bi bi-file-earmark-check"></i>
                </div>
                <div>
                  <h5>{t('pages.home.why2Title', 'Rigueur administrative et financiere')}</h5>
                  <p className="text-muted mb-0">{t('pages.home.why2Desc', 'Normes OHADA irreprochables, conformite SONAP, transparence totale.')}</p>
                </div>
              </div>
            </div>

            <div className="col-lg-6">
              <div className="d-flex gap-3 mb-4">
                <div style={{ minWidth: 50, height: 50, background: 'var(--ae-green)', borderRadius: 12, display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontSize: 24 }}>
                  <i className="bi bi-truck-front"></i>
                </div>
                <div>
                  <h5>{t('pages.home.why3Title', 'Reseau logistique structure')}</h5>
                  <p className="text-muted mb-0">{t('pages.home.why3Desc', 'Livraison dans les delais, suivi rigoureux des flux sur tout le territoire.')}</p>
                </div>
              </div>
              <div className="d-flex gap-3 mb-4">
                <div style={{ minWidth: 50, height: 50, background: 'var(--ae-gold)', borderRadius: 12, display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontSize: 24 }}>
                  <i className="bi bi-hand-thumbs-up"></i>
                </div>
                <div>
                  <h5>{t('pages.home.why4Title', 'Engagement ethique')}</h5>
                  <p className="text-muted mb-0">{t('pages.home.why4Desc', 'Code de conduite strict, relations durables avec clients et partenaires.')}</p>
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
            <h2>{t('pages.home.sectorsTitle', 'Secteurs desservis')}</h2>
            <p>{t('pages.home.sectorsSubtitle', 'Nous accompagnons les acteurs majeurs de l\'economie guineenne.')}</p>
          </div>

          <div className="row g-4 text-center">
            <div className="col-lg-3 col-md-6">
              <div className="p-4 h-100" style={{ borderRadius: 12, background: 'linear-gradient(135deg, #0B2A5B, #1E5BB8)', color: 'white' }}>
                <i className="bi bi-gem fs-1 mb-3 d-block" style={{ color: 'var(--ae-orange)' }}></i>
                <h5 className="text-white">{t('pages.home.sector1', 'Industries et Mines')}</h5>
                <p className="mb-0" style={{ fontSize: '0.9rem', opacity: 0.9 }}>{t('pages.home.sector1Desc', 'Simandou, Boke et zones minieres')}</p>
              </div>
            </div>
            <div className="col-lg-3 col-md-6">
              <div className="p-4 h-100" style={{ borderRadius: 12, background: 'linear-gradient(135deg, #F39200, #D4A017)', color: 'white' }}>
                <i className="bi bi-cone-striped fs-1 mb-3 d-block"></i>
                <h5 className="text-white">{t('pages.home.sector2', 'BTP et Chantiers')}</h5>
                <p className="mb-0" style={{ fontSize: '0.9rem', opacity: 0.9 }}>{t('pages.home.sector2Desc', 'Approvisionnement continu des chantiers')}</p>
              </div>
            </div>
            <div className="col-lg-3 col-md-6">
              <div className="p-4 h-100" style={{ borderRadius: 12, background: 'linear-gradient(135deg, #2E7D32, #4CAF50)', color: 'white' }}>
                <i className="bi bi-building fs-1 mb-3 d-block"></i>
                <h5 className="text-white">{t('pages.home.sector3', 'Administrations')}</h5>
                <p className="mb-0" style={{ fontSize: '0.9rem', opacity: 0.9 }}>{t('pages.home.sector3Desc', 'Marches publics, conformite totale')}</p>
              </div>
            </div>
            <div className="col-lg-3 col-md-6">
              <div className="p-4 h-100" style={{ borderRadius: 12, background: 'linear-gradient(135deg, #6B7280, #374151)', color: 'white' }}>
                <i className="bi bi-shop fs-1 mb-3 d-block"></i>
                <h5 className="text-white">{t('pages.home.sector4', 'Commerce et Particuliers')}</h5>
                <p className="mb-0" style={{ fontSize: '0.9rem', opacity: 0.9 }}>{t('pages.home.sector4Desc', 'Stations-service et revendeurs')}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA FINAL */}
      <section className="section-padding text-center" style={{ background: 'linear-gradient(135deg, var(--ae-blue-dark), var(--ae-blue))', color: 'white' }}>
        <div className="container">
          <h2 className="text-white mb-3">{t('pages.home.ctaTitle', 'Pret a travailler avec nous ?')}</h2>
          <p className="mb-4" style={{ fontSize: '1.1rem', opacity: 0.9 }}>
            {t('pages.home.ctaSubtitle', 'Demandez votre devis personnalise en moins de 24 h.')}
          </p>
          <Link to="/contact" className="btn btn-ae-primary btn-lg">
            <i className="bi bi-telephone-fill me-2"></i>{t('pages.home.ctaContact', 'Nous contacter')}
          </Link>
        </div>
      </section>
    </>
  )
}

export default Home
