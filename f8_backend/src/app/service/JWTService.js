const db = require('../models/index');
const { Op } = require('sequelize');

const getGroupWithRoles = async (user) => {
    user.idUser && delete user['idUser'];
    user.password && delete user['password'];

    const role = await db.Group.findOne({
        where: {
            [Op.and]: [{ idGroup: user.groupID }, { status: 1 }],
        },
        attributes: ['nameGroup', 'description', 'idGroup'],
        include: [
            {
                model: db.Role,
                as: 'roles',
                attributes: ['url', 'description'],
                through: { attributes: [] },
            },
        ],
    });

    // console.log('check role >>>>');
    // console.log(role);
    return role ? role : {};
};

module.exports = { getGroupWithRoles };
