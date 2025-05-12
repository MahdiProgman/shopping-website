const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
    return sequelize.define(
        'category',
        {
            id: {
                type: DataTypes.UUID,
                defaultValue: DataTypes.UUIDV4,
                primaryKey: true
            },
            name: {
                type: DataTypes.STRING,
                allowNull: false
            },
            name_fa: {
                type: DataTypes.STRING,
                allowNull: false
            },
            short_explanation: {
                type: DataTypes.STRING,
                allowNull: false
            },
            boxColor: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            image: {
                type: DataTypes.STRING,
                allowNull: false
            }
        },
        {
            tableName: 'tbl_categories',
            timestamps: true,
            indexes: [
                {
                    name: 'idx_name',
                    fields: ['name'],
                    unique: true
                },
                {
                    name: 'idx_name_fa',
                    fields: ['name_fa'],
                    unique: true
                }
            ]
        }
    );
}