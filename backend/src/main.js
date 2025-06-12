const express = require('express');
const db = require('./db');
const cors = require('cors');
const cookieParser = require('cookie-parser');

const initUserRoutes = require('./routes/users').initUserRoutes;
const menu = require('./routes/menu');
const table = require('./routes/table').initRoutesTable;
const reservations = require("./routes/reservations");
const slots = require('./routes/slots');

const app = express();
app.use(express.json());
app.use(cookieParser());

const allowedOrigins = [
    'self',
    'http://localhost',
    'http://localhost:3000',
    'http://localhost:3001',
]

app.use(cors({
    origin: function (origin, callback) {
        // Allow requests with no origin (like mobile apps or curl requests)
        if (!origin || allowedOrigins.includes(origin) || allowedOrigins.includes('self')) {
            return callback(null, true);
        }
        // If the origin is not allowed, return an error
        callback(new Error('Not allowed by CORS'));
    },
    credentials: true
}));

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

// Initialize user routes
initUserRoutes(app);
menu(app);
table(app);
reservations(app);
slots(app);

const port = 3000;
app.listen(port, () => {
console.log(`Serveur Express démarré sur le port ${port}`);
});