const express = require('express');

const router = express.Router();
const menuCtrl = require('../controllers/menuController');
const accessRoles = require('../middleware/accessRoles');
const auth = require('../middleware/auth');

const onlyAdmin = accessRoles('admin');

//creates a new item
router.post('/', auth, onlyAdmin, menuCtrl.createMenu);

//returns the item by name given
router.get('/:id', auth, onlyAdmin, menuCtrl.getOneMenu);

//updates the item by name give
router.put('/:id', auth, onlyAdmin, menuCtrl.modifyMenu);

//deletes the item by name
router.delete('/:id', auth, onlyAdmin, menuCtrl.deleteMenu);

router.get('/', auth, onlyAdmin, menuCtrl.getAllMenus);

module.exports = router;