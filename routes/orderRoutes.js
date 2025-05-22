const express = require('express');

const router = express.Router();
const orderCtrl = require('../controllers/orderController');
const accessRoles = require('../middleware/accessRoles');
const auth = require('../middleware/auth');

const onlyAdmin = accessRoles('admin');
const adminOrPreparation = accessRoles('admin', 'preparation');
const adminOrReception = accessRoles('admin', 'reception');

/**
 * @swagger
 * /api/orders/:
 *   post:
 *     summary: Creates a new order
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               status:
 *                 type: string
 *               creationDate: 
 *                 type: date
 *               items: 
 *                 type: array
 *                 items:
 *                   type: string
 *               menus: 
 *                 type: array
 *                 items:
 *                   type: string
 *           required:
 *             - status
 *             - creationDate 
 *           anyOf:
 *             - required: [items]
 *             - required: [menus]
 *     responses:
 *       201:
 *         description: Order created
 *       400:
 *         description: Error when creating new order
 */
router.post('/',auth, adminOrReception, orderCtrl.createOrder);

/**
 * @swagger
 * /api/orders/:
 *   get:
 *     summary: Gets all the orders
 *     responses:
 *       200:
 *         description: All orders were retrived
 *       400:
 *         description: Error when retrieving all orders
 */
router.get('/', auth, adminOrPreparation, orderCtrl.getAllOrders);

/**
 * @swagger
 * /api/orders/{id}:
 *   get:
 *     summary: Gets an order matching the provided stored ID
 *     parameters:
 *       - in: path
 *         id: _id
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the order to retrieve
 *     responses:
 *       200:
 *         description: The order was found
 *       404:
 *         description: Order not found
 */
router.get('/:id', auth, adminOrPreparation, orderCtrl.getOneOrder);

/**
 * @swagger
 * /api/orders/{id}:
 *   put:
 *     summary: updates the order matching the provided stored ID
 *     parameters:
 *       - in: path
 *         id: _id
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the order to update
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               status:
 *                 type: string
 *               items: 
 *                 type: array
 *                 items:
 *                   type: string
 *               menus: 
 *                 type: array
 *                 items:
 *                   type: string
 *           anyOf:
 *             - required: [status]
 *             - required: [items]
 *             - required: [menus]
 *     responses:
 *       200:
 *         description: The order was updated
 *       404:
 *         description: Error when updating the order
 */
router.put('/:id', auth, adminOrReception, orderCtrl.modifyOrder);

/**
 * @swagger
 * /api/orders/{id}/status:
 *   put:
 *     summary: updates the status of the order matching the provided stored ID
 *     parameters:
 *       - in: path
 *         id: _id
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the order to update
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               status:
 *                 type: string
 *           required:
 *             - status
 *     responses:
 *       200:
 *         description: The order's status was updated
 *       404:
 *         description: Error when updating the order's status
 */
router.patch('/:id/status', auth, orderCtrl.modifyOrderStatus);

/**
 * @swagger
 * /api/orders/{id}:
 *   delete:
 *     summary: deletes an order matching the provided stored ID
 *     parameters:
 *       - in: path
 *         id: _id
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the order to delete
 *     responses:
 *       200:
 *         description: The order was deleted
 *       404:
 *         description: Error when deleting the order
 */
router.delete('/:id', onlyAdmin, orderCtrl.deleteOrder);




module.exports = router;