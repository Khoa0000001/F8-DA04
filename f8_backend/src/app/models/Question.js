const { DataTypes } = require('sequelize');
const { sequelize } = require('../../config/db');

const Question = sequelize.define(
    'Question',
    {
        idQuestion: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        title: {
            type: DataTypes.STRING(255),
            allowNull: true,
        },
        value: {
            type: DataTypes.STRING(1000),
            allowNull: true,
        },
        status: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 1,
        },
        lessonID: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'lessons',
                key: 'idLesson',
            },
        },
    },
    {
        tableName: 'questions',
        timestamps: true, // Nếu bạn muốn Sequelize tự động quản lý các trường createdAt và updatedAt
    }
);

module.exports = Question;
