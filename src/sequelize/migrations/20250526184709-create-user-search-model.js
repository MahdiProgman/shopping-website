"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("tbl_userSearches", {
      id: {
        type: Sequelize.DataTypes.UUID,
        defaultValue: Sequelize.DataTypes.UUIDV4,
        primaryKey: true,
      },
      user_id: {
        type: Sequelize.DataTypes.UUID,
        allowNull: false,
      },
      query: {
        type: Sequelize.DataTypes.STRING,
        allowNull: false,
      },
      count: {
        type: Sequelize.DataTypes.INTEGER,
        allowNull: false,
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

    await queryInterface.addConstraint('tbl_userSearches', {
      fields: ['query'],
      type: 'UNIQUE',
      name: 'unique_query'
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeConstraint('tbl_userSearches', 'unique_query');
    await queryInterface.dropTable('tbl_userSearches');
  },
};
