const express = require('express');
const auth = require('../middleware/auth');
const accessRoles = require('../middleware/accessRoles');

const router = express.Router();
const itemCtrl = require('../controllers/itemController');

const onlyAdmin = accessRoles('admin');

/**
 * @swagger
 * /api/items/:
 *   post:
 *     summary: Creates a new item
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
 *                 items:
 *                   type: string
 *               inStock: 
 *                 type: boolean
 *             required:
 *               - name
 *               - description
 *               - price
 *               - imagesUrls
 *               - inStrock  
 *     responses:
 *       201:
 *         description: Item created
 *       400:
 *         description: Error when creating new item
 */
router.post('/', auth, onlyAdmin, itemCtrl.createItem);

/**
 * @swagger
 * /api/items/:
 *   get:
 *     summary: Gets all the items
 *     responses:
 *       200:
 *         description: All items were retrived
 *       400:
 *         description: Error when retrieving all items
 */
router.get('/', auth, onlyAdmin, itemCtrl.getAllItems);

/**
 * @swagger
 * /api/items/{id}:
 *   get:
 *     summary: Gets an item matching the provided stored ID
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
 * /api/items/{id}:
 *   put:
 *     summary: updates the item matching the provided stored ID
 *     parameters:
 *       - in: path
 *         id: _id
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the item to update
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
 *                 items:
 *                   type: string
 *               inStock: 
 *                 type: boolean
 *           anyOf:
 *             - required: [name]
 *             - required: [description]
 *             - required: [price]
 *             - required: [imagesUrls]
 *             - required: [inStock]
 *     responses:
 *       200:
 *         description: The item was updated
 *       404:
 *         description: Error when updating the item
 */
router.put('/:id', auth, onlyAdmin, itemCtrl.modifyItem);

/**
 * @swagger
 * /api/items/{id}:
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
 *         description: Error when deleting the item
 */
router.delete('/:id', auth, onlyAdmin, itemCtrl.deleteItem);

module.exports = router;