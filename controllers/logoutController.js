const User = require('../model/User');

const handleLogout = async (req, res) => {
    const cookies = req.cookies;
    if (!cookies?.jwt) return res.sendStatus(204);  // successful but no content
    const refreshToken = cookies.jwt;

    // find user by refreshToken in db
    const foundUser = await User.findOne({refreshToken: refreshToken}).exec();
    
    if (!foundUser) {
        res.clearCookie('jwt', { httpOnly: true, sameSite: 'None' });  //  secure: true
        res.sendStatus(204);
    }

    // delete refreshToken from db
    foundUser.refreshToken = '';
    const result = await foundUser.save();
    // console.log(result);

    res.clearCookie('jwt', { httpOnly: true, sameSite: 'None' });  // must have same params as in authController , secure: true 
    // res.sendStatus(204);
    res.status(204).json({ "message": "Logged Out" });
}

module.exports = { handleLogout };