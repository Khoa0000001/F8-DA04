const db = require("../models/index");
const { Op, Sequelize } = require("sequelize");

class CommentController {
  async index(req, res, next) {
    const listcmt = await db.Comment.findAll();
    if (!listcmt) {
      return res.status(404).json({
        type: "error",
        messege: "Comment not found",
      });
    }
    res.status(200).json(listcmt);
  }

  //[POST] insert a new course
  async addCmt(req, res, next) {
    const numberPhone = req.user.numberPhone;
    const user = await db.User.findOne({
      where: {
        numberPhone: numberPhone,
      },
    });
    const data = req.body;
    data.idComment && delete data["idComment"];
    await db.Comment.create({
      ...data,
      status: 1,
      userID: user.idUser,
    });
    res.status(200).json({
      type: "success",
      messege: "created cmt",
    });
  }

  async getCommentLesson(req, res, next) {
    const data = req.body;
    const comments = await db.Comment.findAll({
      where: { ...data, parentId: null },
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
    if (!comments) {
      return res.status(404).json({
        type: "error",
        messege: "Comment not found",
      });
    }
    res.status(200).json(comments);
  }

  async getRepComment(req, res, next) {
    const listRep = await db.Comment.findAll({
      where: {
        parentId: req.params.id,
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
    if (!listRep) {
      return res.status(404).json({
        type: "error",
        messege: "Comment not found",
      });
    }
    res.status(200).json(listRep);
  }
}

module.exports = new CommentController();
