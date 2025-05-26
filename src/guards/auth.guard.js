module.exports = (helperFunction = null) => {
    return function (req, res, next) {
        if(req.login_state) {
            return next();
        } else {
            req.flash('error', 'باید وارد حساب خود شوید');
            if(helperFunction) {
                helperFunction(req, res);
            } else {
                res.redirect('/');
            }
        }
    }
}