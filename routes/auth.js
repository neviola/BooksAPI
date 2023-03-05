const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

// login auth, user and psw neededd in body of req
router.post('/',authController.handleLogin);

module.exports = router;