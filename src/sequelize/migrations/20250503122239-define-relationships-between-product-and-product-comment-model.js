'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.addColumn('tbl_productComments', 'product_id', {
      type: Sequelize.DataTypes.UUID,
      allowNull: false
    });

    await queryInterface.addConstraint('tbl_productComments', {
      fields: ['product_id'],
      type: 'FOREIGN KEY',
      name: 'fk_productComment_product',
      references: {
        table: 'tbl_products',
        field: 'id'
      },
      onDelete: 'RESTRICT',
      onUpdate: 'CASCADE'
    });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.removeConstraint('tbl_productComments', 'fk_productComment_product');
    await queryInterface.removeColumn('tbl_productComments', 'product_id');
  }
};
