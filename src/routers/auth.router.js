const express = require('express');
const authController = require('../controllers/auth.controller');
const authValidator = require('../validators/auth.validator');
const validator = require('../validators/validator');
const checkAuthMiddleware = require('../middlewares/checkAuth.middleware');
const authGuard = require('../guards/auth.guard');

const router = express.Router();

router.use(checkAuthMiddleware);
router.get('/register', authController.getRegisterPage);
router.post(
    '/register',
    authValidator.registerValidation(),
    validator.validate.bind(validator),
    authController.actionRegister
);
router.get('/login', authController.getLoginPage);
router.post(
    '/login',
    authValidator.loginValidation(),
    validator.validate.bind(validator),
    authController.actionLogin
);
router.use(authGuard);
router.post('/logout', authController.actionLogout);

module.exports = router;