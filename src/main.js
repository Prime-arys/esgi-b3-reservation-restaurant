const express = require('express');
const db = require('./db');

const app = express();
app.use(express.json());

(async () => {
    try {
        const connection = await db.getConnection();
        console.log('Server connection success');

        const [rows] = await db.query("Select * from tables");
        console.log("liste tables : ", rows);
        
        connection.release();
    } catch (err) {
        console.error('error : ', err.message);
    }
})();


//routes
app.get('/hello_world', (req, res) => {
    res.send("Hello World, Réservation de Table");
});

const port = 3000;
app.listen(port, () => {
console.log(`Serveur Express démarré sur le port ${port}`);
});