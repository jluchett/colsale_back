const express = require('express');
const cors = require('cors');

const app = express();

app.use(cors());
app.use(express.json());

app.get('/api/test', async (req, res) => {
    try {
        res.json({ message: 'Conexión exitosa' });
    } catch (error) {
        console.error('Error en la conexión', error);
        res.status(500).json({ message: 'Error en la conexión ' });
    }
});

app.listen(5000, () => {
    console.log(`Servidor en funcionamiento en http://localhost:${5000}`);
});
