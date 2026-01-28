// routes/flights.js
const express = require("express");
const router = express.Router();
const pool = require("../db");

// GET all flights
router.get("/", async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM flights");
    res.json(result.rows);
  } catch (err) {
    console.error("Error fetching flights:", err);
    res.status(500).json({ error: "Failed to fetch flights" });
  }
});

// Optional: filter flights by start and end time
router.get("/filter", async (req, res) => {
  const { start, end } = req.query; // e.g., ?start=2026-01-01&end=2026-01-29
  try {
    const result = await pool.query(
      "SELECT * FROM flights WHERE start_time >= $1 AND end_time <= $2",
      [start, end]
    );
    res.json(result.rows);
  } catch (err) {
    console.error("Error filtering flights:", err);
    res.status(500).json({ error: "Failed to filter flights" });
  }
});

module.exports = router;
