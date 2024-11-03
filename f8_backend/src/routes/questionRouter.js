const express = require("express");
const router = express.Router();
const catchAsync = require("../untils/catchAsync");
const {
  checkUserJWT,
  checkUserPermission,
} = require("../middleware/JWTAction");

const questionController = require("../app/controllers/QuestionController");

router.delete("/delete/:id", catchAsync(questionController.deleteQuestion));
router.put("/setStatus", catchAsync(questionController.setStatus));
router.put("/update", catchAsync(questionController.updateQuestion));
router.post("/add", catchAsync(questionController.addQuestion));
router.get("/info/:id", catchAsync(questionController.info));
router.get("/getCourseID/:id", catchAsync(questionController.getCourseID));
router.post("/question-answer", questionController.Question_Answer);

module.exports = router;
