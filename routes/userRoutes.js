const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

// User routes
router.get('/', userController.getAllUsers);
router.post('/', userController.addUser);
router.put('/:id', userController.updateUser);  // Route for updating a user
router.delete('/:id', userController.deleteUser); // Route for deleting a user

module.exports = router;
