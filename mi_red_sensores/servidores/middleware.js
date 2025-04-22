module.exports = function(req, res, next) {
    // Aquí definimos el criterio de redirección
    const sensor = req.body.sensor;

    // Si el sensor es 'temp', redirige al servidor 1
    if (sensor === 'temp') {
        req.url = '/datos';  // Aseguramos que el endpoint sea correcto
        req.headers['Host'] = 'localhost:3001';  // Redirigimos a 3001
        console.log(`🔄 Redirigiendo datos del sensor '${sensor}' a http://localhost:3001`);
    }
    // Si el sensor es 'hum', redirige al servidor 2
    else if (sensor === 'hum') {
        req.url = '/datos';
        req.headers['Host'] = 'localhost:3002';  // Redirigimos a 3002
        console.log(`🔄 Redirigiendo datos del sensor '${sensor}' a http://localhost:3002`);
    }
    // Si el sensor no es válido, dejamos que el proceso continue sin hacer nada
    else {
        console.log(`❌ Sensor no válido: ${sensor}`);
        return res.status(400).send('Sensor no válido');
    }

    next();  // Continúa con la siguiente función en el stack
};