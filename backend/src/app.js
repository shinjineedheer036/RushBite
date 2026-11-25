const express = require("express");
const cors = require("cors");

const app = express();

// Global middleware
app.use(cors());
app.use(express.json());

// Health check
app.get("/api/health", (req, res) => {
  res.status(200).json({
    success: true,
    message: "RushHour API is running!",
    service: "backend",
    timestamp: new Date().toISOString(),
  });
});

module.exports = app;