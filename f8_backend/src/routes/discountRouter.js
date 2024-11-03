const express = require('express');
const router = express.Router();
const catchAsync = require('../untils/catchAsync');
const {
    checkUserJWT,
    checkUserPermission,
} = require('../middleware/JWTAction');

const discountController = require('../app/controllers/DiscountController');

router.delete('/delete/:id', catchAsync(discountController.deleteDiscount));
router.put('/setStatus', catchAsync(discountController.setStatus));
router.put('/update', catchAsync(discountController.updateDiscount));
router.post('/add', catchAsync(discountController.addDiscount));
router.get(
    '/listDiscountOfTable',
    catchAsync(discountController.listDiscountOfTable)
);
router.get('/listStatus', catchAsync(discountController.getListStatus1));

module.exports = router;
