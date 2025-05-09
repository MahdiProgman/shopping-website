const { dataBase } = require('../core/db');
const RefreshTokenModel = require('./../sequelize/models/refreshToken.model');

const RefreshToken = RefreshTokenModel(dataBase);

module.exports = new (class {
    async findByUserId(user_id) {
        const refreshTokenFound = await RefreshToken.findOne({
            where: {
                user_id: user_id
            }
        });

        return refreshTokenFound;
    }

    async createRefreshToken(user_id, refresh_token, expire_time, version) {
        await RefreshToken.create({
            user_id,
            refresh_token,
            expire_time,
            version
        });
    }

    async updateRefreshTokenByUserId(user_id, refresh_token, expire_time, version) {
        const refreshTokenFound = await this.findByUserId(user_id);

        await refreshTokenFound.update({
            refresh_token,
            expire_time,
            version
        });

        return refreshTokenFound;
    }
})();