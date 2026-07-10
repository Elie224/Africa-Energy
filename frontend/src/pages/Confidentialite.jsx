import React from 'react'
import Seo from '../components/Seo.jsx'
import { Link } from 'react-router-dom'
import { useI18n } from '../i18n/I18nContext.jsx'

const Section = ({ num, title, children }) => (
  <section className='mb-5'>
    <h2 className='mb-3' style={{ color: 'var(--ae-blue-dark)', fontSize: '1.4rem', fontWeight: 700 }}>
      <span className='me-2' style={{ color: 'var(--ae-orange)' }}>{num}.</span>{title}
    </h2>
    <div style={{ lineHeight: 1.8, color: '#333' }}>{children}</div>
  </section>
)

const Confidentialite = () => {
  const { t } = useI18n()
  return (
    <>
      <Seo title={t('pages.privacy.seoTitle')} description={t('pages.privacy.seoDesc')} />
      <section className='ae-hero' style={{ padding: '70px 0' }}>
        <div className='container text-center'>
          <h1>{t('pages.privacy.heroTitle')}</h1>
          <p className='mt-3' style={{ fontSize: '1.15rem', opacity: 0.95 }}>
            {t('pages.privacy.updatedAt')}
          </p>
        </div>
      </section>

      <section className='section-padding' style={{ backgroundColor: '#FAFAFA' }}>
        <div className='container' style={{ maxWidth: 920 }}>
          <Section num='1' title={t('pages.privacy.responsableTitle')}>
            <p>{t('pages.privacy.responsableIntro')}</p>
            <p>
              <strong style={{ color: 'var(--ae-blue-dark)' }}>AFRICA ENERGY S.A.U</strong><br />
              Societe Anonyme Unipersonnelle - RCCM N° GN.TCC.2025.B.18185<br />
              Siege social : Quartier Almamya, Commune de Kaloum, Conakry, Republique de Guinee<br />
              Email DPO : <a href='mailto:africaenergysau@gmail.com'>africaenergysau@gmail.com</a><br />
              Telephone : <a href='tel:+224612368058'>+224 612 368 058</a>
            </p>
          </Section>

          <Section num='2' title={t('pages.privacy.collectedTitle')}>
            <p>{t('pages.privacy.collectedIntro')}</p>
            <ul>
              <li>{t('pages.privacy.collectedId')}</li>
              <li>{t('pages.privacy.collectedPro')}</li>
              <li>{t('pages.privacy.collectedTech')}</li>
            </ul>
            <p>{t('pages.privacy.collectedSensitive')}</p>
          </Section>

          <Section num='3' title={t('pages.privacy.purposesTitle')}>
            <p>{t('pages.privacy.purposesIntro')}</p>
            <ul>
              <li>{t('pages.privacy.purpose1')}</li>
              <li>{t('pages.privacy.purpose2')}</li>
              <li>{t('pages.privacy.purpose3')}</li>
              <li>{t('pages.privacy.purpose4')}</li>
            </ul>
          </Section>

          <Section num='4' title={t('pages.privacy.legalBasisTitle')}>
            <p>{t('pages.privacy.legalBasisIntro')}</p>
            <ul>
              <li>{t('pages.privacy.basis1')}</li>
              <li>{t('pages.privacy.basis2')}</li>
              <li>{t('pages.privacy.basis3')}</li>
              <li>{t('pages.privacy.basis4')}</li>
            </ul>
          </Section>

          <Section num='5' title={t('pages.privacy.retentionTitle')}>
            <ul>
              <li>{t('pages.privacy.retention1')}</li>
              <li>{t('pages.privacy.retention2')}</li>
              <li>{t('pages.privacy.retention3')}</li>
            </ul>
          </Section>

          <Section num='6' title={t('pages.privacy.recipientsTitle')}>
            <p>{t('pages.privacy.recipientsText')}</p>
          </Section>

          <Section num='7' title={t('pages.privacy.transferTitle')}>
            <p>{t('pages.privacy.transferText')}</p>
          </Section>

          <Section num='8' title={t('pages.privacy.rightsTitle')}>
            <p>{t('pages.privacy.rightsIntro')}</p>
            <ul>
              <li>{t('pages.privacy.right1')}</li>
              <li>{t('pages.privacy.right2')}</li>
              <li>{t('pages.privacy.right3')}</li>
              <li>{t('pages.privacy.right4')}</li>
              <li>{t('pages.privacy.right5')}</li>
              <li>{t('pages.privacy.right6')}</li>
              <li>{t('pages.privacy.right7')}</li>
            </ul>
            <p>{t('pages.privacy.rightsContact')}</p>
          </Section>

          <Section num='9' title={t('pages.privacy.cookiesTitle')}>
            <p>{t('pages.privacy.cookiesText')}</p>
          </Section>

          <Section num='10' title={t('pages.privacy.securityTitle')}>
            <p>{t('pages.privacy.securityText')}</p>
          </Section>

          <div className='alert alert-light border mt-5 mb-0 text-center' role='status'>
            <i className='bi bi-shield-lock-fill text-warning me-2'></i>
            {t('pages.privacy.footerNote')} <Link to='/contact'>{t('pages.privacy.contactLink')}</Link>.
          </div>
        </div>
      </section>
    </>
  )
}

export default Confidentialite
