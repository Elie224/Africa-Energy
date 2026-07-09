import React, { useState } from 'react'
import Seo from '../components/Seo.jsx'
import { useI18n } from '../i18n/I18nContext.jsx'

const Contact = () => {
  const { t } = useI18n()
  const [form, setForm] = useState({
    nom: '', email: '', telephone: '', entreprise: '', produit: '', message: '', website: ''
  })
  const [error, setError] = useState('')
  const [sent, setSent] = useState(false)

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value })
  const validate = () => {
    if (form.website) return 'Spam detecte'
    if (!form.nom.trim() || form.nom.trim().length < 2) return 'Nom invalide'
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) return 'Email invalide'
    if (!/^[+0-9\s().-]{6,}$/.test(form.telephone)) return 'Telephone invalide'
    if (!form.message.trim() || form.message.trim().length < 10) return 'Message trop court (10 caracteres minimum)'
    if (form.message.length > 2000) return 'Message trop long (2000 caracteres maximum)'
    return ''
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const err = validate()
    if (err) { setError(err); return }
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
        setError(data.error || 'Erreur lors de l envoi')
        return
      }
      setSent(true)
      setForm({ nom: '', email: '', telephone: '', entreprise: '', produit: '', message: '', website: '' })
      setTimeout(() => setSent(false), 5000)
    } catch (e) {
      setError('Reseau indisponible. Reessayez plus tard.')
    } finally {
      setSending(false)
    }
  }

  return (
    <>
      <Seo title="Contact et Devis" description="Contactez Africa Energy SAU a Conakry. Demandez un devis pour vos besoins en hydrocarbures : gasoil, lubrifiants, GPL, livraison." />
      <section className="ae-hero" style={{ padding: '80px 0' }}>
        <div className="container text-center">
          <h1>{t('pages.contact.heroTitle', 'Contactez-nous')}</h1>
          <p className="mt-3" style={{ fontSize: '1.2rem', opacity: 0.95 }}>
            Notre équipe vous répond sous 24 h
          </p>
        </div>
      </section>

      <section className="section-padding">
        <div className="container">
          <div className="row g-5">
            <div className="col-lg-5">
              <h3 className="mb-4">Nos coordonnées</h3>

              <div className="d-flex gap-3 mb-4">
                <div style={{ width: 50, height: 50, background: 'var(--ae-orange)', borderRadius: 12, display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontSize: 22 }}>
                  <i className="bi bi-geo-alt-fill"></i>
                </div>
                <div>
                  <h6 className="mb-1">Adresse</h6>
                  <p className="text-muted mb-2">Dixinn Terrasse, Conakry, Guinée</p>
                    <a href="https://www.google.com/maps/search/?api=1&query=Dixinn%20Terrasse%2C%20Conakry%2C%20Guinee" target="_blank" rel="noopener noreferrer" style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--ae-orange)', textDecoration: 'none' }}><i className="bi bi-geo-alt-fill me-1"></i>Voir sur Google Maps <i className="bi bi-box-arrow-up-right ms-1"></i></a>
                </div>
              </div>

              <div className="d-flex gap-3 mb-4">
                <div style={{ width: 50, height: 50, background: 'var(--ae-blue)', borderRadius: 12, display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontSize: 22 }}>
                  <i className="bi bi-telephone-fill"></i>
                </div>
                <div>
                  <h6 className="mb-1">Téléphone</h6>
                  <p className="text-muted mb-0">
                    <a href="tel:+224612368058" className="text-decoration-none text-muted">+224 612 368 058</a>
                  </p>
                </div>
              </div>

              <div className="d-flex gap-3 mb-4">
                <div style={{ width: 50, height: 50, background: 'var(--ae-green)', borderRadius: 12, display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontSize: 22 }}>
                  <i className="bi bi-envelope-fill"></i>
                </div>
                <div>
                  <h6 className="mb-1">Email</h6>
                  <p className="text-muted mb-0">
                    <a href="mailto:africaenergysau@gmail.com" className="text-decoration-none text-muted">africaenergysau@gmail.com</a>
                  </p>
                </div>
              </div>

              <div className="d-flex gap-3 mb-4">
                <div style={{ width: 50, height: 50, background: 'var(--ae-gold)', borderRadius: 12, display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontSize: 22 }}>
                  <i className="bi bi-clock-fill"></i>
                </div>
                <div>
                  <h6 className="mb-1">Horaires</h6>
                  <p className="text-muted mb-0">Lundi - Vendredi : 8 h - 18 h<br />Samedi : 9 h - 13 h</p>
                </div>
              </div>

              <a href="https://wa.me/224612368058" className="btn btn-success w-100 mt-3" target="_blank" rel="noopener noreferrer">
                <i className="bi bi-whatsapp me-2"></i>Discuter sur WhatsApp
              </a>
            </div>

            <div className="col-lg-7">
              <div className="ae-card">
                <h3 className="mb-4">Demander un devis</h3>

                {error && (
                  <div className="alert alert-danger"><i className="bi bi-exclamation-triangle me-2"></i>{error}</div>
                )}
                {sent && (
                  <div className="alert alert-success">
                    <i className="bi bi-check-circle me-2"></i>
                    Merci ! Votre demande a bien été envoyée. Nous vous recontactons sous 24 h.
                  </div>
                )}

                <form onSubmit={handleSubmit} autoComplete="on" noValidate>
                  {/* Honeypot anti-bot - invisible aux humains */}
                  <div style={{ position: 'absolute', left: '-9999px', width: '1px', height: '1px', overflow: 'hidden' }} aria-hidden="true">
                    <label htmlFor="website">Website</label>
                    <input id="website" name="website" type="text" tabIndex={-1} autoComplete="off" value={form.website} onChange={handleChange} />
                  </div>
                  <div className="row g-3">
                    <div className="col-md-6">
                      <label className="form-label">Nom complet *</label>
                      <input type="text" name="nom" className="form-control" required value={form.nom} onChange={handleChange} />
                    </div>
                    <div className="col-md-6">
                      <label className="form-label">Entreprise</label>
                      <input type="text" name="entreprise" className="form-control" value={form.entreprise} onChange={handleChange} />
                    </div>
                    <div className="col-md-6">
                      <label className="form-label">Email *</label>
                      <input type="email" name="email" className="form-control" required value={form.email} onChange={handleChange} />
                    </div>
                    <div className="col-md-6">
                      <label className="form-label">Téléphone *</label>
                      <input type="tel" name="telephone" className="form-control" required value={form.telephone} onChange={handleChange} />
                    </div>
                    <div className="col-12">
                      <label className="form-label">Produit / Service souhaité</label>
                      <select name="produit" className="form-select" value={form.produit} onChange={handleChange}>
                        <option value="">Sélectionnez...</option>
                        <option>Gasoil / Diesel</option>
                        <option>Essence Super</option>
                        <option>Pétrole lampant</option>
                        <option>Fuel lourd (HFO)</option>
                        <option>Lubrifiants & huiles</option>
                        <option>GPL & dérivés</option>
                        <option>Livraison rapide</option>
                        <option>Autre</option>
                      </select>
                    </div>
                    <div className="col-12">
                      <label className="form-label">Votre message *</label>
                      <textarea name="message" className="form-control" rows="5" required value={form.message} onChange={handleChange}></textarea>
                    </div>
                    <div className="col-12">
                      <button type="submit" className="btn btn-ae-primary btn-lg w-100" disabled={sending}>
                        {sending ? <><span className="spinner-border spinner-border-sm me-2" />Envoi en cours</> : <><i className="bi bi-send me-2" />Envoyer ma demande</>}
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




