const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    return sequelize.define(
        'user', 
        {
            id: {
                type: DataTypes.UUID,
                defaultValue: DataTypes.UUIDV4,
                primaryKey: true
            },
            first_name: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            last_name: {
                type: DataTypes.STRING,
                allowNull: false
            },
            email: {
                type: DataTypes.STRING,
                allowNull: false
            },
            password: {
                type: DataTypes.STRING,
                allowNull: false
            }
        }, 
        {
            tableName: 'tbl_users',
            timestamps: true,
            indexes: [
                {
                    name: 'idx_email',
                    unique: true,
                    fields: ['email']
                }
            ]
        }
    );
}