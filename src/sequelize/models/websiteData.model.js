const { DataTypes } = require("sequelize")

module.exports = (sequelize) => {
    return sequelize.define(
        'website-data',
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
            value: {
                type: DataTypes.STRING(500),
                allowNull: false
            }
        },
        {
            tableName: 'tbl_websiteData',
            timestamps: true,
            indexes: [
                {
                    name: 'idx_name',
                    fields: ['name'],
                    unique: true
                }
            ]
        }
    )
}