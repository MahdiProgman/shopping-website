const authService = require('../services/auth.service');

const getRegisterPage = (req, res) => {
    if(req.login_state) return res.redirect('/');

    const error = req.flash('error')[0];
    res.render('register', {
        error: error ? error : '',
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

    res.render('login', {
        error: error ? error : '',
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

const actionLogout = async (req, res) => {
    const refreshToken = req.signedCookies.refresh_token;

    await authService.logoutService(refreshToken);

    res.clearCookie('access_token', {
        path: '/',
        signed: true
    });
    
    res.clearCookie('refresh_token', {
        path: '/',
        signed: true
    });

    req.login_state = false;
    req.user = null;

    res.redirect('/');
}

module.exports = { getRegisterPage, getLoginPage, actionRegister, actionLogin, actionLogout };