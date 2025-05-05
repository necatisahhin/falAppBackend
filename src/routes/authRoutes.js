const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const { protect } = require('../middleware/authMiddleware');


router.post('/register', authController.register);


router.post('/login', authController.login);


router.get('/profile', protect, authController.getUserProfile);


router.put('/profile/update', protect, authController.updateUserProfile);

module.exports = router; 