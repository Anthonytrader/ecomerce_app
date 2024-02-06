const { getAll, create, getOne, remove, update } = require('../controllers/category.controllers');
const express = require('express');
const verifyJWT=require("../utils/verifyJWT");
const categoryrouter = express.Router();

categoryrouter.route('/category')
    .get(getAll)
    .post(create);

categoryrouter.route('/category/:id')
    .get(getOne)
    .delete(remove)
    .put( update);

module.exports = categoryrouter;