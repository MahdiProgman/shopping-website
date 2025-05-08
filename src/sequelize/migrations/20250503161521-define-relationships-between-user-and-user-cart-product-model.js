'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.addConstraint('tbl_userCartProducts', {
      fields: ['user_id'],
      type: 'foreign key',
      name: 'fk_userCartProduct_user',
      references: {
        table: 'tbl_users',
        field: 'id'
      },
      onDelete: 'RESTRICT',
      onUpdate: 'CASCADE'
    });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.removeConstraint('tbl_userCartProducts', 'fk_userCartProduct_user');
  }
};
