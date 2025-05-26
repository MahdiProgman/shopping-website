const express = require('express');
const pagesController = require('../controllers/pages.controller');
const checkAuthMiddleware = require('../middlewares/checkAuth.middleware');
const pagesValidator = require('../validators/pages.validator');
const validator = require('../validators/validator');
const sendGlobalDataMiddleware = require('../middlewares/sendGlobalData.middleware');
const authGuard = require('../guards/auth.guard');

const router = express.Router();

router.use(checkAuthMiddleware);
router.use(sendGlobalDataMiddleware);
router.get('/', pagesController.getHomePage);
router.get('/product/:product_code', pagesController.getProductPage)
router.get(
    '/products',
    pagesValidator.productsPageValidation(),
    validator.validate().bind(validator),
    pagesController.getProductsPage
);
router.get('/cart', pagesController.getCartPage);
router.get('/favorites', pagesController.getFavoritesPage);
router.get('/about-us', pagesController.getAboutUsPage);
router.get('/search', pagesController.getSearchResultsPage);
router.get('/support', pagesController.getSupportPage);

router.post(
    '/:product_code/add/comment',
    authGuard(),
    pagesValidator.commentValidation(),
    validator.validate((req, res) => {
        req.flash('isCommentBoxOpen', true);
        res.redirect(`/product/${req.params.product_code}`);
    }).bind(validator),
    pagesController.addCommentAction
);
router.post(
    '/cart/add/:product_code',
    authGuard((req, res) => {
        res.redirect(`/product/${req.params.product_code}`);
    }),
    pagesController.addToCartAction
);
router.post(
    '/cart/delete/:product_code',
    authGuard((req, res) => {
        res.redirect(`/product/${req.params.product_code}`);
    }),
    pagesController.removeFromCartAction
);
router.post(
    '/favorites/add/:product_code',
    authGuard((req, res) => {
        res.redirect(`/product/${req.params.product_code}`)
    }),
    pagesController.addToFavoritesAction
);
router.post(
    '/favorites/delete/:product_code',
    authGuard((req, res) => {
        res.redirect(`/product/${req.params.product_code}`);
    }),
    pagesController.removeFromFavoritesAction
);

router.use(pagesController.getNotFoundPage);

module.exports = router;