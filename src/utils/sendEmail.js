const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    host: 'smtp.office365.com',
    port: 587,
    secure: false,
    auth: {
      user: process.env.REMITE,
      pass: process.env.CONTRA,
    },
    tls: {
      rejectUnauthorized: false,
    },
  });

const sendVerificationEmail = async (email, code, nombre) => {
   const mailOptions = {
      from: process.env.REMITE,
      to: email,
      subject: 'Código de verificación',
      text: `Hola ${nombre},\n\nUtiliza el siguiente codigo para activar tu usuario e iniciar sesion:\n\n${code}`
   };

   await transporter.sendMail(mailOptions);
};

module.exports = sendVerificationEmail;
