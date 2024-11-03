const siteRouter = require("./siteRouter");
const usersRouter = require("./usersRouter");
const authRouter = require("./authRouter");
const categoryRouter = require("./categoryRouter");
const courseRouter = require("./courseRouter");
const registerCourseRouter = require("./registerCourseRouter");
const lessonRouter = require("./lessonRouter");
const processRouter = require("./processRouter");
const questionRouter = require("./questionRouter");
const partCourseRouter = require("./partCourseRouter");
const answerRouter = require("./answerRouter");
const discountRouter = require("./discountRouter");
const detailBillsRouter = require("./detailBillsRouter");
const commentRouter = require("./commentRouter");
const notificationRouter = require("./notificationRouter");

const nameAPI = "/api";
const stripApiPrefix = require("../middleware/stripApiPrefix");

function route(app) {
  app.use(stripApiPrefix(nameAPI));
  app.use(nameAPI + "/notification", notificationRouter);
  app.use(nameAPI + "/comment", commentRouter);
  app.use(nameAPI + "/detailBills", detailBillsRouter);
  app.use(nameAPI + "/discount", discountRouter);
  app.use(nameAPI + "/CourseParticipation", registerCourseRouter);
  app.use(nameAPI + "/answer", answerRouter);
  app.use(nameAPI + "/process", processRouter);
  app.use(nameAPI + "/question", questionRouter);
  app.use(nameAPI + "/partCourse", partCourseRouter);
  app.use(nameAPI + "/lesson", lessonRouter);
  app.use(nameAPI + "/course", courseRouter);
  app.use(nameAPI + "/category", categoryRouter);
  app.use(nameAPI + "/user", usersRouter);
  app.use(nameAPI + "/auth", authRouter);
  app.use(nameAPI + "/", siteRouter);

  // Bắt các lỗi và gửi phản hồi
  app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({
      type: "error",
      message: err,
    });
  });
}

module.exports = route;
