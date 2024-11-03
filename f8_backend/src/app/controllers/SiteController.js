const db = require('../models/index');
const { Op, where } = require('sequelize');
const { sequelize } = require('../../config/db');

class SiteController {
    // [GET]
    async searchCourses(req, res, next) {
        try {
            const value = req.query.value;

            const search = await db.Course.findAll({
                where: {
                    nameCourse: {
                        [Op.like]: `%${value}%`,
                    },
                },
            });

            res.status(200).json(search);
        } catch (error) {
            next(error);
        }
    }

    async getCoursesByRegistrations(req, res, next) {
        try {
            const courses = await sequelize.query(
                'CALL GetCoursesByRegistrations()'
            );
            res.status(200).json(courses);
        } catch (err) {
            console.error(err);
        }
    }

    async getStatistical(req, res, next) {
        try {
            const slCourse = await db.Course.count();
            const slUser = await db.User.count({
                where: {
                    groupID: 2,
                },
            });
            const total = await db.DetailBill.sum('priceResults', {
                where: {
                    status: 1,
                },
            });
            const slCourseParticipation = await db.CourseParticipation.count();
            res.status(200).json({
                slCourse,
                slUser,
                total,
                slCourseParticipation,
            });
        } catch (err) {
            console.error(err);
        }
    }
}

module.exports = new SiteController();
