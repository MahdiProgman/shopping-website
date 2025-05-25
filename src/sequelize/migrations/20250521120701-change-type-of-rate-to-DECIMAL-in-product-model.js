'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.changeColumn('tbl_products', 'rate', {
      type: Sequelize.DataTypes.DECIMAL(2, 1),
      defaultValue: 0.0
    });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.changeColumn('tbl_products', 'rate', {
      type: Sequelize.DataTypes.INTEGER,
      defaultValue: 0
    });
  }
};
