const _ = require('lodash');
const authService = require('../services/auth.service');

const getRegisterPage = (req, res) => {
    const error = req.flash('error')[0];
    const errors = req.flash('errors');
    const oldData = req.flash('oldData')[0];

    res.render('register', {
        error: error ? error : '',
        errors: !_.isEmpty(errors) ? errors : [],
        oldData: !_.isEmpty(oldData) ? oldData : {}   
    });
};

const actionRegister = async (req, res) => {
    const { email, first_name, last_name, password, repeat_password } = req.body;
    const result = await authService.registerService(email, first_name, last_name, password, repeat_password);

    if(result === 'PASSWORD_IS_NOT_MATCH') {
        req.flash('error', 'رمز عبور و تکرار رمز عبور با یکدیگر مطابقت ندارند');
        req.flash('oldData', req.body);
        res.redirect('/auth/register');
    } else if(result === 'USER_EXISTS'){
        req.flash('error', 'کاربری با این ایمیل از قبل وجود دارد');
        req.flash('oldData', req.body);
        res.redirect('/auth/register');
    } 
    else {
        res.cookie('refresh_token', result.refreshToken, {
            path: '/auth/access-token',
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

        req.flash('isLoggedInNow', true);
        res.redirect('/');
    }
}

const getLoginPage = (req, res) => {
    res.render('login');
};

module.exports = { getRegisterPage, getLoginPage, actionRegister };