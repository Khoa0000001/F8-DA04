const express = require('express');
const router = express.Router();
const catchAsync = require('../untils/catchAsync');
const {
    checkUserJWT,
    checkUserPermission,
} = require('../middleware/JWTAction');

const processController = require('../app/controllers/ProcessController');

router.get(
    '/studyingLesson/:id',
    checkUserJWT,
    catchAsync(processController.studyingLesson)
);
router.get(
    '/infoLesson/:id',
    checkUserJWT,
    catchAsync(processController.infoLesson)
);

router.post(
    '/addProcess',
    checkUserJWT,
    catchAsync(processController.AddProcess)
);

module.exports = router;
