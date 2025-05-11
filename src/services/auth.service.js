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

        const expireTimeOfRefreshToken = Date.now() + (((60 * 60) * 24) * 7) * 1000;
        const expireTimeOfAccessToken = Date.now() + (60 * 15) * 1000;

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

const loginService = async (email, password) => {
    const userFound = await userRepo.findByEmail(email, true);

    if(userFound) {
        const isPasswordMatch = await bcrypt.compare(password, userFound.password);

        if(isPasswordMatch) {
            const expireTimeOfRefreshToken = Date.now() + (((60 * 60) * 24) * 7);
            const expireTimeOfAccessToken = Date.now() + (60 * 15);
    
            const refreshTokenFound = await refreshTokenRepo.findByUserId(userFound.id);
            const refreshToken = jwt.sign(
                { 
                    id: userFound.id,
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
                    id: userFound.id,
                    email: email,
                    expire: expireTimeOfAccessToken,
                },
                config.getAppConfig().access_token_secret,
                {
                    expiresIn: expireTimeOfAccessToken
                }
            );
    
            if(refreshTokenFound){
                await refreshTokenRepo.updateRefreshTokenByUserId(userFound.id, refreshToken, expireTimeOfRefreshToken, refreshTokenFound.version + 1);
            } else {
                await refreshTokenRepo.createRefreshToken(userFound.id, refreshToken, expireTimeOfRefreshToken, 1);
            }

            return { refreshToken, accessToken };
        } else {
            return 'EMAIL_OR_PASSWORD_IS_WRONG'
        }
    } else {
        return 'EMAIL_OR_PASSWORD_IS_WRONG';
    }
}

const logoutService = async (refresh_token) => {
    const decryptedToken = jwt.verify(refresh_token, config.getAppConfig().refresh_token_secret);
    await refreshTokenRepo.deleteRefreshTokenByUserId(decryptedToken.id);
}

const getAccessTokenService = async (refresh_token) => {
    let decryptedToken;

    try {
        decryptedToken = jwt.verify(refresh_token, config.getAppConfig().refresh_token_secret);
    } catch {
        return 'TOKEN_IS_INVALID';
    }

    if(decryptedToken) {
        const refreshTokenFound = await refreshTokenRepo.findByUserId(decryptedToken.id);
        if(decryptedToken.version == refreshTokenFound.version && Date.now() < refreshTokenFound.expire_time) {
            const userFound = await userRepo.findById(decryptedToken.id);
            if(userFound) {
                const expireTimeOfRefreshToken = Date.now() + (((60 * 60) * 24) * 7) * 1000;
                const expireTimeOfAccessToken = Date.now() + (60 * 15) * 1000;
    
                const refreshToken = jwt.sign(
                    { 
                        id: userFound.id,
                        email: userFound.email,
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
                        id: userFound.id,
                        email: userFound.email,
                        expire: expireTimeOfAccessToken,
                    },
                    config.getAppConfig().access_token_secret,
                    {
                        expiresIn: expireTimeOfAccessToken
                    }
                );
    
                if(refreshTokenFound) {
                    await refreshTokenRepo.updateRefreshTokenByUserId(decryptedToken.id, refreshToken, expireTimeOfRefreshToken, refreshTokenFound ? refreshTokenFound.version + 1 : 1)
                } else {
                    await refreshTokenRepo.createRefreshToken(decryptedToken.id, refreshToken, expireTimeOfRefreshToken, 1);
                }
    
                return { refreshToken, accessToken }
            } else {
                return 'TOKEN_IS_INVALID';
            }
        } else {
            return 'TOKEN_IS_INVALID';
        }
    } else {
        return 'TOKEN_IS_INVALID';
    }
}

module.exports = { registerService, loginService, getAccessTokenService, logoutService };