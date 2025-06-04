const { DataTypes } = require("sequelize")

module.exports = (sequelize) => {
    return sequelize.define(
        'user-search',
        {
            id: {
                type: DataTypes.UUID,
                defaultValue: DataTypes.UUIDV4,
                primaryKey: true
            },
            user_id: {
                type: DataTypes.UUID,
                allowNull: false,
                references: {
                    model: 'tbl_userSearches',
                    key: 'id',
                    onDelete: 'CASCADE',
                    onUpdate: 'CASCADE'
                }
            },
            query: {
                type: DataTypes.STRING,
                allowNull: false
            },
            count: {
                type: DataTypes.INTEGER,
                allowNull: false
            }
        },
        {
            tableName: 'tbl_userSearches',
            timestamps: true
        }
    )
}