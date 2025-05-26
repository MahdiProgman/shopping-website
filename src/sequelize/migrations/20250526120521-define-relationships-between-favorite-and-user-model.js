'use strict';

const { DataTypes } = require('sequelize');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.addConstraint('tbl_favorites', {
      fields: ['user_id'],
      type: 'FOREIGN KEY',
      name: 'fk_favorite_user',
      references: {
        table: 'tbl_users',
        field: 'id'
      },
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE'
    });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.removeConstraint('tbl_favorites', 'fk_favorite_user');
  }
};
