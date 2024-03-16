const express = require('express');
const routeController = require("../controllers/basicRouteController");
const { createUser } = require("../controllers/userController");

const router = express.Router();

router.get("/", routeController.default); // Server is running
router.get("/api/", routeController.get); //Test Route
router.post("/api/", routeController.post); //Test Route
router.post("/api/users", createUser); // Account Creation API

module.exports = router;
