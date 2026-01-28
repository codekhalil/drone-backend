// routes/pothole_events.js
const express = require("express");
const router = express.Router();
const pool = require("../db");

// GET all pothole events
router.get("/", async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM pothole_events");
    res.json(result.rows);
  } catch (err) {
    console.error("Error fetching pothole events:", err);
    res.status(500).json({ error: "Failed to fetch pothole events" });
  }
});

// GET potholes by flight_id
router.get("/flight/:flight_id", async (req, res) => {
  const { flight_id } = req.params;
  try {
    const result = await pool.query(
      "SELECT * FROM pothole_events WHERE flight_id = $1",
      [flight_id]
    );
    res.json(result.rows);
  } catch (err) {
    console.error("Error fetching potholes for flight:", err);
    res.status(500).json({ error: "Failed to fetch potholes for flight" });
  }
});

module.exports = router;
