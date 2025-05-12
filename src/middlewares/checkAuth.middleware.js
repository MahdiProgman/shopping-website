const jwt = require('jsonwebtoken');
const config = require('../core/config');
const authService = require('../services/auth.service');
const userRepo = require('../repositories/user.repository');

module.exports = async (req, res, next) => {
    const accessToken = req.signedCookies.access_token;

    if(!accessToken) {
        const refreshToken = req.signedCookies.refresh_token;
        if(refreshToken){
            const result = await authService.getAccessTokenService(refreshToken);
            if(result == 'TOKEN_IS_INVALID') {            
                res.clearCookie('access_token', {
                    path: '/',
                    signed: true
                });

                res.clearCookie('refresh_token', {
                    path: '/',
                    signed: true
                });

                req.login_state = false;

                return next();
            }

            res.cookie('refresh_token', result.refreshToken, {
                path: '/',
                maxAge: (((60 * 60) * 24) * 7) * 1000,
                httpOnly: true,
                sameSite: 'strict',
                signed: true,
                priority: 'high'
            });

            res.cookie('access_token', result.accessToken, {
                maxAge: (60 * 15) * 1000,
                httpOnly: true,
                sameSite: 'strict',
                signed: true,
                priority: "medium"
            });

            const decryptedToken = jwt.verify(result.accessToken, config.getAppConfig().access_token_secret);
            const userFound = await userRepo.findById(decryptedToken.id);

            req.login_state = true;
            req.user = userFound;

            return next();
        }

        req.login_state = false;

        return next();
    } else {
        try {
            const decryptedToken = jwt.verify(accessToken, config.getAppConfig().access_token_secret);
            const userFound = await userRepo.findById(decryptedToken.id);

            if(userFound) {
                req.login_state = true;
                req.user = userFound;

                return next();
            }
        } catch {
            return next();
        }
    }
}