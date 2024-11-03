const { sequelize } = require('../config/db');

// Đồng bộ model với cơ sở dữ liệu (tạo bảng nếu chưa tồn tại)
async function syncModels() {
    try {
        await sequelize.sync({ force: false });
        console.log('All models were synchronized successfully.');
    } catch (error) {
        console.error('Unable to synchronize the models:', error);
    }
}

module.exports = syncModels;
