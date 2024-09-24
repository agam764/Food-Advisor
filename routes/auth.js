const express = require("express");
const { register, login } = require("../controllers/authController");
const auth = require("../middleware/authMiddelware");

const router = express.Router();

// User registration
router.post("/register", register);

// User login
router.post("/login", login);

// Protected route example
router.get("/protected", auth, (req, res) => {
  res.send("This is a protected route.");
});

module.exports = router;
