const express = require("express");
const router = express.Router();

const usersController = require("../app/controllers/UsersController");
const catchAsync = require("../untils/catchAsync");
const {
  checkUserJWT,
  checkUserPermission,
} = require("../middleware/JWTAction");

router.delete("/delete/:id", catchAsync(usersController.deleteUser));
router.put("/setStatus", catchAsync(usersController.setStatus));
router.get("/listUserOfTable", catchAsync(usersController.listUserOfTable));
router.get("/checkPhoneNumber", catchAsync(usersController.checkPhoneNumber));
router.get("/getinfoUserId/:id", catchAsync(usersController.getinfoUserId));
router.get("/infoUser", checkUserJWT, catchAsync(usersController.infoUser));
router.get(
  "/",
  checkUserJWT,
  checkUserPermission,
  catchAsync(usersController.index)
);

module.exports = router;
