require('dotenv').config();
const db = require('../models/index');
const { Op } = require('sequelize');
const { createJWT } = require('../../middleware/JWTAction');
const { getGroupWithRoles } = require('../service/JWTService');

class AuthController {
    //[GET] get all accounts
    async index(req, res, next) {
        const users = await db.User.findAll();
        res.status(200).json(users);
    }

    //[GET]
    async authentication(req, res, next) {
        if (req.user) {
            res.status(200).json({
                type: 'success',
                messege: 'authentication successful',
                role: {
                    keyRole: req.user.getGroupWithRole.idGroup,
                    nameRole: req.user.getGroupWithRole.nameGroup,
                },
            });
        } else {
            res.status(401).json({
                type: 'erorr',
                messege: 'authentication erorr',
            });
        }
    }
    //[POST] register account
    async register(req, res, next) {
        const data = req.body;
        const account = await db.User.findOne({
            where: { numberPhone: req.body.numberPhone },
        });
        if (account) {
            res.status(409).json({
                type: 'error',
                messege: 'numberPhone is exits',
            });
            return;
        }
        try{
            await db.User.create(data);
        }catch(error){

            console.log(error)
            res.status(500).json({
                type: 'erorr',
                messege: 'erorr',
            });
        };
        
        res.status(200).json({
            type: 'success',
            messege: data,
        });
    }
    //[GET] login account
    async login(req, res, next) {
        const data = req.body;
        const user = await db.User.findOne({
            where: {
                [Op.and]: [
                    { numberPhone: data.numberPhone },
                    { password: data.password },
                    { status: 1 },
                ],
            },
        });
        if (!user) {
            res.status(401).json({
                type: 'error',
                messege: 'account is not exits',
            });
            return;
        }
        const getGroupWithRole = await getGroupWithRoles(user);
        let payload = {
            numberPhone: user.numberPhone,
            getGroupWithRole,
        };
        let token = createJWT(payload);
        res.cookie('jwt', token, {
            httpOnly: false,
            maxAge: 7 * 24 * 60 * 60 * 1000,
        });
        res.status(200).json({
            type: 'success',
            messege: 'Login success',
        });
    }
}

module.exports = new AuthController();
