const { models } = require("../core/db");

module.exports = new (class {
    constructor () {
        this.RefreshToken = models.RefreshToken;
    }
    async findByUserId(user_id) {
        const refreshTokenFound = await this.RefreshToken.findOne({
            where: {
                user_id: user_id
            }
        });

        return refreshTokenFound;
    }

    async createRefreshToken(user_id, refresh_token, expire_time, version) {
        await this.RefreshToken.create({
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

    async deleteRefreshTokenByUserId(user_id) {
        await this.RefreshToken.destroy({
            where: {
                user_id: user_id
            }
        });
    }
})();