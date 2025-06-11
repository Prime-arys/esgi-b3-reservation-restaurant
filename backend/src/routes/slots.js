const db = require("../db");
const {authenticateJWTAdmin} = require("../utils/jwt");

async function getSlots(req, res) {
  try {
    const [rows] = await db.query("SELECT * from opening_slots");
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

async function createSlot(req, res) {
  try {
    const { date_time, duration, available, comment } = req.body;
    const [result] = await db.query("INSERT INTO opening_slots SET ?", {
      date_time,
      duration,
      available,
      comment,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }

  res.status(201).json({ message: 'Slot created successfully' });
}

async function updateSlot(req, res) {
    try {
        const {id_slot} = req.params;
        const { date_time, duration, available, comment } = req.body;
        const [result] = await db.query("UPDATE opening_slots SET ? WHERE ?",
            [{date_time, duration, available, comment}, id_slot]
        );
    } catch (err) {
        res.status(500).json({error: err.message});
    }

    res.status(201).json({message: 'Slot modified successfully'});
}

async function deleteSlot(req, res) {
    try {
        const {id_slot} = req.params;
        const [result] = await db.query("DELETE FROM opening_slots WHERE slot_id=?",
            [id_slot]
        );
        
        if (result.affectedRows === 0) {
            return res.status(404).json({message: 'Slot not found'});
        }
        
        return res.status(200).json({message: 'Slot deleted successfully'});
    } catch (err) {
        return res.status(500).json({error: err.message});
    }
}

async function getAvailability(req, res) {
    try {
        const {date_} = req.params;
        const [result] = await db.query(
            "SELECT * FROM opening_slots WHERE date_time=?",
            [date_]
        );
        res.status(200).json(result);
    } catch (err) {
        return res.status(500).json({error: err.message});
    }
}

function init_routes_slots(app) {
  app.get("/api/slots", authenticateJWTAdmin, getSlots);
  app.post("/api/slot", authenticateJWTAdmin, createSlot);
  app.put("/api/slot/:id_slot", authenticateJWTAdmin, updateSlot);
  app.delete("/api/slot/:id_slot", authenticateJWTAdmin, deleteSlot);
  app.get("/api/availability/:date_", authenticateJWTAdmin, getAvailability);
}

module.exports = init_routes_slots;
