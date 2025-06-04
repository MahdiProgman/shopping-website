'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.addConstraint('tbl_userSearches', {
      fields: ['user_id'],
      type: 'FOREIGN KEY',
      name: 'fk_userSearch_user',
      references: {
        table: 'tbl_users',
        field: 'id'
      },
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE'
    });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.removeConstraint('tbl_userSearches', 'fk_userSearch_user');
  }
};
