// En controllers/authController.js
const db = require('../../database/db_conn'); // Aquí conectarías a tu base de datos PostgreSQL
const crypto = require('crypto');
const sendVerificationEmail = require('../../utils/sendEmail'); // Función para enviar email

const registerUser = async (req, res) => {
   const { email, nombre } = req.body;
   
   try {
      // Verificar si el usuario ya está registrado
      const userExists = await db.query('SELECT * FROM usuarios WHERE email = $1', [email]);
      if (userExists.rowCount > 0) {
         return res.status(400).json({ message: 'El usuario ya está registrado, revise su email' });
      }

      // Generar código de verificación
      const code = crypto.randomBytes(3).toString('hex');

      // Guardar el usuario en la base de datos
      await db.query(
         'INSERT INTO usuarios (email, nombre, codigo_verificacion) VALUES ($1, $2, $3)',
         [email, nombre, code]
      );

      // Enviar el código de verificación por email
      await sendVerificationEmail(email, code, nombre);

      res.status(201).json({ message: 'Usuario registrado. Verifique su correo electrónico para activar usuario' });
   } catch (error) {
      console.error('Error al registrar usuario:', error);
      res.status(500).json({ message: 'Error interno del servidor.' });
   }
};

module.exports = registerUser;