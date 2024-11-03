const { DataTypes } = require('sequelize');
const { sequelize } = require('../../config/db'); // Đảm bảo đường dẫn tới file db.js là chính xác

const Lesson = sequelize.define(
    'Lesson',
    {
        idLesson: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        nameLesson: {
            type: DataTypes.STRING(255),
            allowNull: true,
        },
        description: {
            type: DataTypes.STRING(500),
            allowNull: true,
        },
        videoID: {
            type: DataTypes.STRING(500),
            allowNull: true,
        },
        views: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 0,
        },
        likes: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 0,
        },
        image: {
            type: DataTypes.STRING(500),
            allowNull: true,
        },
        status: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 1,
        },
        partCourseID: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'partcourses',
                key: 'idPartCourse',
            },
        },
    },
    {
        tableName: 'lessons',
        timestamps: true,
    }
);

module.exports = Lesson;
