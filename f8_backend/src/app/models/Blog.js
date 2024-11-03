const { DataTypes } = require('sequelize');
const { sequelize } = require('../../config/db'); // Đảm bảo đường dẫn tới file db.js là chính xác

const Blog = sequelize.define(
    'Blog',
    {
        idBlog: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        title: {
            type: DataTypes.STRING(500),
            allowNull: true,
        },
        value: {
            type: DataTypes.STRING(9000),
            allowNull: false,
        },
        likes: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 0,
        },
        userID: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'users',
                key: 'idUser',
            },
        },
        status: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 1,
        },
    },
    {
        tableName: 'blogs',
        timestamps: true,
    }
);

module.exports = Blog;
