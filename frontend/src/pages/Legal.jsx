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
      <Seo title="Mentions légales" description="Mentions légales du site Africa Energy SAU, conformes au droit guineen." />
      <section className="ae-hero" style={{ padding: '70px 0' }}>
        <div className="container text-center">
          <h1>Mentions légales</h1>
          <p className="mt-3" style={{ fontSize: '1.15rem', opacity: 0.95 }}>
            Dernière mise à jour : juillet 2026
          </p>
        </div>
      </section>

      <section className="section-padding" style={{ backgroundColor: '#FAFAFA' }}>
        <div className="container" style={{ maxWidth: 920 }}>
          <Section num="1" title="Édition du site">
            <p>
              Conformement a l''article 6 de la loi n° 2004-575 du 21 juin 2004 pour la confiance dans l''economie numerique,
              il est précisé aux utilisateurs du site l''identite des differents intervenants dans le cadre de sa realisation
              et de son suivi.
            </p>

            <p><strong style={{ color: 'var(--ae-blue-dark)' }}>Propriétaire du site :</strong><br />
              AFRICA ENERGY S.A.U<br />
              Société Anonyme Unipersonnelle avec Administrateur Général<br />
              RCCM N° GN.TCC.2025.B.18185 - Formalite N° GN.TCC.2025.20590<br />
              Siège social : Quartier Almamya, Commune de Kaloum, Conakry, République de Guinée<br />
              Contact : <a href="tel:+224612368058">+224 612 368 058</a> - <a href="mailto:africaenergysau@gmail.com">africaenergysau@gmail.com</a>
            </p>

            <p><strong style={{ color: 'var(--ae-blue-dark)' }}>Identification de l''entreprise :</strong><br />
              AFRICA ENERGY S.A.U - Société Anonyme Unipersonnelle avec Administrateur Général.<br />
              Durée : 99 ans à compter du 23 décembre 2025.
            </p>

            <p><strong style={{ color: 'var(--ae-blue-dark)' }}>Directeur de la publication :</strong><br />
              Monsieur Jean Baptiste HABA, Administrateur Général d''AFRICA ENERGY S.A.U<br />
              Contact : <a href="tel:+224612368058">+224 612 368 058</a> - <a href="mailto:africaenergysau@gmail.com">africaenergysau@gmail.com</a>
            </p>

            <p><strong style={{ color: 'var(--ae-blue-dark)' }}>Hébergeur :</strong><br />
              <em>À compléter par le client (OVH, Scaleway, Infomaniak...). Coordonnées à fournir avant mise en ligne.</em>
            </p>

            <p><strong style={{ color: 'var(--ae-blue-dark)' }}>Délégué à la protection des données :</strong><br />
              AFRICA ENERGY S.A.U - <a href="mailto:africaenergysau@gmail.com">africaenergysau@gmail.com</a>
            </p>
          </Section>

          <Section num="2" title="Propriété intellectuelle et contrefaçons">
            <p>
              AFRICA ENERGY S.A.U est proprietaire des droits de propriete intellectuelle et detient les droits d''usage
              sur tous les éléments accessibles sur le site, notamment les textes, images, graphismes, logos, videos,
              architecture, icones et sons.
            </p>
            <p>
              Toute reproduction, représentation, modification, publication, adaptation de tout ou partie des elements
              du site, quel que soit le moyen ou le procédé utilisé, est interdite, sauf autorisation écrite préalable
              d''AFRICA ENERGY S.A.U.
            </p>
            <p>
              Toute exploitation non autorisée du site ou de l''un quelconque des elements qu''il contient sera consideree
              comme constitutive d''une contrefacon et poursuivie conformément aux dispositions des articles L.335-2 et
              suivants du Code de la Propriete Intellectuelle.
            </p>
          </Section>

          <Section num="3" title="Limitations de responsabilité">
            <p>
              AFRICA ENERGY S.A.U ne pourra être tenue pour responsable des dommages directs et indirects causés au
              materiel de l''utilisateur, lors de l''acces au site.
            </p>
            <p>
              AFRICA ENERGY S.A.U décline toute responsabilité quant a l''utilisation qui pourrait etre faite des
              informations et contenus presents sur le site.
            </p>
            <p>
              AFRICA ENERGY S.A.U s''engage a securiser au mieux le site ; sa responsabilite ne pourra toutefois etre
              mise en cause si des données indésirables sont importées et installées sur son site à son insu.
            </p>
            <p>
              Des espaces interactifs (formulaire de contact, commentaires) sont à la disposition des utilisateurs.
              AFRICA ENERGY S.A.U se réserve le droit de supprimer, sans mise en demeure préalable, tout contenu depose
              dans cet espace qui contreviendrait a la legislation applicable, en particulier aux dispositions relatives
              a la protection des donnees. Le cas echeant, AFRICA ENERGY S.A.U se réserve également la possibilité de
              mettre en cause la responsabilite civile et/ou penale de l''utilisateur, notamment en cas de message a
              caractere raciste, injurieux, diffamant ou pornographique, quel que soit le support utilisé (texte,
              photographie, etc.).
            </p>
          </Section>

          <Section num="4" title="Protection des données personnelles">
            <p>
              Conformément aux dispositions de la loi 78-17 du 6 janvier 1978 modifiée, l''utilisateur du site dispose
              d''un droit d''acces, de modification et de suppression des informations collectees. Pour exercer ce droit,
              envoyez un message à notre Délégué à la Protection des Données : AFRICA ENERGY S.A.U -{' '}
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
              Le site contient des liens hypertextes vers d''autres sites ; AFRICA ENERGY S.A.U dégage toute responsabilité
              a propos de ces liens externes ou des liens crees par d''autres sites vers le present site.
            </p>
            <p>
              La navigation sur le site est susceptible de provoquer l''installation de cookie(s) sur l''ordinateur de
              l''utilisateur. Un « cookie » est un fichier de petite taille qui enregistre des informations relatives à
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

          <Section num="6" title="Droit applicable et juridiction compétente">
            <p>
              Tout litige en relation avec l''utilisation du site est soumis au droit guinéen. En dehors des cas ou la
              loi ne le permet pas, il est fait attribution exclusive de juridiction aux tribunaux compétents de Conakry,
              Republique de Guinee.
            </p>
          </Section>
        </div>
      </section>
    </>
  )
}

export default Legal
