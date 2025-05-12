const db = require("../db");

function init_routes_table(app) {
  init_route_create_table(app);
  init_route_update_table(app);
  init_route_get_table(app);
  init_route_allocate_table(app);
}

function init_route_create_table(app) {
  app.post("/api/table", async (req, res) => {
    try {
      const { seats } = req.body;
      const [result] = await db.query(
        "INSERT INTO tables (seats) VALUES (?)",
        seats
      );
      res.status(201).json({
        id: result.insertId,
        seats,
      });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });
}

function init_route_update_table(app) {
  app.put("/api/table/:id", async (req, res) => {
    try {
      const { id } = req.params;
      const { seats } = req.body;

      const [result] = await db.query(
        "UPDATE tables SET seats = ? WHERE tables_id = ?",
        [seats, id]
      );
      if (result.affectedRows === 0) {
        return res.status(404).json({ error: "table non trouvée" });
      }
      res.json({ toto: id, tata: seats });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });
}

function init_route_get_table(app) {
  app.get("/api/table", async (req, res) => {
    try {
      const [rows] = await db.query("SELECT * from tables");
      res.json(rows);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });
}

function init_route_allocate_table(app) {
  app.get("/api/table/:group_size", async (req, res) => {
    try {
      let allocated_tables = [];
      let { group_size } = req.params;
      group_size = parseInt(group_size, 10);

      const [tables] = await db.query(
        "select * from tables where not exists(SELECT 1 from reservation_tables where reservation_tables.tables_id = tables.tables_id) order by seats DESC"
      );

      const availableTables = [...tables];
      let remainingSize = group_size;
      
      for (const table of availableTables) {
        if (remainingSize <= 0) break;
        
        if (table.seats <= remainingSize) {
          allocated_tables.push(table);
          remainingSize -= table.seats;
          
          const index = tables.findIndex(t => t.tables_id === table.tables_id);
          if (index !== -1) tables.splice(index, 1);
        }
      }

      
      if (remainingSize > 0 && tables.length > 0) {
        const smallestTable = tables.reverse().find(table => table.seats >= remainingSize);
        
        if (smallestTable) {
          allocated_tables.push(smallestTable);
          remainingSize -= smallestTable.seats;
        } else if (tables.length > 0) {
          allocated_tables.push(tables[0]);
          remainingSize -= tables[0].seats;
        }
      }

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
  });
}

module.exports = init_routes_table;
