'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.addConstraint('tbl_orderItems', {
      fields: ['product_id'],
      type: 'FOREIGN KEY',
      name: 'fk_orderItem_product',
      references: {
        table: 'tbl_products',
        field: 'id'
      },
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE'
    });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.removeConstraint('tbl_orderItems', 'fk_orderItem_product');
  }
};
