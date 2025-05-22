'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.addConstraint('tbl_productComments', {
      fields: ['product_id', 'user_id'],
      type: 'UNIQUE',
      name: 'unique_user_product_comment'
    });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.removeConstraint('tbl_productComments', 'unique_user_product_comment');
  }
};
