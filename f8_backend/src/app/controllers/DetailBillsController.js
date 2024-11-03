const db = require('../models/index');
const { Op, Sequelize } = require('sequelize');

class DetailBillsController {
    // [GET] get list courses of tablet admin
    async listBillsOfTable(req, res, next) {
        const listBills = await db.DetailBill.findAll();
        res.status(200).json(listBills);
    }
}

module.exports = new DetailBillsController();
