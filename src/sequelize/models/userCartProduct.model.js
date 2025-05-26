const { DataTypes } = require("sequelize")

module.exports = (sequelize) => {
    return sequelize.define(
        'user-cart-product',
        {
            id: {
                type: DataTypes.UUID,
                defaultValue: DataTypes.UUIDV4,
                primaryKey: true
            },
            user_id: {
                type: DataTypes.UUID,
                allowNull: false
            },
            product_id: {
                type: DataTypes.UUID,
                allowNull: false
            }
        },
        {
            tableName: 'tbl_userCartProducts',
            timestamps: true
        }
    );
}