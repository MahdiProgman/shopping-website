const helpers = require('../helpers');

module.exports = (req, res, next) => {
    Object.entries(helpers).forEach(([key, fn]) => {
        res.locals[key] = fn;
    });

    return next();
}