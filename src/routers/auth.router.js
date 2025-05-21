const express = require('express');
const authController = require('../controllers/auth.controller');

const router = express.Router();

router.get('/register', authController.getRegisterPage);
router.get('/login', authController.getLoginPage);

module.exports = router;