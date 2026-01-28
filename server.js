// index.js
const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

// Root test route
app.get("/", (req, res) => {
  res.send("Backend is running!");
});

// Routes
app.use("/pothole_events", require("./routes/pothole_events"));
app.use("/flights", require("./routes/flights"));
app.use("/streetlight_events", require("./routes/streetlight_events"));
app.use("/streetlights", require("./routes/streetlights")); // NEW ROUTE

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
