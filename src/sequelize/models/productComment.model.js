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
            }
        },
        {
            tableName: 'tbl_productComments',
            timestamps: true
        }
    );
}