const express = require('express');
const router = express.Router();
const db = require('../db');

// Start a flight
router.post('/start', async (req, res) => {
  const { mode } = req.body;

  try {
    const result = await db.query(
      `INSERT INTO flights (mode) VALUES ($1) RETURNING *`,
      [mode]
    );
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// End a flight
router.post('/end', async (req, res) => {
  const { flight_id } = req.body;

  try {
    const result = await db.query(
      `UPDATE flights 
       SET end_time = NOW() 
       WHERE id = $1 
       RETURNING *`,
      [flight_id]
    );
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
