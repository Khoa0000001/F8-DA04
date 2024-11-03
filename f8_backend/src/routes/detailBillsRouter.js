const express = require('express');
const router = express.Router();
const catchAsync = require('../untils/catchAsync');
const {
    checkUserJWT,
    checkUserPermission,
} = require('../middleware/JWTAction');

const detailBillsController = require('../app/controllers/DetailBillsController');

router.get(
    '/listBillsOfTable',
    catchAsync(detailBillsController.listBillsOfTable)
);

module.exports = router;
