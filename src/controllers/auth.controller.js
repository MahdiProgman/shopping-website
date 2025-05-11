const _ = require('lodash');
const authService = require('../services/auth.service');

const getRegisterPage = (req, res) => {
    if(req.login_state) return res.redirect('/');

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

        req.flash('isLoggedInNow', true);
        res.redirect('/');
    }
}

const getLoginPage = (req, res) => {
    if(req.login_state) return res.redirect('/');

    const error = req.flash('error')[0];
    const errors = req.flash('errors');
    const oldData = req.flash('oldData')[0];

    res.render('login', {
        error: error ? error : '',
        errors: !_.isEmpty(errors) ? errors : [],
        oldData: !_.isEmpty(oldData) ? oldData : {}   
    });
};

const actionLogin = async (req, res) => {
    const { email, password } = req.body;
    const result = await authService.loginService(email, password);

    if(result == 'EMAIL_OR_PASSWORD_IS_WRONG') {
        req.flash('error', 'ایمیل یا رمز عبور اشتباه است');
        req.flash('oldData', req.body);
        res.redirect('/auth/login');
    } else {
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

        req.flash('isLoggedInNow', true);
        res.redirect('/');
    }
}

module.exports = { getRegisterPage, getLoginPage, actionRegister, actionLogin };