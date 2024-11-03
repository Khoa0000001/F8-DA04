const express = require('express');
const router = express.Router();
const catchAsync = require('../untils/catchAsync');

const categoryController = require('../app/controllers/CategoryController');

router.delete('/delete/:id', catchAsync(categoryController.deleteCategory));
router.put('/setStatus', catchAsync(categoryController.setStatus));
router.put('/update', catchAsync(categoryController.updateCategory));
router.post('/add', catchAsync(categoryController.addCategory));
router.get('/getStatus1', catchAsync(categoryController.getStatus1));
router.get('/', catchAsync(categoryController.index));

module.exports = router;
