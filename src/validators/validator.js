const { validationResult } = require('express-validator');

module.exports = new (class {
  validationBody(req, res, helperFunction) {
    const result = validationResult(req);
    if (!result.isEmpty()) {
      const errors = result.array();
      const messages = [];
      errors.forEach((err) =>
        messages.push({ field: err.path, error: err.msg })
      );

      req.flash('errors', messages);
      req.flash('oldData', req.body);

      if(helperFunction) helperFunction(req, res);
      else res.redirect(req.originalUrl);

      return false;
    } else {
      return true;
    }
  }

  validate(helperFunction = null) {
    return function (req, res, next) {
      if (!this.validationBody(req, res, helperFunction)) {
        return;
      } else {
        return next();
      }
    }
  }
})();
