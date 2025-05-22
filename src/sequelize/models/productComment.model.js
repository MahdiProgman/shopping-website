const { DataTypes } = require("sequelize")

module.exports = (sequelize) => {
    return sequelize.define(
        'product-comment',
        {
            id: {
                type: DataTypes.UUID,
                defaultValue: DataTypes.UUIDV4,
                primaryKey: true
            },
            product_id: {
                type: DataTypes.UUID,
                allowNull: false,
                references: {
                    model: 'tbl_products',
                    key: 'id'
                },
                onDelete: 'RESTRICT',
                onUpdate: 'CASCADE'
            },
            commentText: {
                type: DataTypes.TEXT,
                allowNull: false
            },
            positivePoints: {
                type: DataTypes.JSON,
                allowNull: true
            },
            negetivePoints: {
                type: DataTypes.JSON,
                allowNull: true
            },
            rate: {
                type: DataTypes.INTEGER,
                allowNull: false,
                validate: {
                    min: 0,
                    max: 5
                }
            },
            user_id: {
                type: DataTypes.UUID,
                allowNull: false,
                references: {
                    model: 'tbl_users',
                    key: 'id'
                },
                onDelete: 'RESTRICT',
                onUpdate: 'CASCADE'
            }
        },
        {
            tableName: 'tbl_productComments',
            timestamps: true
        }
    );
}