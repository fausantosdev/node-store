require('dotenv').config()

const sgMail = require('@sendgrid/mail')

sgMail.setApiKey(process.env.SEND_GRID_KEY)

exports.send = async (to, subject, body) => {

    const msg = {
        to, // Para quem vai.
        from: process.env.EMAIL,// Quem está mandando.
        subject,
        html: body
    }

    sgMail.send(msg)
} 