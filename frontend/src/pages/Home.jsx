import React from 'react'
import PageHero from '../components/PageHero.jsx'
import Seo from '../components/Seo.jsx'
import Reveal from '../components/Reveal.jsx'
import CountUp from '../lib/hooks/CountUp.jsx'
import { Link } from 'react-router-dom'
import { useI18n } from '../i18n/I18nContext.jsx'

const GradientIcon = ({ icon, bg }) => (
  <div
    style={{
      width: 56, height: 56, borderRadius: 14,
      background: bg,
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      color: '#fff', fontSize: 26, flexShrink: 0,
    }}
  >
    <i className={'bi ' + icon}></i>
  </div>
)

const WhyItem = ({ icon, color, title, desc, isOrange, isGold, isGreen }) => {
  const bg = isOrange
    ? 'linear-gradient(135deg, #F39200, #D4A017)'
    : isGold
    ? 'linear-gradient(135deg, #D4A017, #B8860B)'
    : isGreen
    ? 'linear-gradient(135deg, #2E7D32, #4CAF50)'
    : color
  return (
    <div className='d-flex gap-3 mb-4'>
      <GradientIcon icon={icon} bg={bg} />
      <div>
        <h5 className='mb-1'>{title}</h5>
        <p className='text-muted mb-0'>{desc}</p>
      </div>
    </div>
  )
}

const StatBlock = ({ value, suffix, label }) => (
  <div className="col-md-3 col-6">
    <div className="stat-item">
      <div className="stat-number">
        <CountUp value={value} suffix={suffix} />
      </div>
      <div className="stat-label">{label}</div>
    </div>
  </div>
)

const Home = () => {
  const { t } = useI18n()
  return (
    <>
      <Seo title={t('pages.home.seoTitle')} description={t('pages.home.seoDesc')} />

      <section className='ae-hero-simple'>
        <div className='container'>
          <div className='row align-items-center'>
            <div className='col-lg-9 text-center mx-auto'>
              <span className='badge mb-3 px-3 py-2 ae-hero__kicker'>
                <i className='bi bi-fuel-pump me-2' aria-hidden='true'></i>{t('pages.home.heroBadge')}
              </span>
              <h1>
                {t('pages.home.heroTitle')} <span className="highlight">{t('pages.home.heroHighlight')}</span> {t('pages.home.heroTail')}
              </h1>
              <p className='ae-hero__subtitle'>
                {t('pages.home.heroSubtitle')}
              </p>

              <Reveal effect="fade-up" delay={120}>
                <div className='ae-hero__pills' role='list'>
                  <span className='ae-hero__pill' role='listitem'>
                    <i className='bi bi-truck' aria-hidden='true'></i>{t('pages.home.heroPill1')}
                  </span>
                  <span className='ae-hero__pill' role='listitem'>
                    <i className='bi bi-patch-check-fill' aria-hidden='true'></i>{t('pages.home.heroPill2')}
                  </span>
                  <span className='ae-hero__pill' role='listitem'>
                    <i className='bi bi-buildings' aria-hidden='true'></i>{t('pages.home.heroPill3')}
                  </span>
                  <span className='ae-hero__pill' role='listitem'>
                    <i className='bi bi-geo-alt-fill' aria-hidden='true'></i>{t('pages.home.heroPill4')}
                  </span>
                </div>
              </Reveal>

              <Reveal effect="zoom-in" delay={240}>
                <div className='d-flex gap-3 flex-wrap justify-content-center mt-2'>
                  <Link to='/contact' className='btn btn-ae-primary btn-lg'>
                    <i className='bi bi-envelope-paper me-2' aria-hidden='true'></i>{t('pages.home.ctaQuote')}
                  </Link>
                  <Link to='/a-propos' className='btn btn-ae-outline-light btn-lg'>
                    {t('pages.home.ctaDiscover')} <i className='bi bi-arrow-right ms-2' aria-hidden='true'></i>
                  </Link>
                </div>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      <Reveal effect="fade-up">
        <section className='ae-stats'>
          <div className='container'>
            <div className='row ae-stagger'>
              <StatBlock value={6} suffix="+" label={t('pages.home.kpi1Label')} />
              <StatBlock value={5} suffix="+" label={t('pages.home.kpi2Label')} />
              <StatBlock value={3} label={t('pages.home.kpi3Label')} />
              <StatBlock value={2025} label={t('pages.home.kpi4Label')} />
            </div>
          </div>
        </section>
      </Reveal>

      <section className='section-padding'>
        <div className='container'>
          <Reveal effect="fade-up">
            <div className='section-title'>
              <h2>{t('pages.home.offerTitle')}</h2>
              <p>{t('pages.home.offerSubtitle')}</p>
            </div>
          </Reveal>

          <div className='row g-4 ae-stagger'>
            <div className='col-lg-3 col-md-6'>
              <Reveal effect="fade-up">
                <div className='ae-card-premium text-center'>
                  <div className='ae-card__icon mx-auto'>
                    <i className='bi bi-fuel-pump'></i>
                  </div>
                  <h4>{t('pages.home.offer1Title')}</h4>
                  <p>{t('pages.home.offer1Desc')}</p>
                </div>
              </Reveal>
            </div>
            <div className='col-lg-3 col-md-6'>
              <Reveal effect="fade-up">
                <div className='ae-card-premium text-center'>
                  <div className='ae-card__icon mx-auto'>
                    <i className='bi bi-droplet-half'></i>
                  </div>
                  <h4>{t('pages.home.offer2Title')}</h4>
                  <p>{t('pages.home.offer2Desc')}</p>
                </div>
              </Reveal>
            </div>
            <div className='col-lg-3 col-md-6'>
              <Reveal effect="fade-up">
                <div className='ae-card-premium text-center'>
                  <div className='ae-card__icon mx-auto'>
                    <i className='bi bi-truck'></i>
                  </div>
                  <h4>{t('pages.home.offer3Title')}</h4>
                  <p>{t('pages.home.offer3Desc')}</p>
                </div>
              </Reveal>
            </div>
            <div className='col-lg-3 col-md-6'>
              <Reveal effect="fade-up">
                <div className='ae-card-premium text-center'>
                  <div className='ae-card__icon mx-auto'>
                    <i className='bi bi-bar-chart-line'></i>
                  </div>
                  <h4>{t('pages.home.offer4Title')}</h4>
                  <p>{t('pages.home.offer4Desc')}</p>
                </div>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      <section className='section-padding' style={{ backgroundColor: 'var(--ae-light)' }}>
        <div className='container'>
          <Reveal effect="fade-up">
            <div className='section-title'>
              <h2>{t('pages.home.whyTitle')}</h2>
              <p>{t('pages.home.whySubtitle')}</p>
            </div>
          </Reveal>

          <div className='row g-4'>
            <div className='col-lg-6'>
              <Reveal effect="slide-left">
                <WhyItem
                  icon='bi-graph-up-arrow'
                  bg='linear-gradient(135deg, #1E5BB8, #0B2A5B)'
                  title={t('pages.home.why1Title')}
                  desc={t('pages.home.why1Desc')}
                />
                <WhyItem
                  icon='bi-file-earmark-check'
                  bg='linear-gradient(135deg, #1E5BB8, #0B2A5B)'
                  title={t('pages.home.why2Title')}
                  desc={t('pages.home.why2Desc')}
                />
              </Reveal>
            </div>

            <div className='col-lg-6'>
              <Reveal effect="slide-right">
                <WhyItem
                  icon='bi-truck-front'
                  isGreen
                  title={t('pages.home.why3Title')}
                  desc={t('pages.home.why3Desc')}
                />
                <WhyItem
                  icon='bi-hand-thumbs-up'
                  isGold
                  title={t('pages.home.why4Title')}
                  desc={t('pages.home.why4Desc')}
                />
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      <section className='section-padding'>
        <div className='container'>
          <Reveal effect="fade-up">
            <div className='section-title'>
              <h2>{t('pages.home.sectorsTitle')}</h2>
              <p>{t('pages.home.sectorsSubtitle')}</p>
            </div>
          </Reveal>

          <div className='row g-4 ae-stagger'>
            <div className='col-lg-3 col-md-6'>
              <Reveal effect="zoom-in">
                <div className='p-4 h-100 text-center' style={{ borderRadius: 16, background: 'linear-gradient(135deg, #0B2A5B, #1E5BB8)', color: 'white' }}>
                  <i className='bi bi-gem fs-1 mb-3 d-block' style={{ color: 'var(--ae-orange)' }}></i>
                  <h5 className='text-white'>{t('pages.home.sector1')}</h5>
                  <p className='mb-0 small' style={{ opacity: 0.9 }}>{t('pages.home.sector1Desc')}</p>
                </div>
              </Reveal>
            </div>
            <div className='col-lg-3 col-md-6'>
              <Reveal effect="zoom-in">
                <div className='p-4 h-100 text-center' style={{ borderRadius: 16, background: 'linear-gradient(135deg, #F39200, #D4A017)', color: 'white' }}>
                  <i className='bi bi-cone-striped fs-1 mb-3 d-block'></i>
                  <h5 className='text-white'>{t('pages.home.sector2')}</h5>
                  <p className='mb-0 small' style={{ opacity: 0.9 }}>{t('pages.home.sector2Desc')}</p>
                </div>
              </Reveal>
            </div>
            <div className='col-lg-3 col-md-6'>
              <Reveal effect="zoom-in">
                <div className='p-4 h-100 text-center' style={{ borderRadius: 16, background: 'linear-gradient(135deg, #2E7D32, #4CAF50)', color: 'white' }}>
                  <i className='bi bi-building fs-1 mb-3 d-block'></i>
                  <h5 className='text-white'>{t('pages.home.sector3')}</h5>
                  <p className='mb-0 small' style={{ opacity: 0.9 }}>{t('pages.home.sector3Desc')}</p>
                </div>
              </Reveal>
            </div>
            <div className='col-lg-3 col-md-6'>
              <Reveal effect="zoom-in">
                <div className='p-4 h-100 text-center' style={{ borderRadius: 16, background: 'linear-gradient(135deg, #6B7280, #374151)', color: 'white' }}>
                  <i className='bi bi-shop fs-1 mb-3 d-block'></i>
                  <h5 className='text-white'>{t('pages.home.sector4')}</h5>
                  <p className='mb-0 small' style={{ opacity: 0.9 }}>{t('pages.home.sector4Desc')}</p>
                </div>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      <Reveal effect="fade-up">
        <section className='section-padding' style={{ backgroundColor: 'var(--ae-light)' }}>
          <div className='container'>
            <div className='ae-cta-strip'>
              <h2>{t('pages.home.ctaTitle')}</h2>
              <p>{t('pages.home.ctaSubtitle')}</p>
              <Link to='/contact' className='btn btn-ae-primary btn-lg'>
                <i className='bi bi-telephone-fill me-2'></i>{t('pages.home.ctaContact')}
              </Link>
            </div>
          </div>
        </section>
      </Reveal>
    </>
  )
}

export default Home
