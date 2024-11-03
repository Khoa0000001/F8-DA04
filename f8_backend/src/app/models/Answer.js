const { DataTypes } = require('sequelize');
const { sequelize } = require('../../config/db'); // Đảm bảo đường dẫn tới file db.js là chính xác

const Answer = sequelize.define(
    'Answer',
    {
        idAnswer: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        value: {
            type: DataTypes.STRING(1000),
            allowNull: true,
        },
        correctAnswer: {
            type: DataTypes.BOOLEAN,
            allowNull: true,
        },
        status: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 1,
        },
        questionID: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'questions',
                key: 'idQuestion',
            },
        },
    },
    {
        tableName: 'answers',
        timestamps: true,
    }
);

module.exports = Answer;
