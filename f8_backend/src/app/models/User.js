const { DataTypes } = require('sequelize');
const { sequelize } = require('../../config/db');
const generateName = require('../../untils/generateName');

const User = sequelize.define(
    'User',
    {
        // Định nghĩa các thuộc tính của bảng User
        idUser: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        avatar: {
            type: DataTypes.STRING(500),
            allowNull: true,
        },
        numberPhone: {
            type: DataTypes.STRING(50),
            allowNull: false,
            unique: true,
        },
        password: {
            type: DataTypes.STRING(255),
            allowNull: false,
        },
        email: {
            type: DataTypes.STRING(255),
            allowNull: true,
        },
        name: {
            type: DataTypes.STRING(255),
            allowNull: true,
        },
        userName: {
            type: DataTypes.STRING(255),
            unique: true,
        },
        bio: {
            type: DataTypes.STRING(1000),
            allowNull: true,
        },
        coverImage: {
            type: DataTypes.STRING(500),
            allowNull: true,
        },
        status: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 1,
        },
        groupID: {
            type: DataTypes.INTEGER,
            allowNull: true,
            defaultValue: 2,
            references: {
                model: 'groups', // Tên bảng nguồn khóa ngoại trỏ đến
                key: 'idGroup', // Tên trường khóa chính trong bảng nguồn
            },
        },
    },
    {
        // Các tùy chọn model
        tableName: 'users', // Tên bảng trong cơ sở dữ liệu
        timestamps: true, // Cho phép sử dụng các trường mặc định createdAt và updatedAt
    }
);

User.beforeCreate(async (user, options) => {
    user.name = await generateName();
});

module.exports = User;
