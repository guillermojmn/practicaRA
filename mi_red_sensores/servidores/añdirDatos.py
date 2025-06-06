import psycopg2
from datetime import datetime, timedelta
import random

# Configuración de conexión (ajusta la contraseña si la cambiaste)
conn = psycopg2.connect(
    host="10.100.0.114",
    database="mqtt_storage",
    user="postgres",
    password="1234"  # 🔒 Cambia esto por la real
)

cur = conn.cursor()

# Tiempo actual
now = datetime.now()

# Insertar 25 datos simulados
for i in range(25):
    timestamp = now - timedelta(minutes=i)
    value = round(random.uniform(18.0, 25.0), 2)
    cur.execute(
        "INSERT INTO sensor_data (sensor_id, timestamp, value) VALUES (%s, %s, %s)",
        ('sensor1', timestamp, value)
    )

conn.commit()
cur.close()
conn.close()

print("✅ 25 datos insertados correctamente en sensor_data")
