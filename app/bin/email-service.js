require('dotenv').config()

const sgMail = require('@sendgrid/mail')

sgMail.setApiKey(process.env.SEND_GRID_KEY) 

exports.send = async (to, subject, body) => {

    const msg = {
        to,
        from: process.env.EMAIL,
        subject,
        html: body
    }

    sgMail.send(msg)
} 