'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.addColumn('tbl_productComments', 'user_id', {
      type: Sequelize.DataTypes.UUID,
      allowNull: false
    });

    await queryInterface.addConstraint('tbl_productComments', {
      fields: ['user_id'],
      type: 'FOREIGN KEY',
      name: 'fk_productComment_user',
      references: {
        table: 'tbl_users',
        field: 'id'
      },
      onDelete: 'RESTRICT',
      onUpdate: 'CASCADE'
    });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.removeConstraint('tbl_productComments', 'fk_productComments_user');
  }
};
