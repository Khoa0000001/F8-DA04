const express = require("express");
const router = express.Router();
const catchAsync = require("../untils/catchAsync");

const commentController = require("../app/controllers/CommentController");
const {
  checkUserJWT,
  checkUserPermission,
} = require("../middleware/JWTAction");

router.post(
  "/getCommentLesson",
  catchAsync(commentController.getCommentLesson)
);
router.get("/getRepComment/:id", catchAsync(commentController.getRepComment));
router.post("/add", checkUserJWT, catchAsync(commentController.addCmt));
router.get("/", catchAsync(commentController.index));

module.exports = router;
