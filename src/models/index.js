// index.js
const Category = require('./Category');
const Product = require('./Product');
const Image = require('./Image');
const User = require('./User');
const Productcart = require('./Productcart');
const Purchase = require('./Purchase');

Product.belongsTo(Category);
Category.hasMany(Product);

Product.hasMany(Image);
Image.belongsTo(Product);

Productcart.belongsTo(User);
User.hasMany(Productcart)

Productcart.belongsTo(Product);
Product.hasMany(Productcart);

User.hasMany(Product);
Product.belongsTo(User);

Purchase.belongsTo(User);
User.hasMany(Purchase);

Purchase.belongsTo(Product);
Product.hasMany(Purchase);

module.exports = {
    Category,
    Product,
    Image,
    User,
    Productcart,
    Purchase,
  };