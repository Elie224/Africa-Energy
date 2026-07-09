import React from 'react'
import Seo from '../components/Seo.jsx'
import { Link } from 'react-router-dom'

const Section = ({ num, title, children }) => (
  <section className="mb-5">
    <h2 className="mb-3" style={{ color: 'var(--ae-blue-dark)', fontSize: '1.5rem', fontWeight: 700 }}>
      <span className="me-2" style={{ color: 'var(--ae-orange)' }}>{num} â€“</span>{title}
    </h2>
    <div style={{ lineHeight: 1.8, color: '#333' }}>{children}</div>
  </section>
)

const Legal = () => {
  return (
    <>
      <Seo title="Mentions legales" description="Mentions legales, politique de confidentialite et CGV du site Africa Energy SAU, conformes au droit guineen." />
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
          <Section num="1" title="Àdition du site">
            <p>
              Conformément à l'article 6 de la loi nÂ° 2004-575 du 21 juin 2004 pour la confiance dans l'économie numérique,
              il est précisé aux utilisateurs du site l'identité des différents intervenants dans le cadre de sa réalisation
              et de son suivi.
            </p>

            <p><strong style={{ color: 'var(--ae-blue-dark)' }}>Propriétaire du site :</strong><br />
              AFRICA ENERGY S.A.U<br />
              Société Anonyme Unipersonnelle avec Administrateur Général<br />
              RCCM NÂ° GN.TCC.2025.B.18185 â€“ Formalité NÂ° GN.TCC.2025.20590<br />
              Siège social : Quartier Almamya, Commune de Kaloum, Conakry, République de Guinée<br />
              Contact : <a href="tel:+224612368058">+224 612 368 058</a> â€“ <a href="mailto:africaenergysau@gmail.com">africaenergysau@gmail.com</a>
            </p>

            <p><strong style={{ color: 'var(--ae-blue-dark)' }}>Identification de l'entreprise :</strong><br />
              AFRICA ENERGY S.A.U â€“ Société Anonyme Unipersonnelle avec Administrateur Général â€“
              Durée : 99 ans à compter du 23 décembre 2025.
            </p>

            <p><strong style={{ color: 'var(--ae-blue-dark)' }}>Directeur de la publication :</strong><br />
              Monsieur Jean Baptiste HABA, Administrateur Général d'AFRICA ENERGY S.A.U<br />
              Contact : <a href="tel:+224612368058">+224 612 368 058</a> â€“ <a href="mailto:africaenergysau@gmail.com">africaenergysau@gmail.com</a>
            </p>

            <p><strong style={{ color: 'var(--ae-blue-dark)' }}>Hébergeur :</strong><br />
              À compléter â€“ nom de l'hébergeur, adresse et téléphone.
            </p>

            <p><strong style={{ color: 'var(--ae-blue-dark)' }}>Délégué à la protection des données :</strong><br />
              AFRICA ENERGY S.A.U â€“ <a href="mailto:africaenergysau@gmail.com">africaenergysau@gmail.com</a>
            </p>
          </Section>

          <Section num="2" title="Propriété intellectuelle et contrefaçons">
            <p>
              AFRICA ENERGY S.A.U est propriétaire des droits de propriété intellectuelle et détient les droits d'usage
              sur tous les éléments accessibles sur le site, notamment les textes, images, graphismes, logos, vidéos,
              architecture, icônes et sons.
            </p>
            <p>
              Toute reproduction, représentation, modification, publication, adaptation de tout ou partie des éléments
              du site, quel que soit le moyen ou le procédé utilisé, est interdite, sauf autorisation écrite préalable
              d'AFRICA ENERGY S.A.U.
            </p>
            <p>
              Toute exploitation non autorisée du site ou de l'un quelconque des éléments qu'il contient sera considérée
              comme constitutive d'une contrefaçon et poursuivie conformément aux dispositions des articles L.335-2 et
              suivants du Code de la Propriété Intellectuelle.
            </p>
          </Section>

          <Section num="3" title="Limitations de responsabilité">
            <p>
              AFRICA ENERGY S.A.U ne pourra être tenue pour responsable des dommages directs et indirects causés au
              matériel de l'utilisateur, lors de l'accès au site.
            </p>
            <p>
              AFRICA ENERGY S.A.U décline toute responsabilité quant à l'utilisation qui pourrait être faite des
              informations et contenus présents sur le site.
            </p>
            <p>
              AFRICA ENERGY S.A.U s'engage à sécuriser au mieux le site ; sa responsabilité ne pourra toutefois être
              mise en cause si des données indésirables sont importées et installées sur son site à son insu.
            </p>
            <p>
              Des espaces interactifs (formulaire de contact, commentaires) sont à la disposition des utilisateurs.
              AFRICA ENERGY S.A.U se réserve le droit de supprimer, sans mise en demeure préalable, tout contenu déposé
              dans cet espace qui contreviendrait à la législation applicable, en particulier aux dispositions relatives
              à la protection des données. Le cas échéant, AFRICA ENERGY S.A.U se réserve également la possibilité de
              mettre en cause la responsabilité civile et/ou pénale de l'utilisateur, notamment en cas de message à
              caractère raciste, injurieux, diffamant ou pornographique, quel que soit le support utilisé (texte,
              photographie, etc.).
            </p>
          </Section>

          <Section num="4" title="Protection des données personnelles">
            <p>
              Conformément aux dispositions de la loi 78-17 du 6 janvier 1978 modifiée, l'utilisateur du site dispose
              d'un droit d'accès, de modification et de suppression des informations collectées. Pour exercer ce droit,
              envoyez un message à notre Délégué à la Protection des Données : AFRICA ENERGY S.A.U â€“
              {' '}<a href="mailto:africaenergysau@gmail.com">africaenergysau@gmail.com</a>.
            </p>
            <p>
              Pour plus d'informations sur la façon dont nous traitons vos données (type de données, finalité,
              destinataire, durée de conservationâ€¦), consultez notre
              {' '}<Link to="/politique-de-confidentialite">politique de confidentialité</Link>.
            </p>
          </Section>

          <Section num="5" title="Liens hypertextes et cookies">
            <p>
              Le site contient des liens hypertextes vers dâ€™autres sites ; AFRICA ENERGY S.A.U dégage toute responsabilité
              à propos de ces liens externes ou des liens créés par dâ€™autres sites vers le présent site.
            </p>
            <p>
              La navigation sur le site est susceptible de provoquer l'installation de cookie(s) sur l'ordinateur de
              l'utilisateur. Un Â«â€¯cookieâ€¯Â» est un fichier de petite taille qui enregistre des informations relatives à
              la navigation d'un utilisateur sur un site. Les données ainsi obtenues permettent notamment d'obtenir des
              mesures de fréquentation.
            </p>
            <p>
              Vous avez la possibilité d'accepter ou de refuser les cookies en modifiant les paramètrès de votre
              navigateur. Aucun cookie ne sera déposé sans votre consentement. Les cookies sont conservés pour une
              durée maximale de treize (13) mois.
            </p>
            <p>
              Pour plus d'informations sur la façon dont nous faisons usage des cookies, consultez notre
              {' '}<Link to="/politique-de-confidentialite">politique de confidentialité</Link>.
            </p>
          </Section>

          <Section num="6" title="Droit applicable et juridiction compétente">
            <p>
              Tout litige en relation avec l'utilisation du site est soumis au droit guinéen. En dehors des cas où la
              loi ne le permet pas, il est fait attribution exclusive de juridiction aux tribunaux compétents de Conakry,
              République de Guinée.
            </p>
          </Section>

          <div className="alert alert-light border mt-5 mb-0 text-center" role="status">
            <i className="bi bi-shield-lock-fill text-warning me-2"></i>
            Une page dédiée à la <strong>politique de confidentialité</strong> sera bientôt disponible.
            Pour toute question, <Link to="/contact">contactez-nous</Link>.
          </div>
        </div>
      </section>
    </>
  )
}

export default Legal




