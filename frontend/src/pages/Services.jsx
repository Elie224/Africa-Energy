import React from 'react'
import Seo from '../components/Seo.jsx'
import { Link } from 'react-router-dom'
import { useI18n } from '../i18n/I18nContext.jsx'

const products = [
  { icon: 'bi-fuel-pump-diesel-fill', key: 'product1' },
  { icon: 'bi-fuel-pump-fill', key: 'product2' },
  { icon: 'bi-droplet-fill', key: 'product3' },
  { icon: 'bi-fire', key: 'product4' },
  { icon: 'bi-droplet-half', key: 'product5' },
  { icon: 'bi-wind', key: 'product6' }
]
const services = [
  { icon: 'bi-truck', key: 'service1' },
  { icon: 'bi-patch-check-fill', key: 'service2' },
  { icon: 'bi-graph-up-arrow', key: 'service3' },
  { icon: 'bi-headset', key: 'service4' }
]

const IconBox = ({ icon }) => (
  <div className="ae-icon-box">
    <i className={'bi ' + icon}></i>
  </div>
)

const Services = () => {
  const { t } = useI18n()
  return (
    <>
      <Seo title={t('pages.services.seoTitle')} description={t('pages.services.seoDesc')} />
      <section className="ae-hero" style={{ padding: '80px 0' }}>
        <div className="container text-center">
          <h1>{t('pages.services.heroTitle')}</h1>
          <p className="mt-3" style={{ fontSize: '1.2rem', opacity: 0.95 }}>
            {t('pages.services.heroSubtitle')}
          </p>
        </div>
      </section>

      <section className="section-padding">
        <div className="container">
          <div className="section-title">
            <h2>{t('pages.services.productsTitle')}</h2>
            <p>{t('pages.services.productsSubtitle')}</p>
          </div>
          <div className="row g-3">
            {products.map((p) => (
              <div key={p.key} className="col-lg-4 col-md-6">
                <div className="ae-card ae-card--compact h-100 text-center">
                  <IconBox icon={p.icon} />
                  <h4 className="mb-2">{t('pages.services.' + p.key + 'Title')}</h4>
                  <p className="mb-0 text-muted small">{t('pages.services.' + p.key + 'Desc')}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section-padding" style={{ backgroundColor: 'var(--ae-light)' }}>
        <div className="container">
          <div className="section-title">
            <h2>{t('pages.services.servicesTitle')}</h2>
            <p>{t('pages.services.servicesSubtitle')}</p>
          </div>
          <div className="row g-3">
            {services.map((s) => (
              <div key={s.key} className="col-lg-3 col-md-6">
                <div className="ae-card ae-card--compact text-center">
                  <IconBox icon={s.icon} />
                  <h5 className="mb-1">{t('pages.services.' + s.key + 'Title')}</h5>
                  <p className="small text-muted mb-0">{t('pages.services.' + s.key + 'Desc')}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section-padding text-center">
        <div className="container">
          <h2 className="mb-4">{t('pages.services.ctaTitle')}</h2>
          <Link to="/contact" className="btn btn-ae-primary btn-lg">
            {t('pages.services.ctaButton')} <i className="bi bi-arrow-right ms-2"></i>
          </Link>
        </div>
      </section>
    </>
  )
}

export default Services
