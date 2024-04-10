const sgMail = require('@sendgrid/mail');

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const ADMIN_EMAIL = process.env.ADMIN_EMAIL;

const SENDER_EMAIL = process.env.SENDER_EMAIL;

async function sendDailyUserReport(newUsers) {
  try {
    console.log('Sending daily user report email...');

    // Prepare the email content
    const msg = {
      to: ADMIN_EMAIL,
      from: SENDER_EMAIL,
      subject: 'Daily User Report',
      text: `The following ${newUsers.length} new users were created in the last 24 hours:\n\n` +
            newUsers.map(user => `- ${user.name} (${user.email}), created on ${user.created_at}`).join('\n')
    };

    // Send the email
    await sgMail.send(msg);

    console.log('Daily user report email sent successfully');
  } catch (error) {
    console.error('Error sending daily user report email:', error);
    console.error('Error stack:', error.stack);
    throw error;
  }
}

module.exports = sendDailyUserReport;