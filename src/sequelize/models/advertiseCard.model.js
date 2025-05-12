const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
    return sequelize.define(
        'advertise-card',
        {
            id: {
                type: DataTypes.UUID,
                defaultValue: DataTypes.UUIDV4,
                primaryKey: true
            },
            title: {
                type: DataTypes.STRING,
                allowNull: false
            },
            short_explanation: {
                type: DataTypes.STRING,
                allowNull: false
            },
            image: {
                type: DataTypes.STRING,
                allowNull: false
            }
        },
        {
            tableName: 'tbl_advertiseCards',
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