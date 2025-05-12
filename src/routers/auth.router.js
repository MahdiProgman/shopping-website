const express = require('express');
const authController = require('../controllers/auth.controller');
const authValidator = require('../validators/auth.validator');
const validator = require('../validators/validator');

const router = express.Router();

router.get('/register', authController.getRegisterPage);
router.post(
    '/register',
    authValidator.registerValidation(),
    validator.validate.bind(validator),
    authController.actionRegister
);
router.get('/login', authController.getLoginPage);

module.exports = router;