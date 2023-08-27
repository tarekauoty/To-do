const express = require('express');
const authController = require('./../Controllers/authController');
const userController = require('./../Controllers/userController');

const router = express.Router();

router.post('/signup', authController.signup);
router.post('/login', authController.login);
router.delete('/delete-me', userController.deleteMe);
router.get('/overview', authController.protect, userController.myLists);
router
  .route('/:id')
  .get(userController.getUser)
  .patch(userController.updateMe)
  .delete(userController.deleteMe);
module.exports = router;
