const db = require('../models/index');
const { Op } = require('sequelize');
const { Sequelize } = require('sequelize'); // Import Sequelize

class AnswerController {
    async checkAnswer(req, res, next) {
        const answer = await db.Answer.findOne({
            where: {
                idAnswer: req.params.id,
                correctAnswer: true,
                status: 1,
            },
        });
        if (!answer) {
            res.status(200).json({
                type: 'success',
                messege: 'Untrue',
            });
        } else {
            res.status(200).json({
                type: 'success',
                messege: 'Exactly',
            });
        }
    }
    async addAnswer(req, res, next) {
        const data = req.body;
        data.idAnswer && delete data['idAnswer'];
        await db.Answer.create(data);
        res.status(200).json({
            type: 'success',
            messege: 'created Answer',
        });
    }

    async setStatus(req, res, next) {
        const data = req.body;
        const idAnswer = data.idAnswer;
        const status = data.value;

        const Answer = await db.Answer.findOne({
            where: {
                idAnswer: idAnswer,
            },
        });

        await db.Answer.update(
            { status: status },
            {
                where: {
                    idAnswer: idAnswer,
                },
            }
        );

        res.status(200).json({
            type: 'success',
            messege: Answer,
        });
    }

    //[PUT] insert a new course
    async updateAnswer(req, res, next) {
        const data = req.body;
        const idAnswer = data.idAnswer;
        data.idAnswer && delete data['idAnswer'];
        await db.Answer.update(data, {
            where: {
                idAnswer: idAnswer,
            },
        });
        res.status(200).json({
            type: 'success',
            messege: 'update Answer',
        });
    }

    async deleteAnswer(req, res, next) {
        const Answer = await db.Answer.destroy({
            where: {
                idAnswer: req.params.id,
            },
        });
        res.status(200).json({
            type: 'success',
            messege: 'delete Answer',
        });
    }
}

module.exports = new AnswerController();
