const { DataTypes } = require("sequelize");
const { sequelize } = require("../../config/db"); // Đảm bảo đường dẫn tới file db.js là chính xác

const NotificationType = sequelize.define(
  "NotificationType",
  {
    idNotificationType: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    nameNotificationType: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
    status: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 1,
    },
  },
  {
    tableName: "notificationtypes",
    timestamps: true,
  }
);

module.exports = NotificationType;
