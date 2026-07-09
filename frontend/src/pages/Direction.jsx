import React from 'react'
import { Link } from 'react-router-dom'
import dgPhoto from '../assets/images/DG.webp'

const Direction = () => {
  return (
    <>
      <section className="dg-hero">
        <div className="container text-center position-relative" style={{ zIndex: 1 }}>
          <h1 className="text-white display-4 fw-bold">Direction & Équipe</h1>
          <p className="mt-3" style={{ fontSize: '1.2rem', opacity: 0.95 }}>
            Les hommes et les femmes qui font Africa Energy SAU
          </p>
        </div>
      </section>

      <section className="section-padding">
        <div className="container">
          <div className="row g-5 align-items-start">
            <div className="col-lg-4">
              <div className="dg-profile-card">
                <div className="dg-photo-frame">
                  <img src={dgPhoto} alt="Jean Baptiste HABA - Administrateur Général Africa Energy SAU" className="dg-photo" loading="lazy" decoding="async" />
                </div>
                <div className="text-center px-3 pb-3">
                  <h2 className="dg-name">Jean Baptiste HABA</h2>
                  <p className="dg-title-text">Administrateur Général</p>
                </div>
                <div>
                  <div className="dg-info-row">
                    <i className="bi bi-briefcase-fill"></i>
                    <strong>Rôle</strong>
                    <span>Fondateur & DG</span>
                  </div>
                  <div className="dg-info-row">
                    <i className="bi bi-telephone-fill"></i>
                    <strong>Tel</strong>
                    <a href="tel:+224624251991">+224 624 251 991</a>
                  </div>
                  <div className="dg-info-row">
                    <i className="bi bi-envelope-fill"></i>
                    <strong>Email</strong>
                    <a href="mailto:habajb9211@gmail.com">habajb9211@gmail.com</a>
                  </div>
                  <div className="dg-info-row">
                    <i className="bi bi-geo-alt-fill"></i>
                    <strong>Adresse</strong>
                    <span>Sonfonia / Cobaya</span>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-8">
              <h2 className="mb-4">Le mot de l’Administrateur Général</h2>
              <div className="dg-quote">
                <p>Notre ambition est de faire d’Africa Energy un pilier incontournable du secteur énergétique guinéen. Chaque livraison est un engagement envers le développement de notre pays. Qualité, rigueur et éthique guident chacune de nos opérations.</p>
                <cite>Jean Baptiste HABA, Administrateur Général</cite>
              </div>
              <h4 className="mt-4 mb-3">Une vision panafricaine</h4>
              <p>Fort d’une solide expérience dans le secteur pétrolier et d’une connaissance approfondie du marché guinéen, Jean Baptiste HABA a fondé Africa Energy SAU avec une conviction : l’Afrique a besoin d’acteurs énergétiques fiables, transparents et engagés dans la durée.</p>
              <p>Sa stratégie s’articule autour de trois piliers : la qualité de service, la conformité réglementaire et le développement local. Sous sa direction, Africa Energy SAU a noué des partenariats stratégiques avec la SONAP, la SGP et la DGI.</p>
              <h4 className="mt-4 mb-3">Ses engagements</h4>
              <ul>
                <li>Garantir un approvisionnement régulier et tracé</li>
                <li>Soutenir le développement économique de la Guinée</li>
                <li>Respecter les normes OHADA et la conformité SONAP</li>
                <li>Accompagner les industriels et mineurs avec un service premium</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section className="company-stats">
        <div className="container">
          <div className="row">
            <div className="col-md-3 col-6"><div className="stat-box"><div className="number">5</div><div className="label">Collaborateurs</div></div></div>
            <div className="col-md-3 col-6"><div className="stat-box"><div className="number">6+</div><div className="label">Produits</div></div></div>
            <div className="col-md-3 col-6"><div className="stat-box"><div className="number">3</div><div className="label">Partenaires</div></div></div>
            <div className="col-md-3 col-6"><div className="stat-box"><div className="number">100%</div><div className="label">SONAP</div></div></div>
          </div>
        </div>
      </section>

      <section className="section-padding">
        <div className="container">
          <div className="section-title">
            <h2>Notre histoire</h2>
            <p>De la vision d’un homme à une entreprise au service de la Guinée.</p>
          </div>
          <div className="timeline">
            <div className="timeline-item"><div className="timeline-content"><span className="timeline-year">2025</span><h4>Naissance d’Africa Energy SAU</h4><p>Fondation de la société à Conakry par Jean Baptiste HABA.</p></div><div className="timeline-dot"></div></div>
            <div className="timeline-item"><div className="timeline-content"><span className="timeline-year">2025</span><h4>Partenariats stratégiques</h4><p>Signature des conventions avec la SONAP, la SGP et la DGI.</p></div><div className="timeline-dot"></div></div>
            <div className="timeline-item"><div className="timeline-content"><span className="timeline-year">2025</span><h4>Premières livraisons</h4><p>Déploiement de la flotte et livraisons clients.</p></div><div className="timeline-dot"></div></div>
            <div className="timeline-item"><div className="timeline-content"><span className="timeline-year">2026</span><h4>Expansion vers Simandou</h4><p>Extension des opérations vers les zones minières.</p></div><div className="timeline-dot"></div></div>
            <div className="timeline-item"><div className="timeline-content"><span className="timeline-year">2026</span><h4>Digitalisation</h4><p>Lancement de la plateforme digitale.</p></div><div className="timeline-dot"></div></div>
          </div>
        </div>
      </section>

      <section className="section-padding" style={{ backgroundColor: '#F5F7FA' }}>
        <div className="container">
          <div className="section-title">
            <h2>Organigramme de l’entreprise</h2>
            <p>Une structure hiérarchisée avec 5 collaborateurs clés.</p>
          </div>

          <div className="org-tree">
            <div className="org-node dg">
              <div className="role">Direction Générale</div>
              <div className="name">Jean Baptiste HABA</div>
              <p style={{ fontSize: '0.8rem', opacity: 0.9, margin: '0 0 8px 0' }}>Administrateur Général</p>
              <div className="contact-block">
                <a href="tel:+224624251991"><i className="bi bi-telephone-fill"></i> 624 251 991</a>
                <a href="mailto:habajb9211@gmail.com"><i className="bi bi-envelope-fill"></i> habajb9211@gmail.com</a>
                <div className="address"><i className="bi bi-geo-alt-fill"></i> Sonfonia / Cobaya</div>
              </div>
            </div>

            <div className="org-level">
              <div className="org-branch">
                <div className="org-node">
                  <div className="role">Secrétariat Général</div>
                  <div className="name">Zoumana TRAORÉ</div>
                  <p style={{ fontSize: '0.78rem', color: '#666', margin: '0 0 8px 0' }}>Secrétaire Général</p>
                  <div className="contact-block">
                    <a href="tel:+224628953007"><i className="bi bi-telephone-fill"></i> 628 953 007</a>
                    <a href="mailto:zoumanazenotraore@gmail.com"><i className="bi bi-envelope-fill"></i> zoumanazenotraore@gmail.com</a>
                    <div className="address"><i className="bi bi-geo-alt-fill"></i> Sonfonia / Cobaya</div>
                  </div>
                </div>
              </div>
            </div>

            <div className="org-level">
              <div className="org-branch">
                <div className="org-node">
                  <div className="role">Logistique & Transit</div>
                  <div className="name">Ce Philos MAMY</div>
                  <p style={{ fontSize: '0.78rem', color: '#666', margin: '0 0 8px 0' }}>Responsable Logistique et Transit</p>
                  <div className="contact-block">
                    <a href="tel:+224622858976"><i className="bi bi-telephone-fill"></i> 622 858 976</a>
                    <a href="mailto:cephilos1245@gmail.com"><i className="bi bi-envelope-fill"></i> cephilos1245@gmail.com</a>
                    <div className="address"><i className="bi bi-geo-alt-fill"></i> Tombolia / Kokoma</div>
                  </div>
                </div>
                <div className="org-node">
                  <div className="role">Transit</div>
                  <div className="name">Djimba SIDIBE</div>
                  <p style={{ fontSize: '0.78rem', color: '#666', margin: '0 0 8px 0' }}>Assistant Transitaire</p>
                  <div className="contact-block">
                    <a href="tel:+224628768169"><i className="bi bi-telephone-fill"></i> 628 768 169</a>
                    <a href="mailto:ayoubasidibe210@gmail.com"><i className="bi bi-envelope-fill"></i> ayoubasidibe210@gmail.com</a>
                    <div className="address"><i className="bi bi-geo-alt-fill"></i> Kagbelen / Samantra village</div>
                  </div>
                </div>
                <div className="org-node">
                  <div className="role">Comptabilité</div>
                  <div className="name">Ezechiel Zoma KOIVOGUI</div>
                  <p style={{ fontSize: '0.78rem', color: '#666', margin: '0 0 8px 0' }}>Assistant Comptable</p>
                  <div className="contact-block">
                    <a href="tel:+224625413972"><i className="bi bi-telephone-fill"></i> 625 413 972</a>
                    <a href="mailto:ezechielesther44@gmail.com"><i className="bi bi-envelope-fill"></i> ezechielesther44@gmail.com</a>
                    <div className="address"><i className="bi bi-geo-alt-fill"></i> Lambanyi / Wanidara</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section-padding text-center" style={{ backgroundColor: '#F5F7FA' }}>
        <div className="container">
          <div className="section-title">
            <h2>Identité de l’entreprise</h2>
          </div>
          <div className="row g-4">
            <div className="col-lg-4">
              <div className="identity-card vision">
                <div className="icon-circle"><i className="bi bi-eye-fill"></i></div>
                <h3>Notre vision</h3>
                <p>Devenir l’opérateur pétrolier de référence en Guinée et en Afrique de l’Ouest.</p>
              </div>
            </div>
            <div className="col-lg-4">
              <div className="identity-card mission">
                <div className="icon-circle"><i className="bi bi-bullseye"></i></div>
                <h3>Notre mission</h3>
                <p>Assurer un approvisionnement régulier, sécurisé et de qualité sur tout le territoire guinéen.</p>
              </div>
            </div>
            <div className="col-lg-4">
              <div className="identity-card values">
                <div className="icon-circle"><i className="bi bi-heart-fill"></i></div>
                <h3>Nos valeurs</h3>
                <p>Intégrité - Excellence - Fiabilité - Responsabilité - Engagement national</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section-padding text-center">
        <div className="container">
          <Link to="/contact" className="btn btn-ae-primary btn-lg">
            <i className="bi bi-envelope me-2"></i>Prendre contact
          </Link>
        </div>
      </section>
    </>
  )
}

export default Direction
