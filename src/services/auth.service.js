const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const userRepo = require('./../repositories/user.repository');
const refreshTokenRepo = require('./../repositories/refreshToken.repository');
const config = require('./../core/config');

const registerService = async (email, first_name, last_name, password, repeat_password) => {
    if(password != repeat_password){
        return 'PASSWORD_IS_NOT_MATCH';
    }

    const userFound = await userRepo.findByEmail(email);

    if(userFound){
        return 'USER_EXISTS';
    } else {
        const salt = await bcrypt.genSalt(3);
        const cryptedPass = await bcrypt.hash(password, salt);

        const expireTimeOfRefreshToken = Date.now() + (((60 * 60) * 24) * 7);
        const expireTimeOfAccessToken = Date.now() + (60 * 15);

        const newUser = await userRepo.createUser(email, first_name, last_name, cryptedPass);

        const refreshTokenFound = await refreshTokenRepo.findByUserId(newUser.id);
        const refreshToken = jwt.sign(
            { 
                id: newUser.id,
                email: email,
                expire: expireTimeOfRefreshToken,
                version: refreshTokenFound ? refreshTokenFound.version + 1 : 1
            },
            config.getAppConfig().refresh_token_secret,
            {
                expiresIn: expireTimeOfRefreshToken
            }
        );
        const accessToken = jwt.sign(
            { 
                id: newUser.id,
                email: email,
                expire: expireTimeOfAccessToken,
            },
            config.getAppConfig().access_token_secret,
            {
                expiresIn: expireTimeOfAccessToken
            }
        );

        if(refreshTokenFound){
            await refreshTokenRepo.updateRefreshTokenByUserId(newUser.id, refreshToken, expireTimeOfRefreshToken, refreshTokenFound.version + 1);
        } else {
            await refreshTokenRepo.createRefreshToken(newUser.id, refreshToken, expireTimeOfRefreshToken, 1);
        }

        return { refreshToken, accessToken };
    }
}

module.exports = { registerService };