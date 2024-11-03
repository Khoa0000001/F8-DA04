const db = require('../models/index');
const { Op } = require('sequelize');

class CategoryController {
    //[GET] get all
    async index(req, res, next) {
        const listCategories = await db.Category.findAll();
        res.status(200).json(listCategories);
    }

    async getStatus1(req, res, next) {
        const listCategories = await db.Category.findAll({
            where: {
                status: 1,
            },
        });
        res.status(200).json(listCategories);
    }

    //[POST] insert a new category
    async addCategory(req, res, next) {
        const data = req.body;
        data.idCategory && delete data['idCategory'];
        await db.Category.create(data);
        res.status(200).json({
            type: 'success',
            messege: 'created category',
        });
    }

    async setStatus(req, res, next) {
        const data = req.body;
        const idCategory = data.idCategory;
        const status = data.value;

        const category = await db.Category.findOne({
            where: {
                idCategory: idCategory,
            },
            attributes: ['nameCategory'],
        });

        await db.Category.update(
            { status: status },
            {
                where: {
                    idCategory: idCategory,
                },
            }
        );

        res.status(200).json({
            type: 'success',
            messege: category,
        });
    }

    //[PUT] insert a new course
    async updateCategory(req, res, next) {
        const data = req.body;
        const idCategory = data.idCategory;
        data.idCategory && delete data['idCategory'];
        await db.Category.update(data, {
            where: {
                idCategory: idCategory,
            },
        });
        res.status(200).json({
            type: 'success',
            messege: 'update Category',
        });
    }

    async deleteCategory(req, res, next) {
        const category = await db.Category.destroy({
            where: {
                idCategory: req.params.id,
            },
        });
        res.status(200).json({
            type: 'success',
            messege: 'delete category',
        });
    }
}

module.exports = new CategoryController();
