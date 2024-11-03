const catchAsync = require('../untils/catchAsync');
const express = require('express');
const router = express.Router();

const answerController = require('../app/controllers/AnswerController');
const {
    checkUserJWT,
    checkUserPermission,
} = require('../middleware/JWTAction');

router.delete('/delete/:id', catchAsync(answerController.deleteAnswer));
router.put('/setStatus', catchAsync(answerController.setStatus));
router.put('/update', catchAsync(answerController.updateAnswer));
router.post('/add', catchAsync(answerController.addAnswer));
router.get(
    '/checkAnswer/:id',
    checkUserJWT,
    catchAsync(answerController.checkAnswer)
);

module.exports = router;
