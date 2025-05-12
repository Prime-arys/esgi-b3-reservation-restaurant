const db = require('../db');

function init_route_menu(app) {
    app.get("api/menu", async (req, res) => {
        try {
            const [rows] = await db.query("SELECT * from menu_items order by category");
            res.json(rows);
        } catch (err) {
            res.status(500).json({error: err.message});
        }
    })
}

module.exports = init_route_menu;