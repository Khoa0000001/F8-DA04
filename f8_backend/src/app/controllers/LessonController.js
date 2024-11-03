const db = require("../models/index");
const { Op } = require("sequelize");

class LessonController {
  //[GET] get info Lesson
  async info(req, res, next) {
    const lesson = await db.Lesson.findOne({
      where: {
        idLesson: req.params.id,
      },
    });
    if (!lesson) {
      return res.status(404).json({
        type: "error",
        messege: "Lesson not found",
      });
    }
    res.status(200).json(lesson);
  }
  async Course_Lesson(req, res, next) {
    try {
      const user = await db.User.findOne({
        where: {
          numberPhone: req.user.numberPhone,
        },
      });

      const userId = user.idUser;
      const courseId = req.params.id;

      const listCourse = await db.Course.findOne({
        where: {
          status: 1,
          idCourse: courseId,
        },
        include: [
          {
            model: db.PartCourse,
            as: "partCourses",
            where: {
              status: 1,
            },
            required: false,
            include: [
              {
                model: db.Lesson,
                as: "lessons",
                where: {
                  status: 1,
                },
                include: [
                  {
                    model: db.Question,
                    as: "questions",
                    where: {
                      status: 1,
                    },
                    required: false,
                  },
                ],
                required: false,
              },
            ],
          },
        ],
      });

      if (!listCourse) {
        return res.status(404).json({
          type: "error",
          message: "Course not found",
        });
      }

      // Sắp xếp lại các phần tử sau khi lấy từ cơ sở dữ liệu
      if (listCourse) {
        listCourse.partCourses.forEach((partCourse) => {
          // Sắp xếp lessons theo createdAt ASC
          partCourse.lessons.sort(
            (a, b) => new Date(a.createdAt) - new Date(b.createdAt)
          );
          partCourse.lessons.forEach((lesson) => {
            // Sắp xếp questions theo createdAt ASC
            lesson.questions.sort(
              (a, b) => new Date(a.createdAt) - new Date(b.createdAt)
            );
          });
        });

        // Sắp xếp partCourses theo createdAt ASC
        listCourse.partCourses.sort(
          (a, b) => new Date(a.createdAt) - new Date(b.createdAt)
        );
      }

      // Lấy danh sách các bài học mà người dùng đã học
      const learnedLessons = await db.Process.findAll({
        where: {
          userID: userId,
          status: 1,
        },
        attributes: ["lessonID"],
      });

      const learnedLessonIds = learnedLessons.map(
        (process) => process.lessonID
      );

      // Tính tổng số lessons và số lessons đã học
      let totalLessons = 0;
      let learnedLessonsCount = 0;

      listCourse.partCourses.forEach((partCourse) => {
        totalLessons += partCourse.lessons.length;
        partCourse.lessons.forEach((lesson) => {
          lesson.dataValues.haveLearned = learnedLessonIds.includes(
            lesson.idLesson
          )
            ? 1
            : 0;
          if (lesson.dataValues.haveLearned) {
            learnedLessonsCount++;
          }
        });
      });

      // Thêm trường process vào listCourse
      listCourse.dataValues.process =
        (learnedLessonsCount / totalLessons) * 100;

      listCourse.dataValues.totalLessons = totalLessons;

      listCourse.dataValues.learnedLessonsCount = learnedLessonsCount;

      res.status(200).json(listCourse);
    } catch (error) {
      console.error("Error fetching course lessons:", error);
      res.status(500).json({
        type: "error",
        message: "Internal server error",
      });
    }
  }

  async addLesson(req, res, next) {
    const data = req.body;
    data.idLesson && delete data["idLesson"];
    await db.Lesson.create(data);
    res.status(200).json({
      type: "success",
      messege: "created course",
    });
  }

  async setStatus(req, res, next) {
    const data = req.body;
    const idLesson = data.idLesson;
    const status = data.value;

    const lesson = await db.Lesson.findOne({
      where: {
        idLesson: idLesson,
      },
      attributes: ["nameLesson"],
    });

    await db.Lesson.update(
      { status: status },
      {
        where: {
          idLesson: idLesson,
        },
      }
    );

    res.status(200).json({
      type: "success",
      messege: lesson,
    });
  }

  //[PUT] insert a new course
  async updateLesson(req, res, next) {
    const data = req.body;
    const idLesson = data.idLesson;
    data.idLesson && delete data["idLesson"];
    await db.Lesson.update(data, {
      where: {
        idLesson: idLesson,
      },
    });
    res.status(200).json({
      type: "success",
      messege: "update Lesson",
    });
  }

  async deleteLesson(req, res, next) {
    const lesson = await db.Lesson.destroy({
      where: {
        idLesson: req.params.id,
      },
    });
    res.status(200).json({
      type: "success",
      messege: "delete Lesson",
    });
  }

  async listLessonStatus1(req, res, next) {
    const { idCourse } = req.params;
    let listLesson;
    if (parseInt(idCourse) === 0) {
      listLesson = await db.Lesson.findAll({
        where: {
          status: 1,
        },
      });
    } else {
      listLesson = await db.Lesson.findAll({
        include: {
          model: db.PartCourse,
          where: { courseID: idCourse, status: 1 },
          include: {
            model: db.Course,
            as: "courses",
          },
          as: "partCourses",
        },
        where: {
          status: 1,
        },
      });
    }

    res.status(200).json(listLesson);
  }
  async getCourseID(req, res, next) {
    const courseId = await db.Lesson.findOne({
      where: {
        idLesson: req.params.id,
      },
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
    });
    if (!courseId) {
      res.status(400).json(courseId);
    }
    const ruslt = {
      idLesson: courseId.idLesson,
      idCourse: courseId.partCourses.courseID,
    };
    res.status(200).json(ruslt);
  }
}

module.exports = new LessonController();
