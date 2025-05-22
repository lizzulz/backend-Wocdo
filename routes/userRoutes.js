const express = require('express');
const router = express.Router();
const userCtrl = require('../controllers/userController')
const auth = require('../middleware/auth');
const accessRoles = require('../middleware/accessRoles');

const onlyAdmin = accessRoles('admin');


/**
 * @swagger
 * /api/users/signup:
 *   post:
 *     summary: creates a new user
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               password: 
 *                 type: string
 *               access:
 *                 type: string
 *           required:
 *             - email
 *             - password
 *             - access   
 *     responses:
 *       200:
 *         description: User successfully loged in
 *       400:
 *         description: Error when logging in the user
 */
router.post ('/signup', userCtrl.signup);

/**
 * @swagger
 * /api/users/login:
 *   post:
 *     summary: logins the identified user
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               password: 
 *                 type: string
 *           required:
 *             - email
 *             - password
 *     responses:
 *       200:
 *         description: User successfully loged in
 *       400:
 *         description: Error when logging in the user
 */
router.post ('/login', userCtrl.login);

/**
 * @swagger
 * /api/users/:
 *   get:
 *     summary: Gets all the users
 *     responses:
 *       200:
 *         description: All users were retrived
 *       400:
 *         description: Error when retrieving all users
 */
router.get('/', auth, onlyAdmin, userCtrl.getAllUsers);

  /**
 * @swagger
 * /api/users/{id}:
 *   put:
 *     summary: updates the user matching the provided stored ID
 *     parameters:
 *       - in: path
 *         id: _id
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the user to update
 *     responses:
 *       200:
 *         description: The user was updated
 *       404:
 *         description: Error when updating the user
 */
router.put('/:id', auth, onlyAdmin, userCtrl.modifyUser);

module.exports = router;