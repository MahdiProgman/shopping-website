const { validationResult } = require('express-validator');

module.exports = new (class {
  validationBody(req, res) {
    const result = validationResult(req);
    if (!result.isEmpty()) {
      const errors = result.array();
      const messages = [];
      errors.forEach((err) =>
        messages.push({ field: err.path, error: err.msg })
      );

      req.flash('errors', messages);
      req.flash('oldData', req.body);
      res.redirect(req.originalUrl);
      
      return false;
    } else {
      return true;
    }
  }

  validate(req, res, next) {
    if (!this.validationBody(req, res)) {
      return;
    } else {
      next();
    }
  }
})();
