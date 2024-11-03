const authService = require('../../services/auth/authService');
const userService = require('../../services/user/userService');

async function login(req, res) {
    const { email, codigo } = req.body;

    try {
        // Verifica las credenciales del usuario usando userService
        const usuario = await userService.verificarUsuario(email, codigo);

        if (!usuario) {
            return res.status(401).json({ error: 'Credenciales incorrectas' });
        }

        // Genera el token JWT
        const token = authService.generarToken(usuario);

        // Envía el token en la respuesta
        res.json({
            message: 'Inicio de sesión exitoso',
            token
        });
    } catch (error) {
        res.status(500).json({ error: 'Error en el servidor' });
    }
}

module.exports = login;
