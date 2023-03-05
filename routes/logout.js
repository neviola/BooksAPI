const express = require('express');
const router = express.Router();
const logoutController = require('../controllers/logoutController');

// delete cookies with jwt
router.post('/', logoutController.handleLogout);

module.exports = router;