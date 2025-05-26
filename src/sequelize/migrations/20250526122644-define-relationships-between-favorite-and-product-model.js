'use strict';

const { DataTypes } = require('sequelize');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.addConstraint('tbl_favorites', {
      fields: ['product_id'],
      type: 'FOREIGN KEY',
      name: 'fk_favorite_product',
      references: {
        table: 'tbl_products',
        field: 'id'
      },
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE'
    });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.removeConstraint('tbl_favorites', 'fk_favorite_product');
  }
};
