// routes/streetlights.js
const express = require("express");
const router = express.Router();
const pool = require("../db");

// GET all streetlights
router.get("/", async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM streetlights");
    res.json(result.rows);
  } catch (err) {
    console.error("Error fetching streetlights:", err);
    res.status(500).json({ error: "Failed to fetch streetlights" });
  }
});

module.exports = router;
