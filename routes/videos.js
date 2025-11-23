const express = require('express');
const router = express.Router();
const db = require('../db');

// Insert video metadata
router.post('/', async (req, res) => {
  const { flight_id, file_url, start_time, end_time } = req.body;

  try {
    const result = await db.query(
      `INSERT INTO videos (flight_id, file_url, start_time, end_time)
       VALUES ($1, $2, $3, $4)
       RETURNING *`,
      [flight_id, file_url, start_time, end_time]
    );
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
