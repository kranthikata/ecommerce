const express = require("express");
const router = express.Router();
const {
  login,
  forgotPassword,
  resetPassword,
} = require("../controllers/authController");

// Login - User login
router.post("/login", login);

// Forgot Password - Send reset link to email
router.post("/forgot-password", forgotPassword);

// Reset Password - After receiving reset token
router.post("/reset-password", resetPassword);

module.exports = router;
