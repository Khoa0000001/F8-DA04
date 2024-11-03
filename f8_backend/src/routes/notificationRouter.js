const express = require("express");
const router = express.Router();
const catchAsync = require("../untils/catchAsync");

const notificationController = require("../app/controllers/NotificationController");
const {
  checkUserJWT,
  checkUserPermission,
} = require("../middleware/JWTAction");

router.get(
  "/getNotificationOfUserId",
  checkUserJWT,
  catchAsync(notificationController.getNotificationOfUserId)
);
router.post(
  "/add",
  checkUserJWT,
  catchAsync(notificationController.addNotification)
);
router.get("/", catchAsync(notificationController.index));

module.exports = router;
