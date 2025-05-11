module.exports = (req, res, next) => {
    if(req.login_state) {
        return next();
    } else {
        req.flash('error', 'باید وارد حساب خود شوید');
        res.redirect('/');
    }
}