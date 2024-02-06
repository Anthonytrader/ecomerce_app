
const { DataTypes } = require('sequelize');
const sequelize = require('../utils/connection');

const Purchase = sequelize.define('purchase', {
  quantity: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  userId:{
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  productId: {
    type: DataTypes.INTEGER,  // Asegúrate de que coincida con el tipo de datos de la columna 'id' en el modelo Product
    allowNull: false
}
});

// Exporta el modelo
module.exports = Purchase;
