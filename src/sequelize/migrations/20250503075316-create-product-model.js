"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("tbl_products", {
      id: {
        type: Sequelize.DataTypes.UUID,
        defaultValue: Sequelize.DataTypes.UUIDV4,
        primaryKey: true,
      },
      title: {
        type: Sequelize.DataTypes.STRING,
        allowNull: false,
      },
      image: {
        type: Sequelize.DataTypes.STRING,
        allowNull: false,
      },
      images: {
        type: Sequelize.DataTypes.JSON,
        allowNull: false
      },
      specifications: {
        type: Sequelize.DataTypes.JSON,
        allowNull: false
      },
      rate: {
        type: Sequelize.DataTypes.INTEGER,
        defaultValue: 5,
        validate: {
          min: 0,
          max: 5,
        },
      },
      views: {
        type: Sequelize.DataTypes.INTEGER,
        defaultValue: 0,
      },
      comments_number: {
        type: Sequelize.DataTypes.INTEGER,
        defaultValue: 0,
      },
      price: {
        type: Sequelize.DataTypes.INTEGER,
        allowNull: false,
      },
      price_fa: {
        type: Sequelize.DataTypes.STRING,
        allowNull: false
      },
      inventory: {
        type: Sequelize.DataTypes.INTEGER,
        allowNull: false,
      },
      description: {
        type: Sequelize.DataTypes.STRING(500),
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

    await queryInterface.addIndex('tbl_products', ['title'], {
      name: 'idx_title',
      unique: true
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('tbl_products');
  },
};
