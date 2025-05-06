const express = require('express');
const app = express();
const PORT = 3002;

// Middleware para poder manejar cuerpos JSON en POST
app.use(express.json());

// Ruta GET
app.get('/datos', (req, res) => {
    console.log(`📤 [3002] Solicitado (GET):`, req.query);
    res.status(200).json({
        message: 'Datos enviados desde servidor GET 3002',
        data: req.query // Devolver los parámetros de la URL como respuesta
    });
});

// Ruta POST
app.post('/datos', (req, res) => {
    console.log(`📥 [3002] Datos recibidos (POST):`, req.body);
    res.status(200).json({
        message: 'Datos recibidos en servidor POST 3002',
        data: req.body // Devolver los datos recibidos en el cuerpo del POST
    });
});

app.listen(PORT, () => {
    console.log(`🚀 Servidor GET y POST corriendo en http://localhost:${PORT}`);
});
