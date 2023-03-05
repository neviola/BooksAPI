const User = require('../model/User');
const bcrypt = require('bcrypt');


const getAllUsers = async (req, res) => {
    const users = await User.find();
    if (!users) return res.status(204).json({ "message": "No users found"});
    res.json(users);
} 


const updateUser = async (req, res) => {
    if (!req?.body?.id) return res.status(400).json({"message": "User ID is required"});
    const user = await User.findOne({ _id: req.body.id }).exec();
    if (!user) return res.status(204).json({ "message": `No user with id: ${req.body.id} found`});
    
    if (req.body?.username) user.username = req.body.username;
    if (req.body?.password) {
        user.password = await bcrypt.hash(req.body.password, 11); 
    }
    // Everyone has user role, admin can assign admin role to other user  
    if (req.body?.roles?.Editor) user.roles.Editor = req.body.roles.Editor;
    if (req.body?.roles?.Admin) user.roles.Admin = req.body.roles.Admin;

    result = await user.save();
    res.json(result);
} 


const deleteUser = async (req, res) => {
    if (!req?.body?.id) return res.status(400).json({"message": "User ID is required"});
    const user = await User.findOne({ _id: req.body.id}).exec();
    if (!user) return res.status(204).json({'message': `No user matches this ID ${req.body.id}`});
    const result = await User.deleteOne({ _id: req.body.id });
    res.json(result);
}


const getOneUser = async (req, res) => {
    if (!req?.params?.id) return res.status(400).json({ "message": "User ID is required" });
    const user = await User.findOne({ _id: req.params.id }).exec();
    if (!user) {
        return res.status(204).json({'message': `No user matches this ID ${req.params.id}`});
    }
    res.json(user);
}

module.exports = { getAllUsers, updateUser, deleteUser, getOneUser }