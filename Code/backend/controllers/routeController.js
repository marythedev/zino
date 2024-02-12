const mongoose = require("mongoose");

// Basic Mongoose Schema
const DataBaseSchema = mongoose.Schema({
  // Define schema fields
});

// Handle GET request
exports.get = (req, res) => {
  res.json({ message: "GET request received" });
};

// Handle POST request
exports.post = (req, res) => {
  res.json({ message: "POST request received" });
};
