const jwt = require('jsonwebtoken');
require('dotenv').config();

// Función para generar el token JWT
function generarToken(usuario) {
    return jwt.sign(
        {
            userId: usuario.id,       // Información que irá en el payload del token
            email: usuario.email
        },
        process.env.JWT_SECRET,      // Clave secreta para firmar el token
        {
            expiresIn: process.env.JWT_EXPIRES_IN  // Tiempo de expiración del token
        }
    );
}

module.exports = {
  generarToken
};