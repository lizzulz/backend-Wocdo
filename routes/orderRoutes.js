const express = require('express');

const router = express.Router();
const orderCtrl = require('../controllers/orderController');
const accessRoles = require('../middleware/accessRoles');
const auth = require('../middleware/auth');

const onlyAdmin = accessRoles('admin');
const adminOrPreparation = accessRoles('admin', 'Preparation');
const adminOrReception = accessRoles('admin', 'Reception');

//creates a new item
router.post('/',auth, adminOrReception, orderCtrl.createOrder);

//returns the item by name given
router.get('/:id', auth, adminOrPreparation, orderCtrl.getOneOrder);

//updates the item by name give
router.put('/:id', auth, adminOrReception, orderCtrl.modifyOrder);

//updates the item by name give
router.put('/:id', auth, orderCtrl.modifyOrderStatus);

//deletes the item by name
router.delete('/:id', onlyAdmin, orderCtrl.deleteOrder);

router.get('/', auth, adminOrPreparation, orderCtrl.getAllOrders);

module.exports = router;