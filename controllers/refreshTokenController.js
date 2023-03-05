const User = require('../model/User');
const jwt = require('jsonwebtoken');


// user sends req.cookie with refresh token, if verified, the client gets a new access token

const handeRefreshToken = async (req, res) => {
    const cookies = req.cookies;
    if (!cookies?.jwt) return res.sendStatus(401);
    // console.log(cookies.jwt);
    const refreshToken = cookies.jwt;

    // find user in db by refreshToken from req
    const foundUser = await User.findOne({ refreshToken: refreshToken}).exec();
    if (!foundUser) return res.sendStatus(403);  // forbidden

    // verify that refresh token (string) from req has not been changed based on env.REFRESH_TOKEN_SECRET
    jwt.verify(
        refreshToken,
        process.env.REFRESH_TOKEN_SECRET,
        (err, decoded) => {
            if (err || foundUser.username !== decoded.username) return res.sendStatus(403);
            
            // otherwise create new access token
            const roles = Object.values(foundUser.roles);
            const accessToken = jwt.sign(
                { 
                    "UserInfo": {
                        "username": decoded.username,
                        "roles": roles 
                    }
                },
                process.env.ACCESS_TOKEN_SECRET,
                { expiresIn: '7m'}  
            );
            res.json({ accessToken });
        }
    ); 
}

module.exports = {handeRefreshToken};