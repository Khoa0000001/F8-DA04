const { DataTypes } = require('sequelize');
const { sequelize } = require('../../config/db'); // Đảm bảo đường dẫn tới file db.js là chính xác

const PartCourse = sequelize.define(
    'PartCourse',
    {
        idPartCourse: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        namePartCourse: {
            type: DataTypes.STRING(255),
            allowNull: true,
        },
        description: {
            type: DataTypes.STRING(500),
            allowNull: true,
        },
        status: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 1,
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
        tableName: 'partcourses',
        timestamps: true, // Sử dụng các trường mặc định createdAt và updatedAt
    }
);

module.exports = PartCourse;
