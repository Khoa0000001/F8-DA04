const db = require('../models/index');
const { Op, Sequelize } = require('sequelize');

class DiscountController {
    //[GET] discount
    async getListStatus1(req, res, next) {
        const listStatus1 = await db.Discount.findAll({
            where: {
                status: 1,
            },
        });
        res.status(200).json(listStatus1);
    }

    // [GET] get list courses of tablet admin
    async listDiscountOfTable(req, res, next) {
        const listDiscount = await db.Discount.findAll();
        res.status(200).json(listDiscount);
    }

    //[POST] insert a new course
    async addDiscount(req, res, next) {
        const data = req.body;
        data.idDiscount && delete data['idDiscount'];
        await db.Discount.create(data);
        res.status(200).json({
            type: 'success',
            messege: 'created Discount',
        });
    }

    async setStatus(req, res, next) {
        const data = req.body;
        const idDiscount = data.idDiscount;
        const status = data.value;

        const discount = await db.Discount.findOne({
            where: {
                idDiscount: idDiscount,
            },
            attributes: ['title'],
        });

        await db.Discount.update(
            { status: status },
            {
                where: {
                    idDiscount: idDiscount,
                },
            }
        );

        res.status(200).json({
            type: 'success',
            messege: discount,
        });
    }

    //[PUT] insert a new course
    async updateDiscount(req, res, next) {
        const data = req.body;
        const idDiscount = data.idDiscount;
        data.idDiscount && delete data['idDiscount'];
        await db.Discount.update(data, {
            where: {
                idDiscount: idDiscount,
            },
        });
        res.status(200).json({
            type: 'success',
            messege: 'update Discount',
        });
    }

    async deleteDiscount(req, res, next) {
        const discount = await db.Discount.destroy({
            where: {
                idDiscount: req.params.id,
            },
        });
        res.status(200).json({
            type: 'success',
            messege: 'delete discount',
        });
    }
}

module.exports = new DiscountController();
