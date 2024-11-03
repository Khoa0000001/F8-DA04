const db = require('../models/index');
const { Op } = require('sequelize');

class ProcessController {
    //[GET] get info Lesson
    async infoLesson(req, res, next) {
        const user = await db.User.findOne({
            where: {
                numberPhone: req.user.numberPhone,
            },
        });
        const userId = user.idUser;
        const lessonId = req.params.id;
        const checkLesson = await db.Process.findOne({
            where: {
                UserId: userId,
                lessonId: lessonId,
            },
        });
        if (!checkLesson) {
            return res.status(404).json({
                type: 'error',
                messege: 'Lesson not found',
            });
        }
        const lesson = await db.Lesson.findOne({
            where: {
                idLesson: lessonId,
            },
        });
        if (!lesson) {
            return res.status(404).json({
                type: 'error',
                messege: 'Lesson not found',
            });
        }
        res.status(200).json(lesson);
    }

    async studyingLesson(req, res, next) {
        const user = await db.User.findOne({
            where: {
                numberPhone: req.user.numberPhone,
            },
        });
        const userId = user.idUser;
        const courseId = req.params.id;
        // Tìm lesson gần nhất được thêm vào cho user và course
        const recentLesson = await db.Lesson.findOne({
            where: {
                status: 1,
            },
            include: [
                {
                    model: db.Process,
                    as: 'processes',
                    where: {
                        userID: userId,
                    },
                    required: true,
                },
                {
                    model: db.PartCourse,
                    as: 'partCourses',
                    include: [
                        {
                            model: db.Course,
                            as: 'courses',
                            where: {
                                idCourse: courseId,
                            },
                            required: true,
                        },
                    ],
                    required: true,
                },
            ],
            order: [['createdAt', 'DESC']], // Sắp xếp theo createdAt giảm dần
        });

        if (recentLesson) {
            return res.status(200).json(recentLesson);
        }

        // Nếu không có lesson gần nhất, lấy lesson đầu tiên của course
        const firstLesson = await db.Lesson.findOne({
            where: {
                status: 1,
            },
            include: [
                {
                    model: db.PartCourse,
                    as: 'partCourses',
                    include: [
                        {
                            model: db.Course,
                            as: 'courses',
                            where: {
                                idCourse: courseId,
                            },
                            required: true,
                        },
                    ],
                    required: true,
                },
            ],
            order: [['createdAt', 'ASC']], // Sắp xếp theo createdAt tăng dần
        });

        if (firstLesson) {
            return res.status(200).json(firstLesson);
        }
        if (!firstLesson) {
            return res.status(404).json({
                type: 'error',
                messege: 'Courses not exist Lesson',
            });
        }
    }

    //[POST] add a new process
    async AddProcess(req, res, next) {
        const user = await db.User.findOne({
            where: {
                numberPhone: req.user.numberPhone,
            },
        });
        const userId = user.idUser;
        const lessonId = req.body.lessonId;
        await db.Process.create({
            userID: userId,
            lessonID: lessonId,
        });
        res.status(200).json({
            type: 'success',
            messege: 'add process',
        });
    }
}

module.exports = new ProcessController();
