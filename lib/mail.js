    
const sgMail = require('@sendgrid/mail');
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

// add send genric email

module.exports = {
    sgMail
}
