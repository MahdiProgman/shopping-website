'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.addConstraint('tbl_userCartProducts', {
      fields: ['product_id'],
      type: 'FOREIGN KEY',
      name: 'fk_userCartProduct_product',
      references: {
        table: 'tbl_products',
        field: 'id'
      },
      onDelete: 'RESTRICT',
      onUpdate: 'CASCADE'
    });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.removeConstraint('tbl_userCartProducts', 'fk_userCartProduct_product');
  }
};
