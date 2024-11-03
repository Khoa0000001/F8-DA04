const { DataTypes } = require('sequelize');
const { sequelize } = require('../../config/db'); // Đảm bảo đường dẫn tới file db.js là chính xác

const CourseParticipation = sequelize.define(
    'CourseParticipation',
    {
        idCoursePraticipation: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        status: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 1,
        },
        userID: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'users',
                key: 'idUser',
            },
        },
        courseID: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'courses',
                key: 'idCourse',
            },
        },
    },
    {
        tableName: 'coursepraticipations',
        timestamps: true,
    }
);

module.exports = CourseParticipation;
