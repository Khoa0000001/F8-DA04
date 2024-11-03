const { DataTypes } = require("sequelize");
const { sequelize } = require("../../config/db"); // Đảm bảo đường dẫn tới file db.js là chính xác

const Notification = sequelize.define(
  "Notification",
  {
    idNotification: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    idUserN: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    notificationTypeID: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "notificationtypes",
        key: "idNotificationType",
      },
    },
    userID: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "users",
        key: "idUser",
      },
    },
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    see: {
      type: DataTypes.INTEGER,
      allowNull: null,
      defaultValue: 0,
    },
    status: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 1,
    },
  },
  {
    tableName: "notifications",
    timestamps: true,
  }
);

module.exports = Notification;
