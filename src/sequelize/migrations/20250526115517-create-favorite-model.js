"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("tbl_favorites", {
      id: {
        type: Sequelize.DataTypes.UUID,
        defaultValue: Sequelize.DataTypes.UUIDV4,
        primaryKey: true,
      },
      user_id: {
        type: Sequelize.DataTypes.UUID,
        defaultValue: Sequelize.DataTypes.UUIDV4,
      },
      product_id: {
        type: Sequelize.DataTypes.UUID,
        defaultValue: Sequelize.DataTypes.UUIDV4,
      }
    });

    await queryInterface.addConstraint('tbl_favorites', {
      fields: ['user_id', 'product_id'],
      type: 'UNIQUE',
      name: 'unique_user_favorite'
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeConstraint('tbl_favorites', 'unique_user_favorite');
    await queryInterface.dropTable('tbl_favorites');
  },
};
