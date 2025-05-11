const express = require('express');
const pagesController = require('../controllers/pages.controller');
const checkAuthMiddleware = require('../middlewares/checkAuth.middleware');

const router = express.Router();

router.use(checkAuthMiddleware);
router.get('/', pagesController.getHomePage);
router.get('/product', pagesController.getProductPage)
router.get('/products', pagesController.getProductsPage);
router.get('/cart', pagesController.getCartPage);
router.get('/favorites', pagesController.getFavoritesPage);
router.get('/about-us', pagesController.getAboutUsPage);
router.get('/support', pagesController.getSupportPage);

module.exports = router;