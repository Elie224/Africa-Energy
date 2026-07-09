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
          <h1>Mentions lÃ©gales</h1>
          <p className="mt-3" style={{ fontSize: '1.15rem', opacity: 0.95 }}>
            DerniÃ¨re mise Ã  jour : juillet 2026
          </p>
        </div>
      </section>

      <section className="section-padding" style={{ backgroundColor: '#FAFAFA' }}>
        <div className="container" style={{ maxWidth: 920 }}>
          <Section num="1" title="Ã‰dition du site">
            <p>
              ConformÃ©ment Ã  l'article 6 de la loi nÂ° 2004-575 du 21 juin 2004 pour la confiance dans l'Ã©conomie numÃ©rique,
              il est prÃ©cisÃ© aux utilisateurs du site l'identitÃ© des diffÃ©rents intervenants dans le cadre de sa rÃ©alisation
              et de son suivi.
            </p>

            <p><strong style={{ color: 'var(--ae-blue-dark)' }}>PropriÃ©taire du site :</strong><br />
              AFRICA ENERGY S.A.U<br />
              SociÃ©tÃ© Anonyme Unipersonnelle avec Administrateur GÃ©nÃ©ral<br />
              RCCM NÂ° GN.TCC.2025.B.18185 â€“ FormalitÃ© NÂ° GN.TCC.2025.20590<br />
              SiÃ¨ge social : Quartier Almamya, Commune de Kaloum, Conakry, RÃ©publique de GuinÃ©e<br />
              Contact : <a href="tel:+224612368058">+224 612 368 058</a> â€“ <a href="mailto:africaenergysau@gmail.com">africaenergysau@gmail.com</a>
            </p>

            <p><strong style={{ color: 'var(--ae-blue-dark)' }}>Identification de l'entreprise :</strong><br />
              AFRICA ENERGY S.A.U â€“ SociÃ©tÃ© Anonyme Unipersonnelle avec Administrateur GÃ©nÃ©ral â€“
              DurÃ©e : 99 ans Ã  compter du 23 dÃ©cembre 2025.
            </p>

            <p><strong style={{ color: 'var(--ae-blue-dark)' }}>Directeur de la publication :</strong><br />
              Monsieur Jean Baptiste HABA, Administrateur GÃ©nÃ©ral d'AFRICA ENERGY S.A.U<br />
              Contact : <a href="tel:+224612368058">+224 612 368 058</a> â€“ <a href="mailto:africaenergysau@gmail.com">africaenergysau@gmail.com</a>
            </p>

            <p><strong style={{ color: 'var(--ae-blue-dark)' }}>HÃ©bergeur :</strong><br />
              Ã€ complÃ©ter â€“ nom de l'hÃ©bergeur, adresse et tÃ©lÃ©phone.
            </p>

            <p><strong style={{ color: 'var(--ae-blue-dark)' }}>DÃ©lÃ©guÃ© Ã  la protection des donnÃ©es :</strong><br />
              AFRICA ENERGY S.A.U â€“ <a href="mailto:africaenergysau@gmail.com">africaenergysau@gmail.com</a>
            </p>
          </Section>

          <Section num="2" title="PropriÃ©tÃ© intellectuelle et contrefaÃ§ons">
            <p>
              AFRICA ENERGY S.A.U est propriÃ©taire des droits de propriÃ©tÃ© intellectuelle et dÃ©tient les droits d'usage
              sur tous les Ã©lÃ©ments accessibles sur le site, notamment les textes, images, graphismes, logos, vidÃ©os,
              architecture, icÃ´nes et sons.
            </p>
            <p>
              Toute reproduction, reprÃ©sentation, modification, publication, adaptation de tout ou partie des Ã©lÃ©ments
              du site, quel que soit le moyen ou le procÃ©dÃ© utilisÃ©, est interdite, sauf autorisation Ã©crite prÃ©alable
              d'AFRICA ENERGY S.A.U.
            </p>
            <p>
              Toute exploitation non autorisÃ©e du site ou de l'un quelconque des Ã©lÃ©ments qu'il contient sera considÃ©rÃ©e
              comme constitutive d'une contrefaÃ§on et poursuivie conformÃ©ment aux dispositions des articles L.335-2 et
              suivants du Code de la PropriÃ©tÃ© Intellectuelle.
            </p>
          </Section>

          <Section num="3" title="Limitations de responsabilitÃ©">
            <p>
              AFRICA ENERGY S.A.U ne pourra Ãªtre tenue pour responsable des dommages directs et indirects causÃ©s au
              matÃ©riel de l'utilisateur, lors de l'accÃ¨s au site.
            </p>
            <p>
              AFRICA ENERGY S.A.U dÃ©cline toute responsabilitÃ© quant Ã  l'utilisation qui pourrait Ãªtre faite des
              informations et contenus prÃ©sents sur le site.
            </p>
            <p>
              AFRICA ENERGY S.A.U s'engage Ã  sÃ©curiser au mieux le site ; sa responsabilitÃ© ne pourra toutefois Ãªtre
              mise en cause si des donnÃ©es indÃ©sirables sont importÃ©es et installÃ©es sur son site Ã  son insu.
            </p>
            <p>
              Des espaces interactifs (formulaire de contact, commentaires) sont Ã  la disposition des utilisateurs.
              AFRICA ENERGY S.A.U se rÃ©serve le droit de supprimer, sans mise en demeure prÃ©alable, tout contenu dÃ©posÃ©
              dans cet espace qui contreviendrait Ã  la lÃ©gislation applicable, en particulier aux dispositions relatives
              Ã  la protection des donnÃ©es. Le cas Ã©chÃ©ant, AFRICA ENERGY S.A.U se rÃ©serve Ã©galement la possibilitÃ© de
              mettre en cause la responsabilitÃ© civile et/ou pÃ©nale de l'utilisateur, notamment en cas de message Ã 
              caractÃ¨re raciste, injurieux, diffamant ou pornographique, quel que soit le support utilisÃ© (texte,
              photographie, etc.).
            </p>
          </Section>

          <Section num="4" title="Protection des donnÃ©es personnelles">
            <p>
              ConformÃ©ment aux dispositions de la loi 78-17 du 6 janvier 1978 modifiÃ©e, l'utilisateur du site dispose
              d'un droit d'accÃ¨s, de modification et de suppression des informations collectÃ©es. Pour exercer ce droit,
              envoyez un message Ã  notre DÃ©lÃ©guÃ© Ã  la Protection des DonnÃ©es : AFRICA ENERGY S.A.U â€“
              {' '}<a href="mailto:africaenergysau@gmail.com">africaenergysau@gmail.com</a>.
            </p>
            <p>
              Pour plus d'informations sur la faÃ§on dont nous traitons vos donnÃ©es (type de donnÃ©es, finalitÃ©,
              destinataire, durÃ©e de conservationâ€¦), consultez notre
              {' '}<Link to="/politique-de-confidentialite">politique de confidentialitÃ©</Link>.
            </p>
          </Section>

          <Section num="5" title="Liens hypertextes et cookies">
            <p>
              Le site contient des liens hypertextes vers dâ€™autres sites ; AFRICA ENERGY S.A.U dÃ©gage toute responsabilitÃ©
              Ã  propos de ces liens externes ou des liens crÃ©Ã©s par dâ€™autres sites vers le prÃ©sent site.
            </p>
            <p>
              La navigation sur le site est susceptible de provoquer l'installation de cookie(s) sur l'ordinateur de
              l'utilisateur. Un Â«â€¯cookieâ€¯Â» est un fichier de petite taille qui enregistre des informations relatives Ã 
              la navigation d'un utilisateur sur un site. Les donnÃ©es ainsi obtenues permettent notamment d'obtenir des
              mesures de frÃ©quentation.
            </p>
            <p>
              Vous avez la possibilitÃ© d'accepter ou de refuser les cookies en modifiant les paramÃ¨trÃ¨s de votre
              navigateur. Aucun cookie ne sera dÃ©posÃ© sans votre consentement. Les cookies sont conservÃ©s pour une
              durÃ©e maximale de treize (13) mois.
            </p>
            <p>
              Pour plus d'informations sur la faÃ§on dont nous faisons usage des cookies, consultez notre
              {' '}<Link to="/politique-de-confidentialite">politique de confidentialitÃ©</Link>.
            </p>
          </Section>

          <Section num="6" title="Droit applicable et juridiction compÃ©tente">
            <p>
              Tout litige en relation avec l'utilisation du site est soumis au droit guinÃ©en. En dehors des cas oÃ¹ la
              loi ne le permet pas, il est fait attribution exclusive de juridiction aux tribunaux compÃ©tents de Conakry,
              RÃ©publique de GuinÃ©e.
            </p>
          </Section>

          <div className="alert alert-light border mt-5 mb-0 text-center" role="status">
            <i className="bi bi-shield-lock-fill text-warning me-2"></i>
            Une page dÃ©diÃ©e Ã  la <strong>politique de confidentialitÃ©</strong> sera bientÃ´t disponible.
            Pour toute question, <Link to="/contact">contactez-nous</Link>.
          </div>
        </div>
      </section>
    </>
  )
}

export default Legal




