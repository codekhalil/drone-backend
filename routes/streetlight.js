const express = require('express');
const router = express.Router();
const db = require('../db');

// GET all streetlight events (or only OFF)
router.get('/', async (req, res) => {
  try {
    const result = await db.query(
      `SELECT id, timestamp, lat, lon, lux, status 
       FROM streetlight_events
       WHERE status = 'OFF'
       ORDER BY timestamp DESC`
    );
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
