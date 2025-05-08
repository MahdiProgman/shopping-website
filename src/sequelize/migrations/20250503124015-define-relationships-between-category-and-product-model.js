'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.addColumn('tbl_products', 'category_id', {
      type: Sequelize.DataTypes.UUID,
      allowNull: false
    });
    
    await queryInterface.addConstraint('tbl_products', {
      fields: ['category_id'],
      type: 'foreign key',
      name: 'fk_product_category',
      references: {
        table: 'tbl_categories',
        field: 'id'
      },
      onDelete: 'RESTRICT',
      onUpdate: 'CASCADE'
    });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.removeConstraint('tbl_products', 'fk_product_category');
    await queryInterface.removeColumn('tbl_products', 'category_id');
  }
};
