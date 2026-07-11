import React from 'react'
import PageHero from '../components/PageHero.jsx'
import Seo from '../components/Seo.jsx'
import { Link } from 'react-router-dom'
import { useI18n } from '../i18n/I18nContext.jsx'

const products = [
  { icon: 'bi-fuel-pump-diesel-fill', color: 'orange' },
  { icon: 'bi-fuel-pump-fill', color: 'orange' },
  { icon: 'bi-droplet-fill', color: 'orange' },
  { icon: 'bi-fire', color: 'orange' },
  { icon: 'bi-droplet-half', color: 'orange' },
  { icon: 'bi-wind', color: 'orange' },
]
const services = [
  { icon: 'bi-truck', color: 'blue' },
  { icon: 'bi-patch-check-fill', color: 'blue' },
  { icon: 'bi-graph-up-arrow', color: 'blue' },
  { icon: 'bi-headset', color: 'blue' },
]

const IconBox = ({ icon, color }) => (
  <div
    className="ae-icon-box"
    style={color === 'blue' ? {
      background: 'linear-gradient(135deg, var(--ae-blue), var(--ae-blue-dark))',
    } : null}
  >
    <i className={'bi ' + icon}></i>
  </div>
)

const Services = () => {
  const { t } = useI18n()
  return (
    <>
      <Seo title={t('pages.services.seoTitle')} description={t('pages.services.seoDesc')} />
      <PageHero title={t('pages.services.heroTitle')} subtitle={t('pages.services.heroSubtitle')} />

      <section className='section-padding'>
        <div className='container'>
          <div className='section-title'>
            <h2>{t('pages.services.productsTitle')}</h2>
            <p>{t('pages.services.productsSubtitle')}</p>
          </div>
          <div className='row g-3'>
            {products.map((p, i) => (
              <div key={p.key || i} className='col-lg-4 col-md-6'>
                <div className='ae-card ae-card--compact h-100 text-center'>
                  <IconBox icon={p.icon} color={p.color} />
                  <h4 className='mb-2'>{t('pages.services.product' + (i + 1) + 'Title')}</h4>
                  <p className='mb-0 text-muted small'>{t('pages.services.product' + (i + 1) + 'Desc')}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className='section-padding' style={{ backgroundColor: 'var(--ae-light)' }}>
        <div className='container'>
          <div className='section-title'>
            <h2>{t('pages.services.servicesTitle')}</h2>
            <p>{t('pages.services.servicesSubtitle')}</p>
          </div>
          <div className='row g-3'>
            {services.map((s, i) => (
              <div key={i} className='col-lg-3 col-md-6'>
                <div className='ae-card ae-card--compact text-center h-100'>
                  <IconBox icon={s.icon} color={s.color} />
                  <h5 className='mb-1'>{t('pages.services.service' + (i + 1) + 'Title')}</h5>
                  <p className='small text-muted mb-0'>{t('pages.services.service' + (i + 1) + 'Desc')}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className='section-padding'>
        <div className='container'>
          <div className='ae-cta-strip'>
            <h2>{t('pages.services.ctaTitle')}</h2>
            <p>{t('pages.services.ctaText')}</p>
            <Link to='/contact' className='btn btn-ae-primary btn-lg'>
              {t('pages.services.ctaButton')} <i className='bi bi-arrow-right ms-2'></i>
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}

export default Services


