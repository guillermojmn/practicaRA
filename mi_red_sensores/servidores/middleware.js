const mqtt = require('mqtt');
const { Client } = require('pg');

// Configuración de la conexión a Mosquitto
const MQTT_BROKER = 'mqtt://localhost';  // Dirección de tu broker Mosquitto
const MQTT_TOPIC = 'sensor/#';  // Topic para suscribirse

// Configuración de la conexión a PostgreSQL
const PG_CLIENT = new Client({
    host: 'localhost',
    database: 'mqtt_storage',  // Nombre de tu base de datos PostgreSQL
    user: 'postgres',
    password: '1234',
    port: 5432
});

// Conectar a PostgreSQL
PG_CLIENT.connect()
    .then(() => {
        console.log('Conectado a PostgreSQL');
    })
    .catch(err => {
        console.error('Error al conectar a PostgreSQL:', err);
        process.exit(1);
    });

// Conectar a Mosquitto
const client = mqtt.connect(MQTT_BROKER);

client.on('connect', () => {
    console.log('Conectado a Mosquitto');
    client.subscribe(MQTT_TOPIC, (err) => {
        if (err) {
            console.error('Error al suscribirse al topic:', err);
        } else {
            console.log(`Suscrito al topic ${MQTT_TOPIC}`);
        }
    });
});

// Manejar los mensajes que llegan a través de MQTT
client.on('message', (topic, message) => {
    // Parsear el mensaje de JSON
    const payload = JSON.parse(message.toString());
    console.log('Mensaje recibido:', payload);

    // Insertar los datos en PostgreSQL
    const query = 'INSERT INTO sensor_data (sensor_id, timestamp, value) VALUES ($1, $2, $3)';
    const values = [payload.sensor_id, payload.timestamp, payload.value];

    PG_CLIENT.query(query, values)
        .then(res => {
            console.log('Datos insertados en la base de datos');
        })
        .catch(err => {
            console.error('Error al insertar datos en PostgreSQL:', err);
        });
});

// Manejo de errores de conexión de MQTT
client.on('error', (err) => {
    console.error('Error en la conexión MQTT:', err);
});
