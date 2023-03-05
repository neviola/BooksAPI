const express = require('express');
const router = express.Router();
const refreshController = require('../controllers/refreshTokenController');

// get new accessToken with refreshToken from cookie
router.post('/', refreshController.handeRefreshToken);

module.exports = router;