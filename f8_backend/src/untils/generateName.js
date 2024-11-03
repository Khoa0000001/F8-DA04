const User = require('../app/models/User');

async function generateName() {
    let userName;
    const characters =
        'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const charactersLength = characters.length;
    let userNameExists = true;

    while (userNameExists) {
        userName = 'User-';
        for (let i = 0; i < 5; i++) {
            userName += characters.charAt(
                Math.floor(Math.random() * charactersLength)
            );
        }
        userNameExists = false;
    }

    return userName;
}

module.exports = generateName;
