const db = require('../../database/db_conn');

async function verificarUsuario(email, codigo) {
    // Aquí iría la lógica para buscar el usuario en la base de datos y verificar la contraseña
    const query = 'SELECT * FROM usuarios WHERE email = $1 AND codigo_verificacion = $2';
    const result = await db.query(query, [email, codigo]);

    // Verifica si el usuario existe y retorna su información
    if (result.rows.length === 0) {
        return null;
    }
    return result.rows[0];
}

module.exports = {
    verificarUsuario
};
