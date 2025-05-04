const express = require('express');
const auth = require('../middleware/auth');
const accessRoles = require('../middleware/accessRoles');

const router = express.Router();
const itemCtrl = require('../controllers/itemController');

const onlyAdmin = accessRoles('admin');

/**
 * @swagger
 * /items:
 *   post:
 *     summary: Create a new item
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               description: 
 *                 type: string
 *               price:
 *                 type: number
 *               imageUrls: 
 *                 type: array
 *               inStock: 
 *                 type: boolean
 *     responses:
 *       201:
 *         description: Item created
 *       400:
 *         description: Error when creating new item
 */
router.post('/', auth, onlyAdmin, itemCtrl.createItem);

/**
 * @swagger
 * /items/{id}:
 *   get:
 *     summary: Get an item by its stored ID
 *     parameters:
 *       - in: path
 *         id: _id
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the item to retrieve
 *     responses:
 *       200:
 *         description: The item was found
 *       404:
 *         description: Item not found
 */
router.get('/:id', auth, onlyAdmin, itemCtrl.getOneItem);

/**
 * @swagger
 * /items/{id}:
 *   put:
 *     summary: updates the item by name give
 *     parameters:
 *       - in: path
 *         id: _id
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the item to update
 *     responses:
 *       200:
 *         description: The item was found
 *       404:
 *         description: Item not found
 */
router.put('/:id', auth, onlyAdmin, itemCtrl.modifyItem);

/**
 * @swagger
 * /items/{id}:
 *   delete:
 *     summary: deletes an item by its stored ID
 *     parameters:
 *       - in: path
 *         id: _id
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the item to delete
 *     responses:
 *       200:
 *         description: The item was deleted
 *       404:
 *         description: Item not found
 */
router.delete('/:id', auth, onlyAdmin, itemCtrl.deleteItem);

/**
 * @swagger
 * /items:
 *   get:
 *     summary: Get all the items
 *     responses:
 *       200:
 *         description: All items were retrived
 *       400:
 *         description: Error when getting all items
 */
router.get('/', auth, onlyAdmin, itemCtrl.getAllItems);

module.exports = router;