import React, { useState } from 'react'
import Seo from '../components/Seo.jsx'
import { useI18n } from '../i18n/I18nContext.jsx'

const errMap = {
  fr: { spam:'Spam detecte', name:'Nom invalide', email:'Email invalide', phone:'Telephone invalide', msgShort:'Message trop court (10 caracteres minimum)', msgLong:'Message trop long (2000 caracteres maximum)', network:'Reseau indisponible. Reessayez plus tard.', generic:'Erreur lors de l envoi' },
  en: { spam:'Spam detected', name:'Invalid name', email:'Invalid email', phone:'Invalid phone', msgShort:'Message too short (10 characters minimum)', msgLong:'Message too long (2000 characters maximum)', network:'Network unavailable. Please try again later.', generic:'Error while sending' }
}

const Contact = () => {
  const { t, lang } = useI18n()
  const errs = errMap[lang] || errMap.fr
  const [form, setForm] = useState({ nom:'', email:'', telephone:'', entreprise:'', produit:'', message:'', website:'' })
  const [error, setError] = useState('')
  const [sent, setSent] = useState(false)
  const [sending, setSending] = useState(false)

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value })
  const validate = () => {
    if (form.website) return errs.spam
    if (!form.nom.trim() || form.nom.trim().length < 2) return errs.name
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) return errs.email
    if (!/^[+0-9\s().-]{6,}$/.test(form.telephone)) return errs.phone
    if (!form.message.trim() || form.message.trim().length < 10) return errs.msgShort
    if (form.message.length > 2000) return errs.msgLong
    return ''
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const er = validate()
    if (er) { setError(er); return }
    setError('')
    setSending(true)
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form)
      })
      if (!res.ok) {
        const data = await res.json().catch(() => ({}))
        setError(data.error || errs.generic)
        return
      }
      setSent(true)
      setForm({ nom:'', email:'', telephone:'', entreprise:'', produit:'', message:'', website:'' })
      setTimeout(() => setSent(false), 5000)
    } catch (e) { setError(errs.network) }
    finally { setSending(false) }
  }

  return (
    <>
      <Seo title={t('pages.contact.heroTitle')} description={t('pages.contact.seoDesc')} />
      <section className='ae-hero' style={{ padding: '80px 0' }}>
        <div className='container text-center'>
          <h1>{t('pages.contact.heroTitle')}</h1>
          <p className='mt-3' style={{ fontSize: '1.2rem', opacity: 0.95 }}>
            {t('pages.contact.heroSubtitle')}
          </p>
        </div>
      </section>

      <section className='section-padding'>
        <div className='container'>
          <div className='row g-5'>
            <div className='col-lg-5'>
              <h3 className='mb-4'>{t('pages.contact.coordsTitle')}</h3>
              <div className='d-flex gap-3 mb-4'>
                <div style={{ width: 50, height: 50, background: 'var(--ae-orange)', borderRadius: 12, display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontSize: 22 }}>
                  <i className='bi bi-geo-alt-fill'></i>
                </div>
                <div>
                  <h6 className='mb-1'>{t('pages.contact.addressLabel')}</h6>
                  <p className='text-muted mb-2'>{t('pages.contact.address')}</p>
                  <a href='https://www.google.com/maps/search/?api=1&query=Dixinn+Terrasse%2C+Conakry%2C+Guinee' target='_blank' rel='noopener noreferrer' style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--ae-orange)', textDecoration: 'none' }}>
                    <i className='bi bi-geo-alt-fill me-1'></i>{t('pages.contact.seeOnMaps')} <i className='bi bi-box-arrow-up-right ms-1'></i>
                  </a>
                </div>
              </div>
              <div className='d-flex gap-3 mb-4'>
                <div style={{ width: 50, height: 50, background: 'var(--ae-blue)', borderRadius: 12, display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontSize: 22 }}>
                  <i className='bi bi-telephone-fill'></i>
                </div>
                <div>
                  <h6 className='mb-1'>{t('pages.contact.phoneLabel')}</h6>
                  <p className='text-muted mb-0'>
                    <a href='tel:+224612368058' className='text-decoration-none text-muted'>{t('pages.contact.phone')}</a>
                  </p>
                </div>
              </div>
              <div className='d-flex gap-3 mb-4'>
                <div style={{ width: 50, height: 50, background: 'var(--ae-green)', borderRadius: 12, display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontSize: 22 }}>
                  <i className='bi bi-envelope-fill'></i>
                </div>
                <div>
                  <h6 className='mb-1'>{t('pages.contact.emailLabel')}</h6>
                  <p className='text-muted mb-0'>
                    <a href='mailto:africaenergysau@gmail.com' className='text-decoration-none text-muted'>{t('pages.contact.email')}</a>
                  </p>
                </div>
              </div>
              <div className='d-flex gap-3 mb-4'>
                <div style={{ width: 50, height: 50, background: 'var(--ae-gold)', borderRadius: 12, display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontSize: 22 }}>
                  <i className='bi bi-clock-fill'></i>
                </div>
                <div>
                  <h6 className='mb-1'>{t('pages.contact.hoursLabel')}</h6>
                  <p className='text-muted mb-0'>{t('pages.contact.hours')}<br/>{t('pages.contact.hoursSat')}</p>
                </div>
              </div>
              <a href='https://wa.me/224612368058' className='btn btn-success w-100 mt-3' target='_blank' rel='noopener noreferrer'>
                <i className='bi bi-whatsapp me-2'></i>{t('pages.contact.whatsappButton')}
              </a>
            </div>

            <div className='col-lg-7'>
              <div className='ae-card'>
                <h3 className='mb-4'>{t('pages.contact.formTitle')}</h3>
                {error && (<div className='alert alert-danger'><i className='bi bi-exclamation-triangle me-2'></i>{error}</div>)}
                {sent && (<div className='alert alert-success'><i className='bi bi-check-circle me-2'></i>{t('pages.contact.formSuccess')}</div>)}
                <form onSubmit={handleSubmit} autoComplete='on' noValidate>
                  <div style={{ position: 'absolute', left: '-9999px', width: '1px', height: '1px', overflow: 'hidden' }} aria-hidden='true'>
                    <label htmlFor='website'>Website</label>
                    <input id='website' name='website' type='text' tabIndex={-1} autoComplete='off' value={form.website} onChange={handleChange} />
                  </div>
                  <div className='row g-3'>
                    <div className='col-md-6'>
                      <label className='form-label'>{t('pages.contact.formName')} *</label>
                      <input type='text' name='nom' className='form-control' required value={form.nom} onChange={handleChange} />
                    </div>
                    <div className='col-md-6'>
                      <label className='form-label'>{t('pages.contact.formCompany')}</label>
                      <input type='text' name='entreprise' className='form-control' value={form.entreprise} onChange={handleChange} />
                    </div>
                    <div className='col-md-6'>
                      <label className='form-label'>{t('pages.contact.formEmail')} *</label>
                      <input type='email' name='email' className='form-control' required value={form.email} onChange={handleChange} />
                    </div>
                    <div className='col-md-6'>
                      <label className='form-label'>{t('pages.contact.formPhone')} *</label>
                      <input type='tel' name='telephone' className='form-control' required value={form.telephone} onChange={handleChange} />
                    </div>
                    <div className='col-12'>
                      <label className='form-label'>{t('pages.contact.formProduct')}</label>
                      <select name='produit' className='form-select' value={form.produit} onChange={handleChange}>
                        <option value=''>{t('pages.contact.formSelectProduct')}</option>
                        <option value='1'>{t('pages.contact.product1')}</option>
                        <option value='2'>{t('pages.contact.product2')}</option>
                        <option value='3'>{t('pages.contact.product3')}</option>
                        <option value='4'>{t('pages.contact.product4')}</option>
                        <option value='5'>{t('pages.contact.product5')}</option>
                        <option value='6'>{t('pages.contact.product6')}</option>
                        <option value='7'>{t('pages.contact.product7')}</option>
                        <option value='8'>{t('pages.contact.product8')}</option>
                      </select>
                    </div>
                    <div className='col-12'>
                      <label className='form-label'>{t('pages.contact.formMessage')} *</label>
                      <textarea name='message' className='form-control' rows='5' required value={form.message} onChange={handleChange}></textarea>
                    </div>
                    <div className='col-12'>
                      <button type='submit' className='btn btn-ae-primary btn-lg w-100' disabled={sending}>
                        {sending ? <><span className='spinner-border spinner-border-sm me-2' />{t('pages.contact.formSending')}</> : <><i className='bi bi-send me-2' />{t('pages.contact.formSend')}</>}
                      </button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
export default Contact
