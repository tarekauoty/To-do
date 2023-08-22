const express = require('express');
const authController = require('./../Controllers/authController');
const userController = require('./../Controllers/userController');

const router = express.Router();

router.post('/signup', authController.signup);
router.post('/login', authController.login);
router.delete('/delete-me', userController.deleteMe);
router.get('getMe', userController.getMe);
router.patch('updateMe', userController.updateMe);
module.exports = router;
