const express = require("express");
const router = express.Router();
const catchAsync = require("../untils/catchAsync");
const {
  checkUserJWT,
  checkUserPermission,
} = require("../middleware/JWTAction");

const lessonController = require("../app/controllers/LessonController");

router.delete("/delete/:id", catchAsync(lessonController.deleteLesson));
router.put("/setStatus", catchAsync(lessonController.setStatus));
router.put("/update", catchAsync(lessonController.updateLesson));
router.post("/add", catchAsync(lessonController.addLesson));
router.get(
  "/listLessonStatus1/:idCourse",
  catchAsync(lessonController.listLessonStatus1)
);
router.get(
  "/course_lesson/:id",
  checkUserJWT,
  catchAsync(lessonController.Course_Lesson)
);

router.get("/getCourseID/:id", catchAsync(lessonController.getCourseID));
router.get("/info/:id", catchAsync(lessonController.info));

module.exports = router;
