const { DataTypes } = require('sequelize');
const sequelize = require('../utils/connection');

const Productcart = sequelize.define('productcart', {
    userId: {
        type: DataTypes.INTEGER,
        allowNull: false
   },
    productId: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    quantity:{
        type: DataTypes.INTEGER,
        allowNull: false
    }
});

module.exports = Productcart;