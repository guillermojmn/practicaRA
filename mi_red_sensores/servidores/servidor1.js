const express = require('express');
const app = express();
const PORT = 3001;

app.get('/datos', (req, res) => {
    console.log(`📤 [3001] Solicitado:`, req.query);
    res.status(200).json({
        message: 'Datos enviados desde servidor GET 3001',
        data: req.query // Devolver los parámetros de la URL como respuesta
    });
});

app.listen(PORT, () => {
    console.log(`🚀 Servidor GET corriendo en http://localhost:${PORT}`);
});
