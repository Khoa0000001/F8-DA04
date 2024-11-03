const { DataTypes, Model } = require('sequelize'); // Import Model từ sequelize
const { sequelize } = require('../../config/db'); // Đảm bảo đường dẫn tới file db.js là chính xác
// const Group = require('./Group');
// const Role = require('./Role');

const Group_Role = sequelize.define(
    'Group_Role',
    {
        idGroupRole: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        status: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 1,
        },
        groupID: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'groups',
                key: 'idGroup',
            },
        },
        roleID: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'roles',
                key: 'idRole',
            },
        },
    },
    {
        tableName: 'group_roles',
        timestamps: true,
    }
);

module.exports = Group_Role;
