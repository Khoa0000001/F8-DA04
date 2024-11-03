const { DataTypes } = require('sequelize');
const { sequelize } = require('../../config/db'); // Đảm bảo đường dẫn tới file db.js là chính xác

const DetailBill = sequelize.define(
    'DetailBill',
    {
        idDetailBill: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        nameCourse: {
            type: DataTypes.STRING(255),
            allowNull: true,
        },
        nameCategory: {
            type: DataTypes.STRING(255),
            allowNull: true,
        },
        nameUser: {
            type: DataTypes.STRING(255),
            allowNull: true,
        },
        numberPhone: {
            type: DataTypes.STRING(50),
            allowNull: true,
        },
        price: {
            type: DataTypes.DECIMAL(15, 2),
            allowNull: true,
        },
        discountValue: {
            type: DataTypes.DECIMAL(5, 2),
            allowNull: true,
        },
        priceResults: {
            type: DataTypes.DECIMAL(15, 2),
            allowNull: true,
        },
        status: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 1,
        },
        courseID: {
            type: DataTypes.INTEGER,
            references: {
                model: 'courses',
                key: 'idCourse',
            },
            onDelete: 'SET NULL',
        },
        userID: {
            type: DataTypes.INTEGER,
            references: {
                model: 'users',
                key: 'idUser',
            },
            onDelete: 'SET NULL',
        },
    },
    {
        tableName: 'detailbills',
        timestamps: true,
    }
);

module.exports = DetailBill;
