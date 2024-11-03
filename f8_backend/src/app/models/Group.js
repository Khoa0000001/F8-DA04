const { DataTypes } = require('sequelize');
const { sequelize } = require('../../config/db');

const Group = sequelize.define(
    'Group',
    {
        idGroup: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        nameGroup: {
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
    },
    {
        // Các tùy chọn model
        tableName: 'groups', // Tên bảng trong cơ sở dữ liệu
        timestamps: true, // Cho phép sử dụng các trường mặc định createdAt và updatedAt
    }
);

module.exports = Group;
