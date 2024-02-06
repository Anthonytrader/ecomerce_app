const { getAll, create, getOne, remove, update } = require('../controllers/product.controllers.js');
const express = require('express');

const productRouter = express.Router();

productRouter.route('/products')
    .get(getAll)
    .post(create);

productRouter.route('/products/:id')
    .get(getOne)
    .delete(remove)
    .put(update);

module.exports = productRouter;