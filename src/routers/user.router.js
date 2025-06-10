const express = require('express');
const authGuard = require('../guards/auth.guard');
const userController = require('./../controllers/user.controller');
const userValidator = require('../validators/user.validator');
const validator = require('../validators/validator');

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

router.post(
  '/favorites/remove/:product_code',
  userController.removeFromFavoritesAction
);

router.post(
  '/cart/remove/:product_code',
  userController.removeFromCartAction
);

router.post(
  '/place-order',
  userController.placeOrderAction
);
router.post(
  '/change-info',
  userValidator.changeInfoValidation(),
  validator.validate().bind(validator),
  userController.changeInfoAction
)

module.exports = router;