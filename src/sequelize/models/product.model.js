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
            product_code: {
                type: DataTypes.STRING,
                allowNull: false
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
            category_id: {
                type: DataTypes.UUID,
                allowNull: false,
                references: {
                    model: 'tbl_categories',
                    key: 'id'
                },
                onDelete: 'RESTRICT',
                onUpdate: 'CASCADE'
            },
            rate: {
                type: DataTypes.DECIMAL(2, 1),
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
            sells: {
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