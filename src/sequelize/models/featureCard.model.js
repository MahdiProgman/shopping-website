const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
    return sequelize.define(
        'feature-card',
        {
            id: {
                type: DataTypes.UUID,
                defaultValue: DataTypes.UUIDV4,
                primaryKey: true
            },
            image: {
                type: DataTypes.STRING,
                allowNull: false
            },
            title: {
                type: DataTypes.STRING,
                allowNull: false
            },
            description: {
                type: DataTypes.STRING,
                allowNull: false
            }
        },
        {
            tableName: 'tbl_featureCards',
            timestamps: true,
            indexes: [
                {
                    name: 'idx_title',
                    fields: ['title'],
                    unique: true
                }
            ]
        }
    );
}