// routes/userDataRoutes.js
const express = require('express');
const { addOrUpdateUserData, getUserData } = require('../controllers/userDataController');
const auth = require('../middleware/authMiddelware');

const router = express.Router();

// Route to add or update user data
router.post('/userdata', auth, addOrUpdateUserData);

// Route to get user data
router.get('/userdata', auth, getUserData);

module.exports = router;
