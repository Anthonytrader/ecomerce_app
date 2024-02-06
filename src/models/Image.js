const { DataTypes } = require('sequelize');
const sequelize = require('../utils/connection');

const Image = sequelize.define('image', {
    url: {
        type: DataTypes.STRING,
        allowNull: false
    },
    productId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        // Aquí puedes agregar más configuraciones según tus necesidades, como referencias a otras tablas, etc.
    },
});

module.exports = Image;