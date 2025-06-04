'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.addColumn('tbl_orders', 'user_id', {
      type: Sequelize.DataTypes.UUID,
      allowNull: false,
    });
    await queryInterface.addConstraint('tbl_orders', {
      fields: ['user_id'],
      type: 'FOREIGN KEY',
      name: 'fk_order_user',
      references: {
        table: 'tbl_users',
        field: 'id'
      },
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE'
    });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.removeConstraint('tbl_orders', 'fk_order_user');
    await queryInterface.removeColumn('tbl_orders', 'user_id');
  }
};
