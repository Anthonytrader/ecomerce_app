// productcart.router.js
const express = require('express');
const { getAll, create, getOne, remove, update } = require('../controllers/productcart.controllers');
//const verifyJWT=require("../utils/verifyJWT");
const productcartRouter = express.Router();

productcartRouter.route('/productcart')
  .get(getAll)
  .post(create);

productcartRouter.route('/productcart/:id')
  .get(getOne)
  .delete(remove)
  .put(update);

module.exports = productcartRouter;
