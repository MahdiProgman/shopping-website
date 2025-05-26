'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.addConstraint('tbl_userCartProducts', {
      fields: ['user_id', 'product_id'],
      type: 'UNIQUE',
      name: 'unique_user_userCartProduct'
    });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.removeConstraint('unique_user_userCartProduct');
  }
};
