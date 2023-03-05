const router = require('express').Router();
const booksController = require('../../controllers/booksController');
const ROLES_LIST = require('../../config/roles_list');
const verifyRoles = require('../../middleware/verifyRoles');

// inside verifyRoles() we put values from ROLES_LIST that can access this routes (Admin, Edtor, User)

router.route('/')
    .get(booksController.getAllBooks)
    .post(verifyRoles(ROLES_LIST.Admin, ROLES_LIST.Editor), booksController.createNewBook)
    .put(verifyRoles(ROLES_LIST.Admin, ROLES_LIST.Editor), booksController.updateBook)
    .delete(verifyRoles(ROLES_LIST.Admin), booksController.deleteBook);

router.get('/:id', booksController.getBook);

module.exports = router