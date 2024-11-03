const db = require("../models/index");
const { Op } = require("sequelize");

const { verifyToken } = require("../../middleware/JWTAction");

class UsersController {
  //[GET] get all
  async index(req, res, next) {
    const listUser = await db.User.findAll();
    res.status(200).json(listUser);
  }
  //[GET] a info user
  async infoUser(req, res, next) {
    const user = await db.User.findOne({
      where: {
        [Op.and]: [{ numberPhone: req.user.numberPhone }, { status: 1 }],
      },
      attributes: [
        "idUser",
        "avatar",
        "email",
        "name",
        "userName",
        "bio",
        "coverImage",
      ],
    });
    res.status(200).json(user);
  }

  async getinfoUserId(req, res, next) {
    const user = await db.User.findOne({
      where: {
        [Op.and]: [{ idUser: req.params.id }, { status: 1 }],
      },
      attributes: ["avatar", "email", "name", "userName", "bio", "coverImage"],
    });
    res.status(200).json(user);
  }

  async checkPhoneNumber(req, res, next) {
    const numberPhone = req.query.numberPhone;
    const user = await db.User.findOne({
      where: {
        numberPhone: numberPhone,
      },
    });
    if (user) {
      res.status(200).json({
        type: "success",
        messege: "exist",
      });
    } else {
      res.status(200).json({
        type: "error",
        messege: `don't exist`,
      });
    }
  }

  // [GET] get list courses of tablet admin
  async listUserOfTable(req, res, next) {
    const listUsers = await db.User.findAll({
      include: [
        {
          model: db.Group,
          as: "groups",
          where: {
            status: 1,
          },
          // required: false,
        },
      ],
    });
    res.status(200).json(listUsers);
  }

  async setStatus(req, res, next) {
    const data = req.body;
    const idUser = data.idUser;
    const status = data.value;

    const user = await db.User.findOne({
      where: {
        idUser: idUser,
      },
      attributes: ["name"],
    });

    await db.User.update(
      { status: status },
      {
        where: {
          idUser: idUser,
        },
      }
    );

    res.status(200).json({
      type: "success",
      messege: user,
    });
  }

  async deleteUser(req, res, next) {
    const user = await db.User.destroy({
      where: {
        idUser: req.params.id,
      },
    });
    res.status(200).json({
      type: "success",
      messege: "delete user",
    });
  }
}

module.exports = new UsersController();
