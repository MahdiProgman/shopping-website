const { check } = require("express-validator");

module.exports = new (class {
    registerValidation(){
        return [
            check('email').not().isEmpty().withMessage('ایمیل نباید خالی باشد'),
            check('email').isEmail().withMessage('ایمیل وارد شده ایمیلی معتبر نیست'),
            check('first_name').not().isEmpty().withMessage('نام نباید خالی باشد'),
            check('first_name').isLength({ min: 3, max: 15 }).withMessage('طول نام باید بین ۳ تا ۱۵ کاراکتر باشد'),
            check('last_name').not().isEmpty().withMessage('نام خانوادگی نباید خالی باشد'),
            check('last_name').isLength({ min: 4, max: 24 }).withMessage('طول نام خانوادگی باید بین ۴ تا ۲۴ کاراکتر باشد'),
            check('password').not().isEmpty().withMessage('رمز عبور نباید خالی باشد'),
            check('password').isLength({ min: 8, max: 24}).withMessage('طول رمز عبور باید بین ۸ تا ۲۴ کاراکتر باشد')
        ];
    }

    loginValidation(){
        return [
            check('email').not().isEmpty().withMessage('ایمیل نباید خالی باشد'),
            check('email').isEmail().withMessage('ایمیل وارد شده ایمیلی معتبر نیست'),
            check('password').not().isEmpty().withMessage('رمز عبور نباید خالی باشد'),
            check('password').isLength({ min: 8, max: 24}).withMessage('طول رمز عبور باید بین ۸ تا ۲۴ کاراکتر باشد')
        ];
    }
})();