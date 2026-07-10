import React from 'react'
import Seo from '../components/Seo.jsx'
import { Link } from 'react-router-dom'

const Section = ({ num, title, children }) => (
  <section className="mb-5">
    <h2 className="mb-3" style={{ color: 'var(--ae-blue-dark)', fontSize: '1.5rem', fontWeight: 700 }}>
      <span className="me-2" style={{ color: 'var(--ae-orange)' }}>{num}.</span>{title}
    </h2>
    <div style={{ lineHeight: 1.8, color: '#333' }}>{children}</div>
  </section>
)

const Legal = () => {
  return (
    <>
      <Seo title="Mentions legales" description="Mentions legales du site Africa Energy SAU, conformes au droit guineen." />
      <section className="ae-hero" style={{ padding: '70px 0' }}>
        <div className="container text-center">
          <h1>Mentions legales</h1>
          <p className="mt-3" style={{ fontSize: '1.15rem', opacity: 0.95 }}>
            Derniere mise a jour : juillet 2026
          </p>
        </div>
      </section>

      <section className="section-padding" style={{ backgroundColor: '#FAFAFA' }}>
        <div className="container" style={{ maxWidth: 920 }}>
          <Section num="1" title="Edition du site">
            <p>
              Conformement a l''article 6 de la loi n° 2004-575 du 21 juin 2004 pour la confiance dans l''economie numerique,
              il est precise aux utilisateurs du site l''identite des differents intervenants dans le cadre de sa realisation
              et de son suivi.
            </p>

            <p><strong style={{ color: 'var(--ae-blue-dark)' }}>Proprietaire du site :</strong><br />
              AFRICA ENERGY S.A.U<br />
              Societe Anonyme Unipersonnelle avec Administrateur General<br />
              RCCM N° GN.TCC.2025.B.18185 - Formalite N° GN.TCC.2025.20590<br />
              Siege social : Quartier Almamya, Commune de Kaloum, Conakry, Republique de Guinee<br />
              Contact : <a href="tel:+224612368058">+224 612 368 058</a> - <a href="mailto:africaenergysau@gmail.com">africaenergysau@gmail.com</a>
            </p>

            <p><strong style={{ color: 'var(--ae-blue-dark)' }}>Identification de l''entreprise :</strong><br />
              AFRICA ENERGY S.A.U - Societe Anonyme Unipersonnelle avec Administrateur General.<br />
              Duree : 99 ans a compter du 23 decembre 2025.
            </p>

            <p><strong style={{ color: 'var(--ae-blue-dark)' }}>Directeur de la publication :</strong><br />
              Monsieur Jean Baptiste HABA, Administrateur General d''AFRICA ENERGY S.A.U<br />
              Contact : <a href="tel:+224612368058">+224 612 368 058</a> - <a href="mailto:africaenergysau@gmail.com">africaenergysau@gmail.com</a>
            </p>

            <p><strong style={{ color: 'var(--ae-blue-dark)' }}>Hebergeur :</strong><br />
              <em>A completer par le client (OVH, Scaleway, Infomaniak...). Coordonnees a fournir avant mise en ligne.</em>
            </p>

            <p><strong style={{ color: 'var(--ae-blue-dark)' }}>Delegue a la protection des donnees :</strong><br />
              AFRICA ENERGY S.A.U - <a href="mailto:africaenergysau@gmail.com">africaenergysau@gmail.com</a>
            </p>
          </Section>

          <Section num="2" title="Propriete intellectuelle et contrefacons">
            <p>
              AFRICA ENERGY S.A.U est proprietaire des droits de propriete intellectuelle et detient les droits d''usage
              sur tous les elements accessibles sur le site, notamment les textes, images, graphismes, logos, videos,
              architecture, icones et sons.
            </p>
            <p>
              Toute reproduction, representation, modification, publication, adaptation de tout ou partie des elements
              du site, quel que soit le moyen ou le procede utilise, est interdite, sauf autorisation ecrite prealable
              d''AFRICA ENERGY S.A.U.
            </p>
            <p>
              Toute exploitation non autorisee du site ou de l''un quelconque des elements qu''il contient sera consideree
              comme constitutive d''une contrefacon et poursuivie conformement aux dispositions des articles L.335-2 et
              suivants du Code de la Propriete Intellectuelle.
            </p>
          </Section>

          <Section num="3" title="Limitations de responsabilite">
            <p>
              AFRICA ENERGY S.A.U ne pourra etre tenue pour responsable des dommages directs et indirects causes au
              materiel de l''utilisateur, lors de l''acces au site.
            </p>
            <p>
              AFRICA ENERGY S.A.U decline toute responsabilite quant a l''utilisation qui pourrait etre faite des
              informations et contenus presents sur le site.
            </p>
            <p>
              AFRICA ENERGY S.A.U s''engage a securiser au mieux le site ; sa responsabilite ne pourra toutefois etre
              mise en cause si des donnees indesirables sont importees et installees sur son site a son insu.
            </p>
            <p>
              Des espaces interactifs (formulaire de contact, commentaires) sont a la disposition des utilisateurs.
              AFRICA ENERGY S.A.U se reserve le droit de supprimer, sans mise en demeure prealable, tout contenu depose
              dans cet espace qui contreviendrait a la legislation applicable, en particulier aux dispositions relatives
              a la protection des donnees. Le cas echeant, AFRICA ENERGY S.A.U se reserve egalement la possibilite de
              mettre en cause la responsabilite civile et/ou penale de l''utilisateur, notamment en cas de message a
              caractere raciste, injurieux, diffamant ou pornographique, quel que soit le support utilise (texte,
              photographie, etc.).
            </p>
          </Section>

          <Section num="4" title="Protection des donnees personnelles">
            <p>
              Conformement aux dispositions de la loi 78-17 du 6 janvier 1978 modifiee, l''utilisateur du site dispose
              d''un droit d''acces, de modification et de suppression des informations collectees. Pour exercer ce droit,
              envoyez un message a notre Delegue a la Protection des Donnees : AFRICA ENERGY S.A.U -{' '}
              <a href="mailto:africaenergysau@gmail.com">africaenergysau@gmail.com</a>.
            </p>
            <p>
              Pour plus d''informations sur la facon dont nous traitons vos donnees (type de donnees, finalite,
              destinataire, duree de conservation...), consultez notre{' '}
              <Link to="/politique-de-confidentialite">politique de confidentialite</Link>.
            </p>
          </Section>

          <Section num="5" title="Liens hypertextes et cookies">
            <p>
              Le site contient des liens hypertextes vers d''autres sites ; AFRICA ENERGY S.A.U degage toute responsabilite
              a propos de ces liens externes ou des liens crees par d''autres sites vers le present site.
            </p>
            <p>
              La navigation sur le site est susceptible de provoquer l''installation de cookie(s) sur l''ordinateur de
              l''utilisateur. Un « cookie » est un fichier de petite taille qui enregistre des informations relatives a
              la navigation d''un utilisateur sur un site. Les donnees ainsi obtenues permettent notamment d''obtenir des
              mesures de frequentation.
            </p>
            <p>
              Vous avez la possibilite d''accepter ou de refuser les cookies en modifiant les parametres de votre
              navigateur. Aucun cookie ne sera depose sans votre consentement. Les cookies sont conserves pour une
              duree maximale de treize (13) mois.
            </p>
            <p>
              Pour plus d''informations sur la facon dont nous faisons usage des cookies, consultez notre{' '}
              <Link to="/politique-de-confidentialite">politique de confidentialite</Link>.
            </p>
          </Section>

          <Section num="6" title="Droit applicable et juridiction competente">
            <p>
              Tout litige en relation avec l''utilisation du site est soumis au droit guineen. En dehors des cas ou la
              loi ne le permet pas, il est fait attribution exclusive de juridiction aux tribunaux competents de Conakry,
              Republique de Guinee.
            </p>
          </Section>
        </div>
      </section>
    </>
  )
}

export default Legal
