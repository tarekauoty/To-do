const express = require('express');
const listController = require('./../Controllers/listController.js');
const authController = require('./../Controllers/authController.js');

const router = express.Router();

router
  .route('/:id')
  .get(authController.protect, listController.getList)
  .patch(authController.protect, listController.updateList)
  .delete(authController.protect, listController.deleteList);
router.post('/new-list', authController.protect, listController.createList);

module.exports = router;
