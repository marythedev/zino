const express = require("express");
const routeController = require("../controllers/basicRouteController");
const { createUser, loginUser, enable2FA, verify2FA } = require("../controllers/userController");

const authenticateToken = require("../middlewares/authenticateToken");
const verifyAdmin = require("../middlewares/verifyAdmin");

const adminController = require("../controllers/adminController"); // Ensure this path is correct
const productController = require("../controllers/productController"); // Import the product controller

const router = express.Router();

router.get("/", routeController.default); // Server is running
router.get("/api/", routeController.get); //Test Route
router.post("/api/", routeController.post); //Test Route
router.post("/api/users", createUser); // Account Creation API

router.post("/api/login", loginUser); //Login users

// Admin routes - Prefix all admin routes with /api/admin
router.use("/api/admin", authenticateToken, adminController);

// Product routes
router.use("/api/products", productController); // Use product controller for product routes

router.post('/enable-2fa', authenticateToken, userController.enable2FA);
router.post('/verify-2fa', authenticateToken, userController.verify2FA);

module.exports = router;
