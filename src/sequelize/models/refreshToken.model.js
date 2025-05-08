const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
    return sequelize.define(
        'refresh-token',
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
                    key: 'id'
                },
                onDelete: 'RESTRICT',
                onUpdate: 'CASCADE'
            },
            refresh_token: {
                type: DataTypes.STRING(512),
                allowNull: false
            },
            expire_time: {
                type: DataTypes.BIGINT,
                allowNull: false
            },
            version: {
                type: DataTypes.INTEGER,
                allowNull: false
            }
        },
        {
            tableName: 'tbl_refreshTokens',
            timestamps: true,
            indexes: [
                {
                    name: 'idx_refreshToken',
                    fields: ["refresh_token"],
                    unique: true
                }
            ]
        }
    );
}