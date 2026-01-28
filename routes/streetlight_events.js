// routes/streetlight_events.js
const express = require("express");
const router = express.Router();
const pool = require("../db");

// GET all streetlight events
router.get("/", async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM streetlight_events");
    res.json(result.rows);
  } catch (err) {
    console.error("Error fetching streetlight events:", err);
    res.status(500).json({ error: "Failed to fetch streetlight events" });
  }
});

// GET streetlight events by flight_id
router.get("/flight/:flight_id", async (req, res) => {
  const { flight_id } = req.params;
  try {
    const result = await pool.query(
      "SELECT * FROM streetlight_events WHERE flight_id = $1",
      [flight_id]
    );
    res.json(result.rows);
  } catch (err) {
    console.error("Error fetching streetlight events for flight:", err);
    res.status(500).json({ error: "Failed to fetch streetlight events for flight" });
  }
});

module.exports = router;
