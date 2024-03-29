const { getAll, create,} = require('../controllers/purchase.controllers');
const express = require('express');
const verifyJWT=require("../utils/verifyJWT");

const purchaseRouter = express.Router();

purchaseRouter.route('/purchase')
    .get(verifyJWT,getAll)
    .post(verifyJWT,create);
module.exports = purchaseRouter;