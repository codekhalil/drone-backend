const express = require('express');
const router = express.Router();
const db = require('../db');

// Insert GPS log
router.post('/', async (req, res) => {
  const { flight_id, time, lat, lon, alt, satellites } = req.body;

  try {
    const result = await db.query(
      `INSERT INTO gps_logs (flight_id, time, lat, lon, alt, satellites)
       VALUES ($1, $2, $3, $4, $5, $6)
       RETURNING *`,
      [flight_id, time, lat, lon, alt, satellites]
    );
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get GPS logs for a flight
router.get('/:flight_id', async (req, res) => {
  const { flight_id } = req.params;

  try {
    const result = await db.query(
      `SELECT * FROM gps_logs 
       WHERE flight_id = $1 
       ORDER BY time ASC`,
      [flight_id]
    );
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
