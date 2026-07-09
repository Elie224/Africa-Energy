import nodemailer from 'nodemailer'

let transporter = null

export const getTransporter = () => {
  if (transporter) return transporter
  if (!process.env.SMTP_HOST || !process.env.SMTP_USER || !process.env.SMTP_PASS) {
    return null
  }
  transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT) || 465,
    secure: process.env.SMTP_SECURE !== 'false',
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS
    }
  })
  return transporter
}

export const sendContactEmail = async ({ nom, email, telephone, entreprise, produit, message }) => {
  const to = process.env.CONTACT_TO || 'africaenergysau@gmail.com'
  const subject = `[Africa Energy] Demande de devis - ${nom}`
  const text = [
    'Nouvelle demande de devis recue sur africa-energy.com',
    '',
    'Nom       : ' + nom,
    'Email     : ' + email,
    'Telephone : ' + telephone,
    'Entreprise: ' + (entreprise || '-'),
    'Produit   : ' + (produit || '-'),
    '',
    'Message :',
    message,
    '',
    '--',
    'Envoye depuis le formulaire de contact.'
  ].join('\n')

  const html = `
    <h2>Nouvelle demande de devis</h2>
    <table style="border-collapse:collapse;font-family:sans-serif">
      <tr><td><strong>Nom</strong></td><td style="padding-left:12px">${escape(nom)}</td></tr>
      <tr><td><strong>Email</strong></td><td style="padding-left:12px"><a href="mailto:${escape(email)}">${escape(email)}</a></td></tr>
      <tr><td><strong>Telephone</strong></td><td style="padding-left:12px">${escape(telephone)}</td></tr>
      <tr><td><strong>Entreprise</strong></td><td style="padding-left:12px">${escape(entreprise || '-')}</td></tr>
      <tr><td><strong>Produit</strong></td><td style="padding-left:12px">${escape(produit || '-')}</td></tr>
    </table>
    <h3>Message</h3>
    <p style="white-space:pre-wrap;font-family:sans-serif">${escape(message)}</p>
  `

  const tx = getTransporter()
  if (!tx) {
    console.warn('[mail] SMTP non configure - email non envoye (mode dev)')
    console.log(text)
    return { queued: false }
  }
  await tx.sendMail({
    from: `"Site Africa Energy" <${process.env.SMTP_USER}>`,
    to,
    replyTo: email,
    subject,
    text,
    html
  })
  return { queued: true }
}

const escape = (s) => String(s ?? '').replace(/[&<>"']/g, (c) => ({
  '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;'
}[c]))
