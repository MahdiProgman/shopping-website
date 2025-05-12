"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("tbl_categories", {
      id: {
        type: Sequelize.DataTypes.UUID,
        defaultValue: Sequelize.DataTypes.UUIDV4,
        primaryKey: true,
      },
      name: {
        type: Sequelize.DataTypes.STRING,
        allowNull: false,
      },
      name_fa: {
        type: Sequelize.DataTypes.STRING,
        allowNull: false
      },
      short_explanation: {
        type: Sequelize.DataTypes.STRING,
        allowNull: false,
      },
      boxColor: {
        type: Sequelize.DataTypes.STRING,
        allowNull: false,
      },
      image: {
        type: Sequelize.DataTypes.STRING,
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

    await queryInterface.addIndex('tbl_categories', ['name'], {
      name: 'idx_name',
      unique: true
    });

    await queryInterface.addIndex('tbl_categories', ['name_fa'], {
      name: 'idx_name_fa',
      unique: true
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('tbl_categories');
  },
};
