const allowedOrigins = require('../config/allowedOrigins');    

const credentials = (req, res, next) => {
    const origin = req.headers.origin;
    if (allowedOrigins.includes(origin)) {
        res.header('Access-Control-Allow-Credentials', true);    // CORS is looking for this, must be true in response header
    }
    next();
}

module.exports = credentials