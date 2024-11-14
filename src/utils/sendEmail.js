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
      html: `
      <html>
      <body>
        <h1 style="color: #4CAF50;">¡Hola, ${nombre}!</h1>
        <p>Gracias por registrarte. Usa el siguiente código para activar tu cuenta:</p>
        <h2 style="color: #000;">${code}</h2>
        <p>Este código expirará en 10 minutos.</p>
        <br>
        <p>Saludos,</p>
        <p>El equipo de soporte</p>
      </body>
      </html>
    `
   };

   await transporter.sendMail(mailOptions);
};

module.exports = sendVerificationEmail;
