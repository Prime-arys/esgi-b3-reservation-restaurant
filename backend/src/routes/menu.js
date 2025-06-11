const db = require('../db');

async function get_menu(req, res) {
    try {
        const [rows] = await db.query("SELECT * from menu_items order by category");
        res.json(rows);
    } catch (err) {
        res.status(500).json({error: err.message});
    }
}

function init_route_menu(app) {
    app.get("/api/menu", get_menu);
}

module.exports = init_route_menu;