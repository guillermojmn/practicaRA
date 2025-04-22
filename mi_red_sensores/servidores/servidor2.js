const express = require('express');
const app = express();
const PORT = 3002;

app.use(express.json()); // Asegúrate de poder leer cuerpos JSON

app.post('/datos', (req, res) => {
    console.log(`📥 [3002] Datos recibidos:`, req.body);
    res.status(200).send('Recibido en servidor POST 3002');
});

app.listen(PORT, () => {
    console.log(`🚀 Servidor POST corriendo en http://localhost:${PORT}`);
});