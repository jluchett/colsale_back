const express = require('express');
const cors = require('cors');
require('dotenv').config();

const authRouter = require('./src/routes/auth/authRoutes')

const app = express();

app.use(cors());
app.use(express.json());

app.use('/auth', authRouter);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Servidor en funcionamiento en http://localhost:${PORT}`);
});
