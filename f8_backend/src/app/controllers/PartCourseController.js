const db = require('../models/index');
const { Op } = require('sequelize');

class PartCourseController {
    async partOfLessonOrQuestion(req, res, next) {
        let partCourse;
        if (req.body.type === 'lesson') {
            partCourse = await db.Lesson.findOne({
                where: {
                    idLesson: req.body.id,
                },
                attributes: ['partCourseID'],
            });
        } else if (req.body.type === 'question') {
            partCourse = await db.Question.findOne({
                where: {
                    idQuestion: req.body.id,
                },
                include: [
                    {
                        model: db.Lesson,
                        as: 'lessons', // Đảm bảo alias của Lesson là 'lesson'
                        attributes: ['partCourseID'],
                        raw: true,
                    },
                ],
            });
            if (partCourse) {
                partCourse = partCourse.lessons;
            }
        }
        if (!partCourse) {
            return res.status(404).json({
                type: 'error',
                message: 'Part course not found',
            });
        }

        res.status(200).json(partCourse);
    }

    async listPartCoursesOfCourse(req, res, next) {
        const listPartCourses = await db.PartCourse.findAll({
            where: {
                courseID: req.params.id,
            },
            include: [
                {
                    model: db.Lesson,
                    as: 'lessons',
                },
            ],
        });
        res.status(200).json(listPartCourses);
    }

    async addPartCoursesOfCourse(req, res, next) {
        const data = req.body;
        data.idPartCourse && delete data['idPartCourse'];
        await db.PartCourse.create(data);
        res.status(200).json({
            type: 'success',
            messege: 'created PartCourse',
        });
    }

    async updatePartCoursesOfCourse(req, res, next) {
        const data = req.body;
        const idPartCourse = data.idPartCourse;
        data.idPartCourse && delete data['idPartCourse'];
        await db.PartCourse.update(data, {
            where: {
                idPartCourse: idPartCourse,
            },
        });
        res.status(200).json({
            type: 'success',
            messege: 'update PartCourse',
        });
    }

    async deletePartCourses(req, res, next) {
        const partCourse = await db.PartCourse.destroy({
            where: {
                idPartCourse: req.params.id,
            },
        });
        res.status(200).json({
            type: 'success',
            messege: 'delete PartCourse',
        });
    }

    async setStatus(req, res, next) {
        const data = req.body;
        const idPartCourse = data.idPartCourse;
        const status = data.value;

        const partCourse = await db.PartCourse.findOne({
            where: {
                idPartCourse: idPartCourse,
            },
            attributes: ['namePartCourse'],
        });

        await db.PartCourse.update(
            { status: status },
            {
                where: {
                    idPartCourse: idPartCourse,
                },
            }
        );

        res.status(200).json({
            type: 'success',
            messege: partCourse,
        });
    }
}

module.exports = new PartCourseController();
