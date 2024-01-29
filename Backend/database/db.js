import mysql2 from 'mysql2'

export const db = mysql2.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'HolaC666*',
    database: 'demo_reto'
})  

// Manejar eventos de la conexión
db.connect((err) => {
    if (err) {
        console.error('Error al conectar a la base de datos:', err);
        return;
    }
    console.log('Conexión a la base de datos exitosa');
});