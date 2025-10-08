const { Resend } = require('resend');
require('dotenv').config();

const resend = new Resend(process.env.RESEND_API_KEY);

async function sendMail({ to, subject, html }) {
  try {
    const response = await resend.emails.send({
      from: 'Recyclify<onboarding@resend.dev>',
      to,
      subject,
      html,
    });
    console.log('✅ Email sent:', response);
    return response;
  } catch (error) {
    console.error('❌ Email sending failed:', error);
    throw error;
  }
}

module.exports = sendMail;
