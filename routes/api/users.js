const router = require('express').Router();
const usersController = require('../../controllers/usersController');
const ROLES_LIST = require('../../config/roles_list');
const verifyRoles = require('../../middleware/verifyRoles');

router.route('/')
    .get(verifyRoles(ROLES_LIST.Admin), usersController.getAllUsers)
    .put(verifyRoles(ROLES_LIST.Admin), usersController.updateUser)
    .delete(verifyRoles(ROLES_LIST.Admin), usersController.deleteUser);

router.get('/:id', verifyRoles(ROLES_LIST.Admin), usersController.getOneUser);

module.exports = router
