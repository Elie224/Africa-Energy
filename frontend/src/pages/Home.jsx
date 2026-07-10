import React from 'react'
import Seo from '../components/Seo.jsx'
import { Link } from 'react-router-dom'
import { useI18n } from '../i18n/I18nContext.jsx'

const Home = () => {
  const { t } = useI18n()
  return (
    <>
      <Seo title={t('pages.home.seoTitle')} description={t('pages.home.seoDesc')} />
      {/* HERO */}
      <section className="ae-hero">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-lg-7 animate-fadeInUp">
              <span className="badge mb-3 px-3 py-2" style={{ backgroundColor: 'rgba(243, 146, 0, 0.2)', color: '#F39200', fontWeight: 600 }}>
                <i className="bi bi-fuel-pump me-2"></i>{t('pages.home.heroBadge')}
              </span>
              <h1>
                {t('pages.home.heroTitle')} <span className="highlight">{t('pages.home.heroHighlight')}</span> {t('pages.home.heroTail', "l'Afrique")}
              </h1>
              <p>
                {t('pages.home.heroSubtitle')}
              </p>
              <div className="d-flex gap-3 flex-wrap">
                <Link to="/contact" className="btn btn-ae-primary">
                  <i className="bi bi-envelope-paper me-2"></i>{t('pages.home.ctaQuote')}
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
                <div className="stat-label">{t('pages.home.kpi1Label')}</div>
              </div>
            </div>
            <div className="col-md-3 col-6">
              <div className="stat-item">
                <div className="stat-number">5+</div>
                <div className="stat-label">{t('pages.home.kpi2Label')}</div>
              </div>
            </div>
            <div className="col-md-3 col-6">
              <div className="stat-item">
                <div className="stat-number">3</div>
                <div className="stat-label">{t('pages.home.kpi3Label')}</div>
              </div>
            </div>
            <div className="col-md-3 col-6">
              <div className="stat-item">
                <div className="stat-number">2025</div>
                <div className="stat-label">{t('pages.home.kpi4Label')}</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* PRODUITS & SERVICES */}
      <section className="section-padding">
        <div className="container">
          <div className="section-title">
            <h2>{t('pages.home.offerTitle')}</h2>
            <p>{t('pages.home.offerSubtitle', 'Une gamme complete de produits petroliers et services adaptes a chaque secteur d\'activite.')}</p>
          </div>

          <div className="row g-4">
            <div className="col-lg-3 col-md-6">
              <div className="ae-card">
                <div className="icon"><i className="bi bi-fuel-pump"></i></div>
                <h4>{t('pages.home.offer1Title')}</h4>
                <p>{t('pages.home.offer1Desc')}</p>
              </div>
            </div>
            <div className="col-lg-3 col-md-6">
              <div className="ae-card">
                <div className="icon"><i className="bi bi-droplet-half"></i></div>
                <h4>{t('pages.home.offer2Title')}</h4>
                <p>{t('pages.home.offer2Desc', 'Huiles et lubrifiants specialises pour l\'automobile, l\'industrie et les mines.')}</p>
              </div>
            </div>
            <div className="col-lg-3 col-md-6">
              <div className="ae-card">
                <div className="icon"><i className="bi bi-truck"></i></div>
                <h4>{t('pages.home.offer3Title')}</h4>
                <p>{t('pages.home.offer3Desc')}</p>
              </div>
            </div>
            <div className="col-lg-3 col-md-6">
              <div className="ae-card">
                <div className="icon"><i className="bi bi-bar-chart-line"></i></div>
                <h4>{t('pages.home.offer4Title')}</h4>
                <p>{t('pages.home.offer4Desc')}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* POURQUOI NOUS */}
      <section className="section-padding" style={{ background: '#F5F7FA' }}>
        <div className="container">
          <div className="section-title">
            <h2>{t('pages.home.whyTitle')}</h2>
            <p>{t('pages.home.whySubtitle')}</p>
          </div>

          <div className="row g-4">
            <div className="col-lg-6">
              <div className="d-flex gap-3 mb-4">
                <div style={{ minWidth: 50, height: 50, background: 'var(--ae-orange)', borderRadius: 12, display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontSize: 24 }}>
                  <i className="bi bi-award"></i>
                </div>
                <div>
                  <h5>{t('pages.home.why1Title')}</h5>
                  <p className="text-muted mb-0">{t('pages.home.why1Desc')}</p>
                </div>
              </div>
              <div className="d-flex gap-3 mb-4">
                <div style={{ minWidth: 50, height: 50, background: 'var(--ae-blue)', borderRadius: 12, display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontSize: 24 }}>
                  <i className="bi bi-file-earmark-check"></i>
                </div>
                <div>
                  <h5>{t('pages.home.why2Title')}</h5>
                  <p className="text-muted mb-0">{t('pages.home.why2Desc')}</p>
                </div>
              </div>
            </div>

            <div className="col-lg-6">
              <div className="d-flex gap-3 mb-4">
                <div style={{ minWidth: 50, height: 50, background: 'var(--ae-green)', borderRadius: 12, display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontSize: 24 }}>
                  <i className="bi bi-truck-front"></i>
                </div>
                <div>
                  <h5>{t('pages.home.why3Title')}</h5>
                  <p className="text-muted mb-0">{t('pages.home.why3Desc')}</p>
                </div>
              </div>
              <div className="d-flex gap-3 mb-4">
                <div style={{ minWidth: 50, height: 50, background: 'var(--ae-gold)', borderRadius: 12, display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontSize: 24 }}>
                  <i className="bi bi-hand-thumbs-up"></i>
                </div>
                <div>
                  <h5>{t('pages.home.why4Title')}</h5>
                  <p className="text-muted mb-0">{t('pages.home.why4Desc')}</p>
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
            <h2>{t('pages.home.sectorsTitle')}</h2>
            <p>{t('pages.home.sectorsSubtitle', 'Nous accompagnons les acteurs majeurs de l\'economie guineenne.')}</p>
          </div>

          <div className="row g-4 text-center">
            <div className="col-lg-3 col-md-6">
              <div className="p-4 h-100" style={{ borderRadius: 12, background: 'linear-gradient(135deg, #0B2A5B, #1E5BB8)', color: 'white' }}>
                <i className="bi bi-gem fs-1 mb-3 d-block" style={{ color: 'var(--ae-orange)' }}></i>
                <h5 className="text-white">{t('pages.home.sector1')}</h5>
                <p className="mb-0" style={{ fontSize: '0.9rem', opacity: 0.9 }}>{t('pages.home.sector1Desc')}</p>
              </div>
            </div>
            <div className="col-lg-3 col-md-6">
              <div className="p-4 h-100" style={{ borderRadius: 12, background: 'linear-gradient(135deg, #F39200, #D4A017)', color: 'white' }}>
                <i className="bi bi-cone-striped fs-1 mb-3 d-block"></i>
                <h5 className="text-white">{t('pages.home.sector2')}</h5>
                <p className="mb-0" style={{ fontSize: '0.9rem', opacity: 0.9 }}>{t('pages.home.sector2Desc')}</p>
              </div>
            </div>
            <div className="col-lg-3 col-md-6">
              <div className="p-4 h-100" style={{ borderRadius: 12, background: 'linear-gradient(135deg, #2E7D32, #4CAF50)', color: 'white' }}>
                <i className="bi bi-building fs-1 mb-3 d-block"></i>
                <h5 className="text-white">{t('pages.home.sector3')}</h5>
                <p className="mb-0" style={{ fontSize: '0.9rem', opacity: 0.9 }}>{t('pages.home.sector3Desc')}</p>
              </div>
            </div>
            <div className="col-lg-3 col-md-6">
              <div className="p-4 h-100" style={{ borderRadius: 12, background: 'linear-gradient(135deg, #6B7280, #374151)', color: 'white' }}>
                <i className="bi bi-shop fs-1 mb-3 d-block"></i>
                <h5 className="text-white">{t('pages.home.sector4')}</h5>
                <p className="mb-0" style={{ fontSize: '0.9rem', opacity: 0.9 }}>{t('pages.home.sector4Desc')}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA FINAL */}
      <section className="section-padding text-center" style={{ background: 'linear-gradient(135deg, var(--ae-blue-dark), var(--ae-blue))', color: 'white' }}>
        <div className="container">
          <h2 className="text-white mb-3">{t('pages.home.ctaTitle')}</h2>
          <p className="mb-4" style={{ fontSize: '1.1rem', opacity: 0.9 }}>
            {t('pages.home.ctaSubtitle')}
          </p>
          <Link to="/contact" className="btn btn-ae-primary btn-lg">
            <i className="bi bi-telephone-fill me-2"></i>{t('pages.home.ctaContact')}
          </Link>
        </div>
      </section>
    </>
  )
}

export default Home
