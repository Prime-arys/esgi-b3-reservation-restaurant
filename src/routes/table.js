const db = require("../db");
const {authenticateJWTAdmin} = require("../utils/jwt");

async function createTable(req, res) {
    try {
        const {seats} = req.body;
        const [result] = await db.query(
            "INSERT INTO tables (seats) VALUES (?)",
            seats
        );
        res.status(201).json({
            id: result.insertId,
            seats,
        });
    } catch (err) {
        res.status(500).json({error: err.message});
    }
}

async function updateTable(req, res) {
    try {
        const {id} = req.params;
        const {seats} = req.body;

        const [result] = await db.query(
            "UPDATE tables SET seats = ? WHERE tables_id = ?",
            [seats, id]
        );
        if (result.affectedRows === 0) {
            return res.status(404).json({error: "table non trouvée"});
        }
        res.json({toto: id, tata: seats});
    } catch (err) {
        res.status(500).json({error: err.message});
    }
}

async function getTable(req, res) {
    try {
        const [rows] = await db.query("SELECT * from tables");
        res.json(rows);
    } catch (err) {
        res.status(500).json({error: err.message});
    }
}

// Récupérer les tables disponibles depuis la base de données
async function getAvailableTables() {
    const [tables] = await db.query(
        "SELECT * FROM tables WHERE NOT EXISTS(SELECT 1 FROM reservation_tables WHERE reservation_tables.tables_id = tables.tables_id) ORDER BY seats DESC"
    );
    return tables;
}

// Allouer les tables optimales selon la taille du groupe
function findOptimalTables(tables, groupSize) {
    const allocatedTables = [];
    const availableTables = [...tables];
    let remainingSize = groupSize;

    for (const table of availableTables) {
        if (remainingSize <= 0) break;

        if (table.seats <= remainingSize) {
            allocatedTables.push(table);
            remainingSize -= table.seats;

            const index = tables.findIndex(t => t.tables_id === table.tables_id);
            if (index !== -1) tables.splice(index, 1);
        }
    }

    if (remainingSize > 0 && tables.length > 0) {
        const smallestTable = tables.reverse().find(table => table.seats >= remainingSize);

        if (smallestTable) {
            allocatedTables.push(smallestTable);
            remainingSize -= smallestTable.seats;
        } else if (tables.length > 0) {
            allocatedTables.push(tables[0]);
            remainingSize -= tables[0].seats;
        }
    }

    return { allocatedTables, remainingSize };
}

async function allocateTable(req, res) {
    try {
        let { group_size } = req.params;
        group_size = parseInt(group_size, 10);

        const tables = await getAvailableTables();

        const { allocatedTables: allocated_tables, remainingSize } = findOptimalTables(tables, group_size);

        if (remainingSize <= 0) {
            res.json({ allocated_tables });
        } else {
            return res.status(403).json({
                allocated_tables,
                error: "Pas assez de place pour le nombre de personnes restantes",
                remaining_group_size: remainingSize,
            });
        }
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}

async function allocateTableReservation(group_size) {
    try {
        group_size = parseInt(group_size, 10);

        const tables = await getAvailableTables();

        const { allocatedTables: allocated_tables, remainingSize } = findOptimalTables(tables, group_size);

        if (remainingSize <= 0) {
            return {
                success: true,
                allocated_tables
            };
        } else {
            return {
                success: false,
                allocated_tables,
                error: "Pas assez de place pour le nombre de personnes restantes",
                remaining_group_size: remainingSize
            };
        }
    } catch (err) {
        return {
            success: false,
            error: err.message
        };
    }
}

function initRoutesTable(app) {
    app.post("/api/table", authenticateJWTAdmin, createTable);
    app.get("/api/table", authenticateJWTAdmin, getTable);
    app.put("/api/table/:id", authenticateJWTAdmin, updateTable);
    app.get("/api/table/:group_size", authenticateJWTAdmin, allocateTable);
}

module.exports = {initRoutesTable, allocateTableReservation};
