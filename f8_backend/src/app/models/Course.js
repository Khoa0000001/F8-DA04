const { DataTypes } = require('sequelize');
const { sequelize } = require('../../config/db'); // Đảm bảo đường dẫn tới file db.js là chính xác

const Course = sequelize.define(
    'Course',
    {
        idCourse: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        nameCourse: {
            type: DataTypes.STRING(255),
            allowNull: true,
        },
        description: {
            type: DataTypes.STRING(500),
            allowNull: true,
        },
        image: {
            type: DataTypes.STRING(255),
            allowNull: true,
        },
        videoDemo: {
            type: DataTypes.STRING(500),
            allowNull: true,
        },
        price: {
            type: DataTypes.DECIMAL(15, 2),
            allowNull: true,
        },
        status: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 1,
        },
        categoryID: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'categories',
                key: 'idCategory',
            },
        },
        discountID: {
            type: DataTypes.INTEGER,
            allowNull: true,
            references: {
                model: 'discounts',
                key: 'idDiscount',
            },
        },
    },
    {
        tableName: 'courses',
        timestamps: true,
    }
);

module.exports = Course;
