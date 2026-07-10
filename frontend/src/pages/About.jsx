import React from 'react'
import Seo from '../components/Seo.jsx'
import { useI18n } from '../i18n/I18nContext.jsx'
import { Link } from 'react-router-dom'

const About = () => {
  const { t } = useI18n()
  return (
    <>
      <Seo title={t('pages.about.seoTitle')} description={t('pages.about.seoDesc')} />
      <section className='ae-hero' style={{ padding: '80px 0' }}>
        <div className='container text-center'>
          <h1>{t('pages.about.heroTitle')}</h1>
          <p className='mt-3' style={{ fontSize: '1.2rem', opacity: 0.95 }}>
            {t('pages.about.heroSubtitle')}
          </p>
        </div>
      </section>

      <section className='section-padding'>
        <div className='container'>
          <div className='row align-items-center g-5'>
            <div className='col-lg-6'>
              <h2 className='mb-4'>Africa Energy SAU</h2>
              <p className='lead'>{t('pages.about.intro')}</p>
              <p>{t('pages.about.intro2')}</p>
            </div>
            <div className='col-lg-6'>
              <div className='row g-3'>
                <div className='col-6'>
                  <div className='ae-card text-center'>
                    <i className='bi bi-eye fs-1 mb-3' style={{ color: 'var(--ae-orange)' }}></i>
                    <h5>{t('pages.about.visionTitle')}</h5>
                    <p className='small'>{t('pages.about.visionDesc')}</p>
                  </div>
                </div>
                <div className='col-6'>
                  <div className='ae-card text-center'>
                    <i className='bi bi-bullseye fs-1 mb-3' style={{ color: 'var(--ae-blue)' }}></i>
                    <h5>{t('pages.about.missionTitle')}</h5>
                    <p className='small'>{t('pages.about.missionDesc')}</p>
                  </div>
                </div>
                <div className='col-12'>
                  <div className='ae-card text-center'>
                    <i className='bi bi-heart fs-1 mb-3' style={{ color: 'var(--ae-green)' }}></i>
                    <h5>{t('pages.about.valuesTitle')}</h5>
                    <p className='small mb-0'>
                      <strong>{t('pages.about.values')}</strong>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className='section-padding' style={{ backgroundColor: 'var(--ae-light)' }}>
        <div className='container text-center'>
          <Link to='/contact' className='btn btn-ae-primary btn-lg'>
            <i className='bi bi-envelope me-2'></i>{t('pages.about.ctaDiscuss')}
          </Link>
        </div>
      </section>
    </>
  )
}
export default About
