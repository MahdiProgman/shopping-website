const { DataTypes } = require("sequelize")

module.exports = (sequelize) => {
    return sequelize.define(
        "favorite",
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
                    model: 'tbl_users',
                    key: 'id',
                    onDelete: 'CASCADE',
                    onUpdate: 'CASCADE' 
                }
            },
            product_id: {
                type: DataTypes.UUID,
                allowNull: false
            }
        },
        {
            tableName: 'tbl_favorites',
            timestamps: true
        }
    );
}