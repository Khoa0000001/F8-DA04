const db = require('../models/index');
const { Op, Sequelize, json } = require('sequelize');

class RegisterCourseController {
    //[GET] get all
    async index(req, res, next) {
        const listRegister = await db.CourseParticipation.findAll();
        if (!listRegister) {
            return res.status(404).json({
                type: 'error',
                messege: ' not found',
            });
        }
        res.status(200).json(listRegister);
    }

    //[GET] check register course
    async getRegisterCourse(req, res, next) {
        try {
            const user = await db.User.findOne({
                where: {
                    numberPhone: req.user.numberPhone,
                },
            });

            const registerCourses = await db.CourseParticipation.findAll({
                where: {
                    userID: user.idUser,
                    status: 1,
                },
                include: [
                    {
                        model: db.Course,
                        as: 'courses',
                        where: {
                            status: 1,
                        },
                        include: [
                            {
                                model: db.Category,
                                as: 'categories',
                                where: {
                                    status: 1,
                                },
                                // required: false,
                            },
                            {
                                model: db.PartCourse,
                                as: 'partCourses',
                                where: {
                                    status: 1,
                                },
                                required: false,
                                include: [
                                    {
                                        model: db.Lesson,
                                        as: 'lessons',
                                        where: {
                                            status: 1,
                                        },
                                        required: false,
                                    },
                                ],
                            },
                        ],
                    },
                ],
            });

            // Lấy danh sách các bài học mà người dùng đã học
            const learnedLessons = await db.Process.findAll({
                where: {
                    userID: user.idUser,
                    status: 1,
                },
                attributes: ['lessonID'],
            });

            const learnedLessonIds = learnedLessons.map(
                (process) => process.lessonID
            );

            registerCourses.forEach((courseParticipation) => {
                const course = courseParticipation.courses;
                if (course) {
                    let totalLessons = 0;
                    let learnedLessonsCount = 0;

                    course.partCourses.forEach((partCourse) => {
                        totalLessons += partCourse.lessons.length;
                        partCourse.lessons.forEach((lesson) => {
                            if (learnedLessonIds.includes(lesson.idLesson)) {
                                learnedLessonsCount++;
                            }
                        });
                    });

                    // Thêm trường process vào mỗi course
                    course.dataValues.process =
                        (learnedLessonsCount / totalLessons) * 100;
                    // Xóa trường partCourses khỏi course
                    delete course.dataValues.partCourses;
                }
            });

            res.status(200).json(registerCourses);
        } catch (error) {
            console.error('Error fetching registered courses:', error);
            res.status(500).json({
                type: 'error',
                message: 'Lỗi máy chủ nội bộ',
            });
        }
    }

    //[POST] register a new course
    async registerCourse(req, res, next) {
        const idCourse = req.params.id;
        const user = await db.User.findOne({
            where: {
                numberPhone: req.user.numberPhone,
                groupID: 2,
            },
        });
        const course = await db.Course.findOne({
            where: {
                idCourse: idCourse,
            },
            include: [
                {
                    model: db.Category,
                    as: 'categories',
                },
                {
                    model: db.Discount,
                    as: 'discounts',
                },
            ],
        });

        if (!user) {
            return res.status(404).json({
                type: 'error',
                message: 'User not found',
            });
        }
        try {
            // Tạo bản ghi trong bảng CourseParticipation
            await db.CourseParticipation.create({
                userID: user.idUser,
                courseID: idCourse,
            });
            //Tạo bản ghi trong bảng detailbill
            await db.DetailBill.create({
                nameCourse: course.nameCourse,
                nameCategory: course?.categories?.nameCategory,
                nameUser: user.name,
                numberPhone: user.numberPhone,
                price: course.price,
                discountValue: course?.discounts?.value,
                userID: user.idUser,
                courseID: idCourse,
                priceResults:
                    course.price -
                    (course.price *
                        (course?.discounts?.value
                            ? course?.discounts?.value
                            : 0)) /
                        100,
            });

            // Lấy LessonID của bài học đầu tiên trong khóa học
            const firstLesson = await db.Lesson.findOne({
                where: {
                    partCourseID: {
                        [Op.in]: Sequelize.literal(
                            `(SELECT idPartCourse FROM partcourses WHERE courseID = ${idCourse})`
                        ),
                    },
                },
                order: [['createdAt', 'ASC']],
            });

            if (firstLesson) {
                // Kiểm tra xem User đã có bài học đầu tiên trong bảng Processes chưa
                const processExists = await db.Process.findOne({
                    where: {
                        userID: user.idUser,
                        lessonID: firstLesson.idLesson,
                    },
                });

                // Nếu User chưa có bài học đầu tiên, thêm bản ghi mới vào bảng Processes
                if (!processExists) {
                    await db.Process.create({
                        userID: user.idUser,
                        lessonID: firstLesson.idLesson,
                    });
                }
            }

            res.status(200).json({
                type: 'success',
                message: 'Created course and updated processes',
            });
        } catch (err) {
            console.log(err);
            res.status(500).json({
                type: 'error',
                message: 'Internal server error',
            });
        }
    }
}

module.exports = new RegisterCourseController();
