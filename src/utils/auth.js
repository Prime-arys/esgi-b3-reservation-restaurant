const User = require("../class/User");
const db = require("../db");

async function getUserById(userId) {
    try {
        const [rows] = await db.query("SELECT * FROM users WHERE user_id = ?", [userId]);
        if (rows.length === 0) {
            return null; // User not found
        }
        return User.fromDbRow(rows[0]);
    } catch (error) {
        console.error("Error fetching user by ID:", error);
        throw new Error("Database error");
    }
}

module.exports = {
    getUserById,
};