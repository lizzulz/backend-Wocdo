const express = require('express');

const router = express.Router();
const menuCtrl = require('../controllers/menuController');
const accessRoles = require('../middleware/accessRoles');
const auth = require('../middleware/auth');

const onlyAdmin = accessRoles('admin');

/**
 * @swagger
 * /api/menus/:
 *   post:
 *     summary: Creates a new menu
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
 *               items: 
 *                 type: array
 *                 items:
 *                   type: string
 *               options: 
 *                 type: array
 *                 items:
 *                   type: string
 *             required:
 *               - name
 *               - description
 *               - price
 *               - imagesUrls
 *               - items 
 *     responses:
 *       201:
 *         description: Menu created
 *       400:
 *         description: Error when creating new menu
 */
router.post('/', auth, onlyAdmin, menuCtrl.createMenu);

/**
 * @swagger
 * /api/menus/:
 *   get:
 *     summary: Gets all the menus
 *     responses:
 *       200:
 *         description: All menus were retrived
 *       400:
 *         description: Error when retrieving all menus
 */
router.get('/', auth, onlyAdmin, menuCtrl.getAllMenus);

/**
 * @swagger
 * /api/menus/{id}:
 *   get:
 *     summary: Gets a menu matching the provided stored ID
 *     parameters:
 *       - in: path
 *         id: _id
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the menu to retrieve
 *     responses:
 *       200:
 *         description: The menu was found
 *       404:
 *         description: Menu not found
 */
router.get('/:id', auth, onlyAdmin, menuCtrl.getOneMenu);



/**
 * @swagger
 * /api/menus/{id}:
 *   put:
 *     summary: updates the menu matching the provided stored ID
 *     parameters:
 *       - in: path
 *         id: _id
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the menu to update
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
 *               items: 
 *                 type: array
 *                 items:
 *                   type: string
 *               options: 
 *                 type: array
 *                 items:
 *                   type: string
 *           anyOf:
 *             - required: [name]
 *             - required: [description]
 *             - required: [price]
 *             - required: [imagesUrls]
 *             - required: [items]
 *             - required: [options]
 *     responses:
 *       200:
 *         description: The menu was updated
 *       404:
 *         description: Error when updating the item
 */
router.put('/:id', auth, onlyAdmin, menuCtrl.modifyMenu);

/**
 * @swagger
 * /api/menus/{id}:
 *   delete:
 *     summary: deletes a menu matching the provided stored ID
 *     parameters:
 *       - in: path
 *         id: _id
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the menu to delete
 *     responses:
 *       200:
 *         description: The menu was deleted
 *       404:
 *         description: Error when deleting the item
 */
router.delete('/:id', auth, onlyAdmin, menuCtrl.deleteMenu);



module.exports = router;