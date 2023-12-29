const nodemailer = require('nodemailer');
require('dotenv').config()
const sendEmailUtility = async (EmailTo, EmailText, EmailSubject) => {
    console.log();
    // create a transporter
    const transporter = nodemailer.createTransport({
        service: "gmail",
        host: 'smtp.gmail.com',
        port: 587,
        secure: false,
        auth: {
            user: process.env.SMTP_USER,
            pass: process.env.SMTP_PASSWORD
        }
    });


    // Define Email Options
    const mailOptions = {
        from: 'Inventory Management, <inventory.inventory@gmail.com>',
        to: EmailTo,
        subject: EmailSubject,
        html: EmailText
    }

    const result = await transporter.sendMail(mailOptions);
    console.log(result);
}

module.exports = sendEmailUtility;