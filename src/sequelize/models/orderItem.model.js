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
        allowNull: false,
        references: {
          model: 'tbl_orders',
          key: 'id'
        },
        onDelete: 'RESTRICT',
        onUpdate: 'CASCADE'
      },
      product_id: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
          model: 'tbl_products',
          key: 'id'
        },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
      }
    },
    {
      tableName: 'tbl_orderItems',
      timestamps: true
    }
  );
}