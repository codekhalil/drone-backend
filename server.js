const express = require('express');
const cors = require('cors');
const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Root test route
app.get('/', (req, res) => {
  res.send('Backend is running!');
});

// ROUTES
app.use('/flights', require('./routes/flights'));
app.use('/gps', require('./routes/gps'));
app.use('/streetlight-events', require('./routes/streetlights'));
app.use('/videos', require('./routes/videos'));

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
