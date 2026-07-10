import React from 'react'
import Seo from '../components/Seo.jsx'
import { useI18n } from '../i18n/I18nContext.jsx'
import { Link } from 'react-router-dom'

const items = [
  { icon: 'bi-shield-fill-check', color: 'var(--ae-blue)' },
  { icon: 'bi-fingerprint', color: 'var(--ae-orange)' },
  { icon: 'bi-lock-fill', color: 'var(--ae-green)' },
  { icon: 'bi-people-fill', color: 'var(--ae-gold)' },
  { icon: 'bi-tree-fill', color: 'var(--ae-green)' },
  { icon: 'bi-award-fill', color: 'var(--ae-blue)' }
]

const IconBox = ({ icon, color }) => (
  <div className="ae-icon-box" style={color ? { background: color } : null}>
    <i className={'bi ' + icon}></i>
  </div>
)

const Engagements = () => {
  const { t } = useI18n()
  return (
    <>
      <Seo title={t('pages.engagements.heroTitle')} description={t('pages.engagements.seoDesc')} />
      <section className="ae-hero" style={{ padding: '80px 0' }}>
        <div className="container text-center">
          <h1>{t('pages.engagements.heroTitle')}</h1>
          <p className="mt-3" style={{ fontSize: '1.2rem', opacity: 0.95 }}>
            {t('pages.engagements.heroSubtitle')}
          </p>
        </div>
      </section>
      <section className="section-padding">
        <div className="container">
          <div className="row g-3">
            {items.map((it, idx) => (
              <div key={idx} className="col-lg-4 col-md-6">
                <div className="ae-card ae-card--compact text-center">
                  <IconBox icon={it.icon} color={it.color} />
                  <h4 className="mb-2">{t('pages.engagements.eng' + (idx + 1) + 'Title')}</h4>
                  <p className="text-muted small mb-0">{t('pages.engagements.eng' + (idx + 1) + 'Desc')}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      <section className="section-padding text-center" style={{ backgroundColor: 'var(--ae-light)' }}>
        <div className="container">
          <h2 className="mb-4">{t('pages.engagements.ctaTitle')}</h2>
          <Link to="/contact" className="btn btn-ae-primary btn-lg">{t('pages.engagements.ctaButton')}</Link>
        </div>
      </section>
    </>
  )
}
export default Engagements
