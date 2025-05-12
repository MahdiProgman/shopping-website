const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
    return sequelize.define(
        'question',
        {
            id: {
                type: DataTypes.UUID,
                defaultValue: DataTypes.UUIDV4,
                primaryKey: true
            },
            question: {
                type: DataTypes.STRING,
                allowNull: false
            },
            answer: {
                type: DataTypes.STRING,
                allowNull: false
            }
        },
        {
            tableName: 'tbl_questions',
            timestamps: true,
            indexes: [
                {
                    name: 'idx_question',
                    fields: ['question'],
                    unique: true
                },
                {
                    name: 'idx_answer',
                    fields: ['answer'],
                    unique: true
                }
            ]
        }
    );
}