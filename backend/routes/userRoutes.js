const express = require("express");
const router = express.Router();
const { signUp } = require("../controllers/userController");

// Sign-up - Create new user
router.post("/signup", signUp);

module.exports = router;
