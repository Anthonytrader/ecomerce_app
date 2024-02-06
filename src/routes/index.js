const express = require('express');
const userRouter = require('./user.router');
const categoryrouter = require('./category.router');
const productRouter = require('./product.router');
const imageRouter=require("./image.router");
const productcartRouter = require('./productcart.router');
const purchaseRouter = require('./purchase.router');

const router = express.Router();

// colocar las rutas aquí
router.use(productRouter)
router.use(userRouter)
router.use(categoryrouter)
router.use(imageRouter)
router.use(productcartRouter)
router.use(purchaseRouter)
module.exports = router;