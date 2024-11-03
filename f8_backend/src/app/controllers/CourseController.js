const db = require('../models/index');
const { Op, Sequelize } = require('sequelize');

class CourseController {
    //[GET] get all
    async index(req, res, next) {
        const listCourse = await db.Course.findAll();
        if (!listCourse) {
            return res.status(404).json({
                type: 'error',
                messege: 'Course not found',
            });
        }
        res.status(200).json(listCourse);
    }

    //[GET] get info Course
    async course_partcourses_lessons_courseresults(req, res, next) {
        const listCourse = await db.Course.findOne({
            where: {
                [Op.and]: [{ idCourse: req.params.id }, { status: 1 }],
            },
            include: [
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
                            // attributes: ['nameLesson'],
                            required: false,
                        },
                    ],
                },
                {
                    model: db.CourseResult,
                    as: 'courseResults',
                    where: {
                        status: 1,
                    },
                    required: false,
                },
                {
                    model: db.Discount,
                    as: 'discounts',
                    where: {
                        status: 1,
                    },
                    required: false,
                },
            ],
        });

        if (!listCourse) {
            return res.status(404).json({
                type: 'error',
                messege: 'Course not found',
            });
        }

        // Sắp xếp các lessons theo thứ tự createdAt
        listCourse.partCourses.forEach((partCourse) => {
            partCourse.lessons.sort(
                (a, b) => new Date(a.createdAt) - new Date(b.createdAt)
            );
        });

        // Nếu muốn sắp xếp cả partCourses theo thứ tự createdAt
        listCourse.partCourses.sort(
            (a, b) => new Date(a.createdAt) - new Date(b.createdAt)
        );

        // Sắp xếp courseResults theo thứ tự createdAt
        listCourse.courseResults.sort(
            (a, b) => new Date(a.createdAt) - new Date(b.createdAt)
        );
        res.status(200).json(listCourse);
    }

    //[GET] get list CourseMoney
    async listCourseMoney(req, res, next) {
        const listCourse = await db.Course.findAll({
            where: {
                [Op.and]: [{ price: { [Op.gt]: 0 } }, { status: 1 }],
            },
            include: [
                {
                    model: db.Discount,
                    as: 'discounts',
                    required: false,
                },
                {
                    model: db.Category,
                    as: 'categories',
                    where: {
                        status: 1,
                    },
                    // required: false,
                },
            ],
        });
        if (!listCourse) {
            return res.status(404).json({
                type: 'error',
                messege: 'Course not found',
            });
        }
        res.status(200).json(listCourse);
    }

    //[GET] get list CourseFree
    async listCourseFree(req, res, next) {
        try {
            const listCourse = await db.Course.findAll({
                where: {
                    [Op.or]: [{ price: 0 }, { price: null }],
                    status: 1,
                },
                include: [
                    {
                        model: db.CourseParticipation,
                        as: 'courseParticipations',
                        attributes: [],
                    },
                    {
                        model: db.Category,
                        as: 'categories',
                        where: {
                            status: 1,
                        },
                        // required: false,
                    },
                ],
                attributes: {
                    include: [
                        [
                            Sequelize.fn(
                                'COUNT',
                                Sequelize.col(
                                    'courseParticipations.idCoursePraticipation'
                                )
                            ),
                            'participantsCount',
                        ],
                    ],
                },
                group: ['Course.idCourse'],
            });

            // Lặp qua danh sách khóa học để đảm bảo trả về 0 nếu không có ai đăng ký
            listCourse.forEach((course) => {
                if (!course.participantsCount) {
                    course.participantsCount = 0;
                }
            });

            res.status(200).json(listCourse);
        } catch (error) {
            console.error('Error fetching free courses:', error);
            res.status(500).json({
                type: 'error',
                message: 'Internal server error',
            });
        }
    }

    // [GET] get list courses of tablet admin
    async listCourseOfTable(req, res, next) {
        const listCourse = await db.Course.findAll({
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
                    model: db.Discount,
                    as: 'discounts',
                    where: {
                        status: 1,
                    },
                    required: false,
                },
            ],
        });
        res.status(200).json(listCourse);
    }

    // [GET] get list courses of tablet admin
    async listCourseStatus1(req, res, next) {
        const listCourse = await db.Course.findAll({
            where: {
                status: 1,
            },
        });

        res.status(200).json(listCourse);
    }

    //[POST] insert a new course
    async addCourse(req, res, next) {
        const data = req.body;
        data.idCourse && delete data['idCourse'];
        await db.Course.create(data);
        res.status(200).json({
            type: 'success',
            messege: 'created course',
        });
    }

    async setStatus(req, res, next) {
        const data = req.body;
        const idCourse = data.idCourse;
        const status = data.value;

        const course = await db.Course.findOne({
            where: {
                idCourse: idCourse,
            },
            attributes: ['nameCourse'],
        });

        await db.Course.update(
            { status: status },
            {
                where: {
                    idCourse: idCourse,
                },
            }
        );

        res.status(200).json({
            type: 'success',
            messege: course,
        });
    }

    //[PUT] insert a new course
    async updateCourse(req, res, next) {
        const data = req.body;
        const idCourse = data.idCourse;
        data.idCourse && delete data['idCourse'];
        await db.Course.update(data, {
            where: {
                idCourse: idCourse,
            },
        });
        res.status(200).json({
            type: 'success',
            messege: 'update course',
        });
    }

    async deleteCourse(req, res, next) {
        const course = await db.Course.destroy({
            where: {
                idCourse: req.params.id,
            },
        });
        res.status(200).json({
            type: 'success',
            messege: 'delete course',
        });
    }
}

module.exports = new CourseController();
