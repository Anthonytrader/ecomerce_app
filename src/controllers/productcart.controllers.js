const catchError = require('../utils/catchError');
const Productcart = require('../models/Productcart');
const Product = require('../models/Product');

const getAll = catchError(async(req, res) => {
    const results = await Productcart.findAll();
    return res.json(results);
});

const create = catchError(async(req, res) => {
    const result = await Productcart.create(req.body);
    return res.status(201).json(result);
});

const getOne = catchError(async(req, res) => {
    const { id } = req.params;
    const result = await Productcart.findByPk(id);
    if(!result) return res.sendStatus(404);
    return res.json(result);
});

const remove = catchError(async(req, res) => {
    const { id } = req.params;
    await Productcart.destroy({ where: {id} });
    return res.sendStatus(204);
});

const update = catchError(async(req, res) => {
    const { id } = req.params;
    const result = await Productcart.update(
        req.body,
        { where: {id}, returning: true }
    );
    if(result[0] === 0) return res.sendStatus(404);
    return res.json(result[1][0]);
});

module.exports = {
    getAll,
    create,
    getOne,
    remove,
    update
}