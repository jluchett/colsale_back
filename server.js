const express = require('express');
const cors = require('cors');
require('dotenv').config();
const db = require('./src/database/db_conn')

const app = express();

app.use(cors());
app.use(express.json());

app.get('/api/test', async (req, res) => {
  try {
      const result = await db.query('SELECT NOW()');
      res.json({ message: 'Conexión exitosa', time: result.rows[0].now });
  } catch (error) {
      console.error('Error en la conexión', error);
      res.status(500).json({ message: 'Error en la conexión a la base de datos' });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Servidor en funcionamiento en http://localhost:${PORT}`);
});
