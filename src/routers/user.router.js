const express = require('express');
const authGuard = require('../guards/auth.guard');
const userController = require('./../controllers/user.controller');

const router = express.Router();

router.use(authGuard());

router.get(
  '/dashboard',
  userController.getDashboardPage
);
router.get(
  '/orders',
  userController.getOrdersPage
);
router.get(
  '/cart',
  userController.getCartPage
);
router.get(
  '/favorites',
  userController.getFavoritesPage
);
router.get(
  '/change-info',
  userController.getChangeInfoPage
);

module.exports = router;