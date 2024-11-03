const Answer = require("./Answer");
const Blog = require("./Blog");
const Category = require("./Category");
const Comment = require("./Comment");
const CommentType = require("./CommentType");
const Course = require("./Course");
const CourseParticipation = require("./CourseParticipation");
const CourseResult = require("./CourseResult");
const Discount = require("./Discount");
const Lesson = require("./Lesson");
const PartCourse = require("./PartCourse");
const Question = require("./Question");
const User = require("./User");
const Group = require("./Group");
const Role = require("./Role");
const Group_Role = require("./Group_Role");
const Process = require("./Process");
const DetailBill = require("./DetailBills");
const Notification = require("./Notification");
const NotificationType = require("./NotificationType");

// Establishing the relationships
//User
User.belongsTo(Group, {
  foreignKey: "groupID",
  targetKey: "idGroup",
  as: "groups",
});
Group.hasMany(User, {
  foreignKey: "groupID",
  sourceKey: "idGroup",
  as: "users",
});

User.belongsToMany(Course, {
  through: CourseParticipation,
  foreignKey: "userID",
  as: "courses",
});
Course.belongsToMany(User, {
  through: CourseParticipation,
  foreignKey: "courseID",
  as: "users",
});

User.hasMany(Blog, {
  foreignKey: "userID",
  sourceKey: "idUser",
  as: "blos",
});
Blog.belongsTo(User, {
  foreignKey: "userID",
  targetKey: "idUser",
  as: "users",
});

User.hasMany(Comment, {
  foreignKey: "userID",
  sourceKey: "idUser",
  as: "comments",
});

Comment.belongsTo(User, {
  foreignKey: "userID",
  targetKey: "idUser",
  as: "users",
});

User.hasMany(Notification, {
  foreignKey: "userID",
  sourceKey: "idUser",
  as: "notifications",
});

Notification.belongsTo(User, {
  foreignKey: "userID",
  targetKey: "idUser",
  as: "users",
});

User.belongsToMany(Lesson, {
  through: Process,
  foreignKey: "userID",
  as: "lessons",
});
Lesson.belongsToMany(User, {
  through: Process,
  foreignKey: "lessonID",
  as: "users",
});

//Comment
Comment.belongsTo(CommentType, {
  foreignKey: "commentTypeID",
  targetKey: "idCommentType",
  as: "commenttypes",
});
CommentType.hasMany(Comment, {
  foreignKey: "commentTypeID",
  targetKey: "idCommentType",
  as: "comments",
});

//Notification
Notification.belongsTo(NotificationType, {
  foreignKey: "notificationTypeID",
  targetKey: "idNotificationType",
  as: "notificationtypes",
});
NotificationType.hasMany(Notification, {
  foreignKey: "notificationTypeID",
  targetKey: "idNotificationType",
  as: "notifications",
});

// Group
Group.belongsToMany(Role, {
  through: Group_Role,
  foreignKey: "groupID",
  as: "roles",
});
Role.belongsToMany(Group, {
  through: Group_Role,
  foreignKey: "roleID",
  as: "groups,",
});

//Course
Course.belongsTo(Category, {
  foreignKey: "categoryID",
  targetKey: "idCategory",
  as: "categories",
});
Category.hasMany(Course, {
  foreignKey: "categoryID",
  sourceKey: "idCategory",
  as: "courses",
});

Course.belongsTo(Discount, {
  foreignKey: "discountID",
  targetKey: "idDiscount",
  as: "discounts",
});
Discount.hasMany(Course, {
  foreignKey: "discountID",
  sourceKey: "idDiscount",
  as: "courses",
});

Course.hasMany(PartCourse, {
  foreignKey: "courseID",
  sourceKey: "idCourse",
  as: "partCourses",
});
PartCourse.belongsTo(Course, {
  foreignKey: "courseID",
  targetKey: "idCourse",
  as: "courses",
});

Course.hasMany(CourseResult, {
  foreignKey: "courseID",
  sourceKey: "idCourse",
  as: "courseResults",
});
CourseResult.belongsTo(Course, {
  foreignKey: "courseID",
  targetKey: "idCourse",
  as: "courses",
});

Course.hasMany(CourseParticipation, {
  foreignKey: "courseID",
  as: "courseParticipations",
});
// PartCourse
PartCourse.hasMany(Lesson, {
  foreignKey: "partCourseID",
  sourceKey: "idPartCourse",
  as: "lessons",
});
Lesson.belongsTo(PartCourse, {
  foreignKey: "partCourseID",
  targetKey: "idPartCourse",
  as: "partCourses",
});

// Lesson
Lesson.hasMany(Question, {
  foreignKey: "lessonID",
  sourceKey: "idLesson",
  as: "questions",
});
Question.belongsTo(Lesson, {
  foreignKey: "lessonID",
  targetKey: "idLesson",
  as: "lessons",
});
Lesson.hasMany(Process, { foreignKey: "lessonID", as: "processes" });

// Question
Question.hasMany(Answer, {
  foreignKey: "questionID",
  as: "answers",
});
Answer.belongsTo(Question, {
  foreignKey: "questionID",
  targetKey: "idQuestion",
  as: "questions",
});

//CourseParticipation
CourseParticipation.belongsTo(Course, {
  foreignKey: "courseID",
  targetKey: "idCourse",
  as: "courses",
});

//Process
Process.belongsTo(Lesson, {
  foreignKey: "lessonID",
  targetKey: "idLesson",
  as: "lessons",
});

// DetailBill
User.belongsToMany(Course, {
  through: DetailBill,
  foreignKey: "userID",
  as: "course",
});

Course.belongsToMany(User, {
  through: DetailBill,
  foreignKey: "courseID",
  as: "user",
});

module.exports = {
  Group,
  Role,
  Group_Role,
  Answer,
  Course,
  CourseParticipation,
  CourseResult,
  Blog,
  Category,
  Comment,
  CommentType,
  Discount,
  Lesson,
  PartCourse,
  Question,
  User,
  Process,
  DetailBill,
  Notification,
  NotificationType,
};
