const express = require('express');
const pagesController = require('../controllers/pages.controller');
const checkAuthMiddleware = require('../middlewares/checkAuth.middleware');
const pagesValidator = require('../validators/pages.validator');
const validator = require('../validators/validator');

const router = express.Router();

router.use(checkAuthMiddleware);
router.get('/', pagesController.getHomePage);
router.get('/product', pagesController.getProductPage)
router.get(
    '/products',
    pagesValidator.productsPageValidation(),
    validator.validate.bind(validator),
    pagesController.getProductsPage
);
router.get('/cart', pagesController.getCartPage);
router.get('/favorites', pagesController.getFavoritesPage);
router.get('/about-us', pagesController.getAboutUsPage);
router.get('/support', pagesController.getSupportPage);

router.use(pagesController.getNotFoundPage);

module.exports = router;