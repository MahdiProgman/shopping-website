const _ = require('lodash');
const pagesService = require('../services/pages.service');

const getHomePage = async (req, res) => {
  const result = await pagesService.homePageService();

  res.render("index", {
    advertiseCards: result.advertiseCards,
    categories: result.categories,
    footerData: result.footerData,
    isLoggedInNow: req.flash('isLoggedInNow')[0] ?? false,
    questions: result.questions,
    login_state: req.login_state,
    user: req.user ? {
      first_name: req.user.first_name
    } : null
  });
};

const getProductPage = async (req, res) => {
  const result = await pagesService.productPageService();

  res.render("product", {
    login_state: req.login_state,
    footerData: result.footerData,
    user: req.user ? {
      first_name: req.user.first_name
    } : null
  });
}

const getProductsPage = async (req, res) => {
  const result = await pagesService.productsPageService();

  res.render("products", {
    categories: result.categories,
    login_state: req.login_state,
    footerData: result.footerData,
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
    user: req.user ? {
      first_name: req.user.first_name
    } : null
  });
};

const getSupportPage = async (req, res) => {
  const result = await pagesService.supportPageService();

  res.render("support", {
    footerData: result.footerData,
    login_state: req.login_state,
    supportCards: result.supportCards,
    supportText: result.supportText,
    user: req.user ? {
      first_name: req.user.first_name
    } : null
  });
};

module.exports = {
  getHomePage,
  getProductPage,
  getProductsPage,
  getCartPage,
  getFavoritesPage,
  getAboutUsPage,
  getSupportPage
};
