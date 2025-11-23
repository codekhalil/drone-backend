const express = require('express');
const router = express.Router();
const db = require('../db');

// Insert streetlight event
router.post('/', async (req, res) => {
  const { flight_id, time, lat, lon, lux, status } = req.body;

  try {
    const result = await db.query(
      `INSERT INTO streetlight_events 
        (flight_id, time, lat, lon, lux, status)
       VALUES ($1, $2, $3, $4, $5, $6)
       RETURNING *`,
      [flight_id, time, lat, lon, lux, status]
    );

    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get all streetlight events
router.get('/', async (req, res) => {
  try {
    const result = await db.query(
      `SELECT id, time, lat, lon, lux, status 
       FROM streetlight_events 
       ORDER BY time DESC`
    );
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
