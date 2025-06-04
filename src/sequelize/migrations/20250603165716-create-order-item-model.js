"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("tbl_orderItems", {
      id: {
        type: Sequelize.DataTypes.UUID,
        defaultValue: Sequelize.DataTypes.UUIDV4,
        primaryKey: true
      },
      order_id: {
        type: Sequelize.DataTypes.UUID,
        allowNull: false,
      },
      product_id: {
        type: Sequelize.DataTypes.UUID,
        allowNull: false,
      },
      createdAt: {
        type: Sequelize.DataTypes.DATE,
        allowNull: false
      },
      updatedAt: {
        type: Sequelize.DataTypes.DATE,
        allowNull: false
      }
    });
    await queryInterface.addConstraint('tbl_orderItems', {
      fields: ['order_id', 'product_id'],
      type: 'UNIQUE',
      name: 'unique-order_id-product_id'
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeConstraint('tbl_orderItems', 'unique-order_id-product_id');
    await queryInterface.dropTable('tbl_orderItems');
  },
};
