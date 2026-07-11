import React from 'react'
import PageHero from '../components/PageHero.jsx'
import Seo from '../components/Seo.jsx'
import { Link } from 'react-router-dom'
import { useI18n } from '../i18n/I18nContext.jsx'

const Section = ({ num, title, children }) => (
  <section className='mb-5'>
    <h2 className='mb-3' style={{ color: 'var(--ae-blue-dark)', fontSize: '1.5rem', fontWeight: 700 }}>
      <span className='me-2' style={{ color: 'var(--ae-orange)' }}>{num}.</span>{title}
    </h2>
    <div style={{ lineHeight: 1.8, color: '#333' }}>{children}</div>
  </section>
)

const Legal = () => {
  const { t } = useI18n()
  return (
    <>
      <Seo title={t('pages.legal.seoTitle')} description={t('pages.legal.seoDesc')} />
      <section className='ae-hero' style={{ padding: '70px 0' }}>
        <div className='container text-center'>
          <h1>{t('pages.legal.heroTitle')}</h1>
          <p className='mt-3' style={{ fontSize: '1.15rem', opacity: 0.95 }}>
            {t('pages.legal.updatedAt')}
          </p>
        </div>
      </section>

      <section className='section-padding' style={{ backgroundColor: '#FAFAFA' }}>
        <div className='container' style={{ maxWidth: 920 }}>
          <Section num='1' title={t('pages.legal.section1Title')}>
            <p>{t('pages.legal.section1Intro')}</p>

            <p><strong style={{ color: 'var(--ae-blue-dark)' }}>{t('pages.legal.ownerLabel')}</strong><br />
              AFRICA ENERGY S.A.U<br />
              {t('pages.legal.ownerType')}<br />
              {t('pages.legal.ownerRccm')}<br />
              {t('pages.legal.ownerAddress')}<br />
              {t('pages.legal.contactLabel')} <a href='tel:+224612368058'>+224 612 368 058</a> - <a href='mailto:africaenergysau@gmail.com'>africaenergysau@gmail.com</a>
            </p>

            <p><strong style={{ color: 'var(--ae-blue-dark)' }}>{t('pages.legal.identificationLabel')}</strong><br />
              {t('pages.legal.identificationText')}
            </p>

            <p><strong style={{ color: 'var(--ae-blue-dark)' }}>{t('pages.legal.directorLabel')}</strong><br />
              {t('pages.legal.directorName')}<br />
              {t('pages.legal.contactLabel')} <a href='tel:+224612368058'>+224 612 368 058</a> - <a href='mailto:africaenergysau@gmail.com'>africaenergysau@gmail.com</a>
            </p>

            <p><strong style={{ color: 'var(--ae-blue-dark)' }}>{t('pages.legal.hostLabel')}</strong><br />
              <em>{t('pages.legal.hostText')}</em>
            </p>

            <p><strong style={{ color: 'var(--ae-blue-dark)' }}>{t('pages.legal.dpoLabel')}</strong><br />
              AFRICA ENERGY S.A.U - <a href='mailto:africaenergysau@gmail.com'>africaenergysau@gmail.com</a>
            </p>
          </Section>

          <Section num='2' title={t('pages.legal.section2Title')}>
            <p>{t('pages.legal.section2Text1')}</p>
            <p>{t('pages.legal.section2Text2')}</p>
            <p>{t('pages.legal.section2Text3')}</p>
          </Section>

          <Section num='3' title={t('pages.legal.section3Title')}>
            <p>{t('pages.legal.section3Text1')}</p>
            <p>{t('pages.legal.section3Text2')}</p>
            <p>{t('pages.legal.section3Text3')}</p>
            <p>{t('pages.legal.section3Text4')}</p>
          </Section>

          <Section num='4' title={t('pages.legal.section4Title')}>
            <p>
              {t('pages.legal.section4Text1')}{' '}
              <a href='mailto:africaenergysau@gmail.com'>africaenergysau@gmail.com</a>.
            </p>
            <p>
              {t('pages.legal.section4Text2')}{' '}
              <Link to='/politique-de-confidentialite'>{t('pages.legal.privacyLink')}</Link>.
            </p>
          </Section>

          <Section num='5' title={t('pages.legal.section5Title')}>
            <p>{t('pages.legal.section5Text1')}</p>
            <p>{t('pages.legal.section5Text2')}</p>
            <p>{t('pages.legal.section5Text3')}</p>
            <p>
              {t('pages.legal.section5Text4')}{' '}
              <Link to='/politique-de-confidentialite'>{t('pages.legal.privacyLink')}</Link>.
            </p>
          </Section>

          <Section num='6' title={t('pages.legal.section6Title')}>
            <p>{t('pages.legal.section6Text')}</p>
          </Section>
        </div>
      </section>
    </>
  )
}

export default Legal
