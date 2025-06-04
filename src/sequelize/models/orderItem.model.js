const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  return sequelize.define(
    'order-item',
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true
      },
      order_id: {
        type: DataTypes.UUID,
        allowNull: false
      },
      product_id: {
        type: DataTypes.UUID,
        allowNull: false
      }
    },
    {
      tableName: 'tbl_orderItems',
      timestamps: true
    }
  );
}