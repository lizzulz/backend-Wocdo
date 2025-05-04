const express = require('express');
const router = express.Router();
const userCtrl = require('../controllers/userController')
const auth = require('../middleware/auth');
const accessRoles = require('../middleware/accessRoles');

const onlyAdmin = accessRoles('admin');

router.post ('/signup', userCtrl.signup);
router.post ('/login', userCtrl.login);
router.get('/', auth, onlyAdmin, userCtrl.getAllUsers);
router.put('/:id', auth, onlyAdmin, userCtrl.modifyUser);

module.exports = router;