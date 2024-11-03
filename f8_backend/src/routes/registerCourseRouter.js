const express = require('express');
const router = express.Router();
const catchAsync = require('../untils/catchAsync');
const {
    checkUserJWT,
    checkUserPermission,
} = require('../middleware/JWTAction');

const registerCourseController = require('../app/controllers/RegisterCourseController');

router.post(
    '/registerCourse/:id',
    checkUserJWT,
    catchAsync(registerCourseController.registerCourse)
);
router.get(
    '/getRegisterCourse',
    checkUserJWT,
    catchAsync(registerCourseController.getRegisterCourse)
);
router.get('/', catchAsync(registerCourseController.index));

module.exports = router;
