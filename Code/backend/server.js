//Setup & Required
const express = require("express");
require("dotenv").config();
const routeController = require("./controllers/routeController");

const app = express();
const PORT = process.env.PORT;

// Terminal Logging Functionality
app.use((req, res, next) => {
  console.log(`${req.method} ${req.url}`);
  next();
});

// Routes
app.get("/api/", routeController.get);
app.post("/api/", routeController.post);

// Custom error handling for 404 Not Found errors
app.use((req, res, next) => {
  res.status(404).json({ message: "404: Resource not found" }); // Custom response for 404 errors
});

// Handle Errors
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: "500: Internal server error" });
});

// Server Startup Msg
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

// Basic Home Route
app.get("/", (req, res) => {
  res.send("Server is running");
});
