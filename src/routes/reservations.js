const db = require('../db');
const { allocateTableReservation } = require('./table');
const authenticateJWT = require('../utils/jwt').authenticateJWT;

"use strict";

// Récupération de toutes les réservations (admin uniquement)
async function getReservations(req, res) {
    try {
        const [reservations] = await db.query("SELECT * FROM reservations");
        res.json(reservations);
    } catch (error) {
        console.error("Erreur lors de la récupération des réservations:", error.message);
        res.status(500).json({error: "Erreur lors de la récupération des réservations"});
    }
}

// Récupération d'une réservation par son utilisateur connecté
async function getReservationByUser(req, res) {
    try {
        const user_id = 1;
        if (user_id === null) {
            return res.status(404).json({error: "Veuillez vous connecter"})
        }

        const [reservations] = await db.query("SELECT * FROM reservations WHERE user_id = ?", [user_id]);

        if (reservations.length === 0) {
            return res.status(404).json({error: "Réservations non trouvée"});
        }

        res.json(reservations);
    } catch (error) {
        console.error("Erreur lors de la récupération de la réservation:", error.message);
        res.status(500).json({error: "Erreur lors de la récupération de la réservation"});
    }
}

// Création d'une réservation
async function createReservation(req, res) {
    try {
        const {name, phone, number_of_people, date, time, note} = req.body;

        if (!name || !phone || !number_of_people || !date || !time || !note) {
            return res.status(400).json({error: "Tous les champs sont requis"});
        }


        let tableResponse;
        try {
            tableResponse = await allocateTableReservation(number_of_people);

            if (!tableResponse || !tableResponse.allocated_tables) {
                return res.status(400).json({error: "Impossible d'allouer des tables pour cette réservation"});
            }
        } catch (tableError) {
            console.log(tableError);
            return res.status(400).json({error: "Impossible d'allouer des tables pour cette réservation"});
        }

        if (tableResponse.error) {
            return res.status(400).json({
                error: "Pas assez de tables disponibles pour ce nombre de personnes",
                details: tableResponse.error
            });
        }


        const result = await db.query(
            "INSERT INTO reservations (user_id, number_of_people, date_, time_, status) VALUES (1, ?, ?, ?, 'PENDING')",
            [number_of_people, date, time]
        );

        res.status(201).json({message: "Réservation créée avec succès", reservationId: result.insertId});
    } catch (error) {
        console.error("Erreur lors de la création de la réservation:", error.message);
        res.status(500).json({error: "Erreur lors de la création de la réservation"});
    }
}

// Modification d'une réservation
async function updateReservation(req, res) {
    try {
        const [reservation] = await db.query(
            "SELECT * FROM reservations WHERE reservation_id = ? AND status = 'PENDING'",
            [req.params.id]
        );

        if (reservation.length === 0) {
            return res.status(404).json({error: "Réservation non trouvée ou déjà confirmée"});
        }

        const {name, phone, number_of_people, date, time, note} = req.body;

        if (!name || !phone || !number_of_people || !date || !time || !note) {
            return res.status(400).json({error: "Tous les champs sont requis"});
        }

        await db.query(
            "UPDATE reservations SET number_of_people = ?, date_ = ?, time_ = ? WHERE reservation_id = ?",
            [number_of_people, date, time, req.params.id]
        );

        res.json({message: "Réservation mise à jour avec succès"});
    } catch (error) {
        console.error("Erreur lors de la modification de la réservation:", error.message);
        res.status(500).json({error: "Erreur lors de la modification de la réservation"});
    }
}

// Suppression d'une réservation
async function deleteReservation(req, res) {
    try {
        const [result] = await db.query(
            "DELETE FROM reservations WHERE reservation_id = ?",
            [req.params.id]
        );

        if (result.affectedRows === 0) {
            return res.status(404).json({error: "Réservation non trouvée"});
        }

        res.json({message: "Réservation annulée avec succès"});
    } catch (error) {
        console.error("Erreur lors de l'annulation de la réservation:", error.message);
        res.status(500).json({error: "Erreur lors de l'annulation de la réservation"});
    }
}

// Validation d'une réservation (admin uniquement)
async function validateReservation(req, res) {
    try {
        const [reservation] = await db.query(
            "SELECT * FROM reservations WHERE reservation_id = ?",
            [req.params.id]
        );

        if (reservation.length === 0) {
            return res.status(404).json({error: "Réservation non trouvée"});
        }

        await db.query(
            "UPDATE reservations SET status = 'CONFIRMED' WHERE reservation_id = ?",
            [req.params.id]
        );

        res.json({message: "Réservation confirmée avec succès"});
    } catch (error) {
        console.error("Erreur lors de la validation de la réservation:", error.message);
        res.status(500).json({error: "Erreur lors de la validation de la réservation"});
    }
}

function initReservation(app) {
    app.get("/reservations", authenticateJWT, getReservations);
    app.get("/my-reservations", authenticateJWT, getReservationByUser);
    app.post("/reservations", authenticateJWT, createReservation);
    app.put("/reservations/:id", authenticateJWT, updateReservation);
    app.delete("/reservations/:id", authenticateJWT, deleteReservation);
    app.patch("/reservations/:id/validate", authenticateJWT, validateReservation);
}

module.exports = initReservation;