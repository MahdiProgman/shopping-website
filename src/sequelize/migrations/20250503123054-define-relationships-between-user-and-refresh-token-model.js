'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.addColumn('tbl_refreshTokens', 'user_id', {
      type: Sequelize.DataTypes.UUID,
      allowNull: false
    });

    await queryInterface.addConstraint('tbl_refreshTokens', {
      fields: ['user_id'],
      type: 'foreign key',
      name: 'fk_refreshToken_user',
      references: {
        table: 'tbl_users',
        field: 'id'
      },
      onDelete: 'RESTRICT',
      onUpdate: 'CASCADE'
    })
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.removeConstraint('tbl_refreshTokens', 'fk_refreshToken_user');
    await queryInterface.removeColumn('tbl_refreshTokens', 'user_id');
  }
};
