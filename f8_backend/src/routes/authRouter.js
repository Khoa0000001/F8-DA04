const express = require('express');
const router = express.Router();
const catchAsync = require('../untils/catchAsync');

const authController = require('../app/controllers/AuthController');
const {
    checkUserJWT,
    checkUserPermission,
} = require('../middleware/JWTAction');

router.post('/register', catchAsync(authController.register));
router.post('/login', catchAsync(authController.login));
router.get(
    '/authentication',
    checkUserJWT,
    catchAsync(authController.authentication)
);
router.get('/', catchAsync(authController.index));

module.exports = router;
