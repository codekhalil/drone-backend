const express = require('express');
const cors = require('cors');
const db = require('./db');  // <-- this connects to Neon

const app = express();

app.use(cors());
app.use(express.json());

// Basic root endpoint
app.get('/', (req, res) => {
  res.send('Backend is running!');
});

// Database test endpoint
app.get('/test-db', async (req, res) => {
  try {
    const result = await db.query('SELECT NOW()');
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
