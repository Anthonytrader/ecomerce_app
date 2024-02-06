const catchError = require('../utils/catchError');
const Purchase = require('../models/Purchase');
const Product = require('../models/Product');
const ProductCart = require('../models/Productcart');

const getAll = catchError(async (req, res) => {
        const purchases = await Purchase.findAll({
            include: [Product],
            where: { userId: req.user.id }
        });

        return res.json(purchases);
});

module.exports = {
    getAll
};

const create = catchError(async(req,res)=>{
    const productsCart = await ProductCart.findAll({ 
        where: { userId: req.user.id },
        attributes: ['quantity', 'userId', 'productId'],
        raw: true,
    });
    console.log(productsCart);

    const purchases = await Purchase.bulkCreate(productsCart);
    await ProductCart.destroy({ where: { userId: req.user.id }})
    return res.json(purchases);
})
module.exports = {
    getAll,
    create
};