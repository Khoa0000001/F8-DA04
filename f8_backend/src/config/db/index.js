const { Sequelize } = require('sequelize');
const { development } = require('../config.json');

const database = development;

const sequelize = new Sequelize(
    database.database,
    database.username,
    database.password,
    {
        host: database.host,
        dialect: database.dialect,
        define: {
            timestamps: false,
        },
        logging: database.logging,
    }
);

async function enableEventScheduler() {
    try {
        // Kiểm tra trạng thái của Event Scheduler
        const [results] = await sequelize.query(
            "SHOW VARIABLES LIKE 'event_scheduler';"
        );
        const eventSchedulerStatus = results[0].Value;

        // Nếu Event Scheduler chưa bật, thì bật nó
        if (eventSchedulerStatus !== 'ON') {
            await sequelize.query('SET GLOBAL event_scheduler = ON;');
            console.log('Event Scheduler đã được bật.');
        } else {
            console.log('Event Scheduler đã được bật trước đó.');
        }
    } catch (error) {
        console.error('Lỗi khi kiểm tra hoặc bật Event Scheduler:', error);
    }
}

async function connect() {
    try {
        await sequelize.authenticate();
        console.log('Connection has been established successfully.');
        enableEventScheduler();
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
}

module.exports = { connect, sequelize };
