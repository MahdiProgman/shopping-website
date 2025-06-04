const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  return sequelize.define(
    'order',
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true
      },
      order_code: {
        type: DataTypes.STRING,
        allowNull: false
      },
      status: {
        type: DataTypes.STRING,
        allowNull: false
      },
      status_color: {
        type: DataTypes.STRING,
        allowNull: false
      },
      total_price: {
        type: DataTypes.STRING,
        allowNull: false
      },
      user_id: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
          model: 'tbl_users',
          key: 'id'
        }
      }
    },
    {
      tableName: 'tbl_orders',
      timestamps: true,
      indexes: [
        {
          name: 'idx_order_code',
          fields: ['order_code'],
          unique: true
        }
      ]
    }
  );
}