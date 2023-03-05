const jwt = require('jsonwebtoken');

const verifyJWT = (req, res, next) => {
    const authHeader = req.headers.authorization || req.headers.Authorization;
    // in this header, first element is Bearerad second is the token
    if (!authHeader?.startsWith('Bearer ')) return res.sendStatus(401); // header must start with Bearer 
    console.log(authHeader);
    const token = authHeader.split(' ')[1];

    jwt.verify(
        token,
        process.env.ACCESS_TOKEN_SECRET,
        (err, decoded) => {
            if (err) return res.sendStatus(403);    // invalid token - Forbidden
            req.user = decoded.UserInfo.username;   // UserInfo iz tokena ide dalje u route
            req.roles = decoded.UserInfo.roles;
            next();
        }
    );
}

module.exports = verifyJWT;
// now we can add it to the routes we want to protect
// after this middleware in routing we go next to controllers