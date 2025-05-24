const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    return sequelize.define(
        'product',
        {
            id: {
                type: DataTypes.UUID,
                defaultValue: DataTypes.UUIDV4,
                primaryKey: true
            },
            title: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            image: {
              type: DataTypes.STRING,
              allowNull: false  
            },
            images: {
                type: DataTypes.JSON,
                allowNull: false
            },
            specifications: {
                type: DataTypes.JSON,
                allowNull: false
            },
            rate: {
                type: DataTypes.INTEGER,
                defaultValue: 5,
                validate: {
                    min: 0,
                    max: 5
                }
            },
            views: {
                type: DataTypes.INTEGER,
                defaultValue: 0
            },
            comments_number: {
                type: DataTypes.INTEGER,
                defaultValue: 0
            },
            price: {
                type: DataTypes.INTEGER,
                allowNull: false
            },
            price_fa: {
                type: DataTypes.STRING,
                allowNull: false
            },
            inventory: {
                type: DataTypes.INTEGER,
                allowNull: false
            },
            description: {
                type: DataTypes.STRING(600),
                allowNull: false
            }
        },
        {
            tableName: 'tbl_products',
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