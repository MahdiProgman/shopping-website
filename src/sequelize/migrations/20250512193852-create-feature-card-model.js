'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('tbl_featureCards', {
      id: {
        type: Sequelize.DataTypes.UUID,
        defaultValue: Sequelize.DataTypes.UUIDV4,
        primaryKey: true
      },
      image: {
          type: Sequelize.DataTypes.STRING,
          allowNull: false
      },
      title: {
          type: Sequelize.DataTypes.STRING,
          allowNull: false
      },
      description: {
          type: Sequelize.DataTypes.STRING,
          allowNull: false
      },
      createdAt: {
        type: Sequelize.DataTypes.DATE,
        allowNull: false
      },
      updatedAt: {
        type: Sequelize.DataTypes.DATE,
        allowNull: false
      }
    });

    await queryInterface.addIndex('tbl_featureCards', ['title'], {
      name: 'idx_title',
      unique: true
    });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('tbl_featureCards');
  }
};
