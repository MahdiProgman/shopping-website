const _ = require('lodash');

module.exports = (req, res, next) => {
    const errors = req.flash('errors');
    const oldData = req.flash('oldData')[0];

    res.locals.errors = !_.isEmpty(errors) ? errors : null;
    res.locals.oldData = !_.isEmpty(oldData) ? oldData : null;

    return next();
}