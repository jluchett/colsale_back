const nodemailer = require('nodemailer');
require('dotenv').config();

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    type: 'OAuth2',
    user: process.env.GMAIL_USER,
    clientId: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET,
    refreshToken: process.env.REFRESH_TOKEN
  }
  });

const sendVerificationEmail = async (email, code, nombre) => {
   const mailOptions = {
      from: process.env.GMAIL_USER,
      to: email,
      subject: 'Código de verificación',
      text: `Hola ${nombre},\n\nUtiliza el siguiente codigo para activar tu usuario e iniciar sesion:\n\n${code}`
   };

   await transporter.sendMail(mailOptions);
};

module.exports = sendVerificationEmail;
