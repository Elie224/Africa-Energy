import React from 'react'
import Seo from '../components/Seo.jsx'
import { useI18n } from '../i18n/I18nContext.jsx'
import { Link } from 'react-router-dom'
import dgPhoto from '../assets/images/DG.webp'

const ContactLine = ({ icon, value, href, isDark }) => (
  <div className={'org-contact' + (isDark ? ' org-contact--dark' : '')}>
    <i className={'bi ' + icon}></i>
    {href ? <a href={href}>{value}</a> : <span>{value}</span>}
  </div>
)

const MemberCard = ({ role, name, desc, phone, email, addr, highlight, icon, photo }) => (
  <div className={'org-node' + (highlight ? ' org-node--dg' : '')}>
    {photo ? (
      <div className="org-node-photo">
        <img src={photo} alt={name} />
      </div>
    ) : (
      <div className={'org-node-avatar' + (highlight ? ' org-node-avatar--dg' : '')}>
        <i className={'bi ' + (icon || 'bi-person-fill')}></i>
      </div>
    )}
    <div className="org-node-role">{role}</div>
    <div className="org-node-name">{name}</div>
    {desc && <div className="org-node-desc">{desc}</div>}
    <div className="org-node-body">
      <ContactLine icon="bi-telephone-fill" value={phone} href={'tel:' + phone.replace(/\s/g, '')} isDark={highlight} />
      <ContactLine icon="bi-envelope-fill" value={email} href={'mailto:' + email} isDark={highlight} />
      <ContactLine icon="bi-geo-alt-fill" value={addr} isDark={highlight} />
    </div>
  </div>
)

const Direction = () => {
  const { t } = useI18n()
  return (
    <>
      <Seo title={t('pages.direction.heroTitle')} description={t('pages.direction.seoDesc')} />
      <section className="dg-hero">
        <div className="container text-center position-relative" style={{ zIndex: 1 }}>
          <h1 className="text-white display-4 fw-bold">{t('pages.direction.heroTitle')}</h1>
          <p className="mt-3" style={{ fontSize: '1.2rem', opacity: 0.95 }}>
            {t('pages.direction.heroSubtitle')}
          </p>
        </div>
      </section>

      <section className="section-padding">
        <div className="container">
          <div className="row g-5 align-items-start">
            <div className="col-lg-4">
              <div className="dg-profile-card">
                <div className="dg-photo-frame">
                  <img src={dgPhoto} alt={t('pages.direction.ceoName')} className="dg-photo" loading="lazy" decoding="async" />
                </div>
                <div className="text-center px-3 pb-3">
                  <h2 className="dg-name">{t('pages.direction.ceoName')}</h2>
                  <p className="dg-title-text">{t('pages.direction.ceoRole')}</p>
                </div>
                <div>
                  <div className="dg-info-row">
                    <i className="bi bi-briefcase-fill"></i>
                    <strong>{t('pages.direction.ceoRoleShort')}</strong>
                  </div>
                  <div className="dg-info-row">
                    <i className="bi bi-telephone-fill"></i>
                    <strong>{t('pages.contact.phoneLabel')}</strong>
                    <a href={'tel:' + t('pages.direction.ceoPhone').replace(/\s/g, '')}>{t('pages.direction.ceoPhone')}</a>
                  </div>
                  <div className="dg-info-row">
                    <i className="bi bi-envelope-fill"></i>
                    <strong>{t('pages.contact.emailLabel')}</strong>
                    <a href={'mailto:' + t('pages.direction.ceoEmail')}>{t('pages.direction.ceoEmail')}</a>
                  </div>
                  <div className="dg-info-row">
                    <i className="bi bi-geo-alt-fill"></i>
                    <strong>{t('pages.contact.addressLabel')}</strong>
                    <span>{t('pages.direction.ceoAddress')}</span>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-8">
              <h2 className="mb-4">{t('pages.direction.ceoWordTitle')}</h2>
              <div className="dg-quote">
                <p>{t('pages.direction.ceoQuote')}</p>
                <cite>{t('pages.direction.ceoCite')}</cite>
              </div>
              <h4 className="mt-4 mb-3">{t('pages.direction.visionTitle')}</h4>
              <p>{t('pages.direction.visionText1')}</p>
              <p>{t('pages.direction.visionText2')}</p>
              <h4 className="mt-4 mb-3">{t('pages.direction.pillarsTitle')}</h4>
              <ul>
                <li>{t('pages.direction.pillar1')}</li>
                <li>{t('pages.direction.pillar2')}</li>
                <li>{t('pages.direction.pillar3')}</li>
                <li>{t('pages.direction.pillar4')}</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section className="company-stats">
        <div className="container">
          <div className="row">
            <div className="col-md-3 col-6"><div className="stat-box"><div className="number">5</div><div className="label">{t('pages.direction.statCollab')}</div></div></div>
            <div className="col-md-3 col-6"><div className="stat-box"><div className="number">6+</div><div className="label">{t('pages.direction.statProducts')}</div></div></div>
            <div className="col-md-3 col-6"><div className="stat-box"><div className="number">3</div><div className="label">{t('pages.direction.statPartners')}</div></div></div>
            <div className="col-md-3 col-6"><div className="stat-box"><div className="number">100%</div><div className="label">{t('pages.direction.statConformity')}</div></div></div>
          </div>
        </div>
      </section>

      <section className="section-padding" style={{ backgroundColor: '#FAFBFC' }}>
        <div className="container">
          <div className="section-title text-center mb-5">
            <h2>{t('pages.direction.orgTitle')}</h2>
          </div>

          <div className="org-chart">
            <div className="org-row org-row--top">
              <MemberCard
                role={t('pages.direction.ceoRole')}
                name={t('pages.direction.ceoName')}
                desc={t('pages.direction.ceoRoleShort')}
                phone={t('pages.direction.ceoPhone')}
                email={t('pages.direction.ceoEmail')}
                addr={t('pages.direction.ceoAddress')}
                highlight
                photo={dgPhoto}
              />
            </div>
            <div className="org-row org-row--bottom">
              <MemberCard
                role={t('pages.direction.role1')}
                name={t('pages.direction.name1')}
                desc={t('pages.direction.desc1')}
                phone={t('pages.direction.phone1')}
                email={t('pages.direction.email1')}
                addr={t('pages.direction.addr1')}
                icon="bi-person-badge-fill"
              />
              <MemberCard
                role={t('pages.direction.role2')}
                name={t('pages.direction.name2')}
                desc={t('pages.direction.desc2')}
                phone={t('pages.direction.phone2')}
                email={t('pages.direction.email2')}
                addr={t('pages.direction.addr2')}
                icon="bi-truck-front-fill"
              />
              <MemberCard
                role={t('pages.direction.role3')}
                name={t('pages.direction.name3')}
                desc={t('pages.direction.desc3')}
                phone={t('pages.direction.phone3')}
                email={t('pages.direction.email3')}
                addr={t('pages.direction.addr3')}
                icon="bi-box-seam-fill"
              />
              <MemberCard
                role={t('pages.direction.role4')}
                name={t('pages.direction.name4')}
                desc={t('pages.direction.desc4')}
                phone={t('pages.direction.phone4')}
                email={t('pages.direction.email4')}
                addr={t('pages.direction.addr4')}
                icon="bi-calculator-fill"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="section-padding text-center" style={{ backgroundColor: '#F5F7FA' }}>
        <div className="container">
          <div className="section-title">
            <h2>{t('pages.direction.identityTitle')}</h2>
          </div>
          <div className="row g-3">
            <div className="col-lg-4">
              <div className="identity-card vision">
                <div className="icon-circle"><i className="bi bi-eye-fill"></i></div>
                <h3>{t('pages.direction.visionLabel')}</h3>
                <p>{t('pages.direction.visionCard')}</p>
              </div>
            </div>
            <div className="col-lg-4">
              <div className="identity-card mission">
                <div className="icon-circle"><i className="bi bi-bullseye"></i></div>
                <h3>{t('pages.direction.missionLabel')}</h3>
                <p>{t('pages.direction.missionCard')}</p>
              </div>
            </div>
            <div className="col-lg-4">
              <div className="identity-card values">
                <div className="icon-circle"><i className="bi bi-heart-fill"></i></div>
                <h3>{t('pages.direction.valuesLabel')}</h3>
                <p>{t('pages.direction.valuesCard')}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section-padding text-center">
        <div className="container">
          <Link to="/contact" className="btn btn-ae-primary btn-lg">
            <i className="bi bi-envelope me-2"></i>{t('pages.direction.ctaContact')}
          </Link>
        </div>
      </section>
    </>
  )
}

export default Direction
