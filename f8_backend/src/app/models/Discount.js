const { DataTypes } = require('sequelize');
const { sequelize } = require('../../config/db'); // Đảm bảo đường dẫn tới file db.js là chính xác

const Discount = sequelize.define(
    'Discount',
    {
        idDiscount: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        title: {
            type: DataTypes.STRING(255),
            allowNull: true,
        },
        value: {
            type: DataTypes.DECIMAL(5, 2),
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
        expiredAt: {
            type: DataTypes.DATE,
            allowNull: true,
        },
    },
    {
        tableName: 'discounts',
        timestamps: true,
    }
);

module.exports = Discount;
