"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("tbl_questions", {
      id: {
        type: Sequelize.DataTypes.UUID,
        defaultValue: Sequelize.DataTypes.UUIDV4,
        primaryKey: true,
      },
      question: {
        type: Sequelize.DataTypes.STRING,
        allowNull: false,
      },
      answer: {
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

    await queryInterface.addIndex('tbl_questions', ['question'], {
      name: 'idx_question',
      unique: true
    });

    await queryInterface.addIndex('tbl_questions', ['answer'], {
      name: 'idx_answer',
      unique: true
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('tbl_questions');
  },
};
