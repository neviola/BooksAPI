const User = require('../model/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// when user is authenticated they recieve httponly cookie with jwt that gives them ACCESS and REFRESH tokens

const handleLogin = async(req, res) => {
    const { user, pwd } = req.body;
    if (!user || !pwd) return res.status(400).json({'message': 'Username and password are required.'});

    // does it exist
    const foundUser = await User.findOne({username: user}).exec();

    if (!foundUser) return res.sendStatus(401);  // Unauthorized
    
    // evaluate password from body and db
    const match = await bcrypt.compare(pwd, foundUser.password);
    if (match) {

        // roles/authorization level of a user
        const roles = Object.values(foundUser.roles);   // values of roles object to array

        // user recieves the signed tokens
        const accessToken = jwt.sign(
            {
                "UserInfo": {
                    "username": foundUser.username,
                    "roles": roles
                }
            },
            process.env.ACCESS_TOKEN_SECRET,
            { expiresIn: '7m' }
        );

        const refreshToken = jwt.sign(
            {"username": foundUser.username},
            process.env.REFRESH_TOKEN_SECRET,
            { expiresIn: '1d' }
        );

        
        // save refreshToken to db for logout
        foundUser.refreshToken = refreshToken;    // just adds to user info
        const result = await foundUser.save();
        console.log(result);

        // send token to user - RefreshToken with cookie, AccessToken with json
        res.cookie('jwt', refreshToken, { httpOnly: true, sameSite: 'None', maxAge: 24*60*60*1000 }); // secure: true
        res.json({ accessToken });    
    } else {
        res.sendStatus(401);
    };
}

module.exports = {handleLogin};