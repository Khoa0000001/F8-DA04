const db = require("../models/index");
const { Op } = require("sequelize");
const { Sequelize } = require("sequelize"); // Import Sequelize

class QuestionController {
  //[GET] get info Question
  async info(req, res, next) {
    const question = await db.Question.findOne({
      where: {
        idQuestion: req.params.id,
        status: 1,
      },
      include: [
        {
          model: db.Answer,
          as: "answers",
          where: {
            status: 1,
          },
          attributes: ["idAnswer", "questionID", "value"],
          required: false,
        },
      ],
      order: Sequelize.literal("RAND()"), // Sắp xếp ngẫu nhiên các câu trả lời
    });

    if (!question) {
      return res.status(404).json({
        type: "error",
        messege: "question not found",
      });
    }
    res.status(200).json(question);
  }
  async Question_Answer(req, res, next) {
    try {
      const data = req.body;
      const IdCourse = data.idCourse;
      const IdLesson = data.idLesson;

      // Truy vấn con để lấy danh sách idLesson phù hợp
      const subQuery = `
            SELECT \`lessons\`.\`idLesson\`
            FROM \`lessons\`
            INNER JOIN \`partcourses\` ON \`lessons\`.\`partCourseID\` = \`partcourses\`.\`idPartCourse\`
            INNER JOIN \`courses\` ON \`partcourses\`.\`courseID\` = \`courses\`.\`idCourse\`
            INNER JOIN \`categories\` ON \`courses\`.\`categoryID\` = \`categories\`.\`idCategory\`
            WHERE \`categories\`.\`status\` = 1
            AND \`courses\`.\`status\` = 1
            AND \`partcourses\`.\`status\` = 1
            AND \`lessons\`.\`status\` = 1
            ${
              parseInt(IdCourse) !== 0
                ? `AND \`courses\`.\`idCourse\` = ${IdCourse}`
                : ""
            }
            ${
              parseInt(IdLesson) !== 0
                ? `AND \`lessons\`.\`idLesson\` = ${IdLesson}`
                : ""
            }
        `;
      // Điều kiện cho bảng Question
      const whereConditions = {
        lessonID: {
          [Sequelize.Op.in]: Sequelize.literal(`(${subQuery})`),
        },
      };
      const questions = await db.Question.findAll({
        where: whereConditions,
        include: [
          {
            model: db.Answer,
            as: "answers",
            required: false,
          },
        ],
      });

      res.status(200).json(questions);
      // return questions;
    } catch (error) {
      console.error("Error fetching questions and answers:", error);
    }
  }

  async addQuestion(req, res, next) {
    const data = req.body;
    data.idQuestion && delete data["idQuestion"];
    await db.Question.create(data);
    res.status(200).json({
      type: "success",
      messege: "created Question",
    });
  }

  async setStatus(req, res, next) {
    const data = req.body;
    const idQuestion = data.idQuestion;
    const status = data.value;

    const question = await db.Question.findOne({
      where: {
        idQuestion: idQuestion,
      },
      attributes: ["title"],
    });

    await db.Question.update(
      { status: status },
      {
        where: {
          idQuestion: idQuestion,
        },
      }
    );

    res.status(200).json({
      type: "success",
      messege: question,
    });
  }

  //[PUT] insert a new course
  async updateQuestion(req, res, next) {
    const data = req.body;
    const idQuestion = data.idQuestion;
    data.idQuestion && delete data["idQuestion"];
    await db.Question.update(data, {
      where: {
        idQuestion: idQuestion,
      },
    });
    res.status(200).json({
      type: "success",
      messege: "update Question",
    });
  }

  async deleteQuestion(req, res, next) {
    const question = await db.Question.destroy({
      where: {
        idQuestion: req.params.id,
      },
    });
    res.status(200).json({
      type: "success",
      messege: "delete Question.",
    });
  }
  async getCourseID(req, res, next) {
    const question = await db.Question.findOne({
      where: {
        idQuestion: req.params.id,
      },
      include: [
        {
          model: db.Lesson,
          as: "lessons",
          where: {
            status: 1,
          },
          required: false,
          include: [
            {
              model: db.PartCourse,
              as: "partCourses",
              where: {
                status: 1,
              },
              required: false,
            },
          ],
        },
      ],
    });
    if (!question) {
      res.status(400).json(question);
    }
    const ruslt = {
      idQuestion: question.idQuestion,
      idCourse: question.lessons.partCourses.courseID,
    };
    res.status(200).json(ruslt);
  }
}

module.exports = new QuestionController();
