const _ = require('lodash');
const pagesService = require('../services/pages.service');

const getHomePage = async (req, res) => {
  const result = await pagesService.homePageService();

  res.render("index", {
    advertiseCards: result.advertiseCards,
    bestSellProducts: result.bestSellProducts,
    categories: result.categories,
    footerData: result.footerData,
    isLoggedInNow: req.flash('isLoggedInNow')[0] ?? false,
    questions: result.questions,
    mostVisitedProducts: result.mostVisitedProducts,
    login_state: req.login_state,
    text: '',
    user: req.user ? {
      first_name: req.user.first_name
    } : null
  });
};

const getProductPage = async (req, res, next) => {
  const { product_code } = req.params;
  const result = await pagesService.productPageService(product_code);

  if(!result.product) return next();

  res.render("product", {
    footerData: result.footerData,
    login_state: req.login_state,
    text: '',
    product: result.product,
    productsInThisCategory: result.productsInThisCategory,
    user: req.user ? {
      first_name: req.user.first_name
    } : null
  });
}

const getProductsPage = async (req, res) => {
  const { category, orderBy, page } = req.query;
  const result = await pagesService.productsPageService(category, orderBy, page);

  res.render("products", {
    categories: result.categories,
    footerData: result.footerData,
    login_state: req.login_state,
    text: '',
    settings: {
      category: category ? category : 'all',
      orderBy: orderBy ? orderBy : 'buyers-suggestions',
      page: page ? page : 1
    },
    products: result ? result.products : null,
    user: req.user ? {
      first_name: req.user.first_name
    } : null
  });
};

const getCartPage = async (req, res) => {
  const result = await pagesService.cartPageService();

  res.render("cart", {
    login_state: req.login_state,
    footerData: result.footerData,
    text: '',
    user: req.user ? {
      first_name: req.user.first_name
    } : null
  });
};

const getFavoritesPage = async (req, res) => {
  const result = await pagesService.favoritesPageService();

  res.render("favorites", {
    login_state: req.login_state,
    footerData: result.footerData,
    text: '',
    user: req.user ? {
      first_name: req.user.first_name
    } : null
  });
};

const getAboutUsPage = async (req, res) => {
  const result = await pagesService.aboutUsPageService();

  res.render("about-us", {
    aboutUsText: result.aboutUsText,
    featureCards: result.featureCards,
    footerData: result.footerData,
    login_state: req.login_state,
    text: '',
    user: req.user ? {
      first_name: req.user.first_name
    } : null
  });
};

const getSearchResultsPage = async (req, res) => {
  const { q } = req.query;
  const result = await pagesService.searchResultsPageService(q);

  res.render('search-results', {
    footerData: result.footerData,
    login_state: req.login_state,
    text: q,
    products: result.products,
    user: req.user ? {
      first_name: req.user.first_name
    } : null
  });
}

const getSupportPage = async (req, res) => {
  const result = await pagesService.supportPageService();

  res.render("support", {
    footerData: result.footerData,
    login_state: req.login_state,
    supportCards: result.supportCards,
    text: '',
    supportText: result.supportText,
    user: req.user ? {
      first_name: req.user.first_name
    } : null
  });
};

const getNotFoundPage = async (req, res) => {
  const result = await pagesService.notFoundPageService();

  res.render("404", {
    footerData: result.footerData,
    login_state: req.login_state,
    text: '',
    user: req.user ? {
      first_name: req.user.first_name
    } : null
  });
}

module.exports = {
  getHomePage,
  getProductPage,
  getProductsPage,
  getCartPage,
  getFavoritesPage,
  getAboutUsPage,
  getSupportPage,
  getNotFoundPage,
  getSearchResultsPage
};
