const db = require("../models/index");
const { Op } = require("sequelize");

class NotificationController {
  async index(req, res, next) {
    const listNotification = await db.Notification.findAll();
    if (!listNotification) {
      return res.status(404).json({
        type: "error",
        messege: "listNotification not found",
      });
    }
    res.status(200).json(listNotification);
  }

  //[POST] insert a new course
  async addNotification(req, res, next) {
    const numberPhone = req.user.numberPhone;
    const user = await db.User.findOne({
      where: {
        numberPhone: numberPhone,
      },
    });
    const data = req.body;
    await db.Notification.create({
      ...data,
      status: 1,
      userID: user.idUser,
    });
    res.status(200).json({
      type: "success",
      messege: "created Notification",
    });
  }

  async getNotificationOfUserId(req, res, next) {
    const numberPhone = req.user.numberPhone;
    const user = await db.User.findOne({
      where: {
        numberPhone: numberPhone,
      },
    });
    const listNotification = await db.Notification.findAll({
      where: {
        idUserN: user.idUser,
      },
      include: [
        {
          model: db.User,
          as: "users",
          where: {
            status: 1,
          },
          attributes: ["idUser", "avatar", "name"],
          required: false,
        },
      ],
    });
    if (!listNotification) {
      return res.status(404).json({
        type: "error",
        messege: "listNotification not found",
      });
    }
    res.status(200).json(listNotification);
  }
}

module.exports = new NotificationController();
