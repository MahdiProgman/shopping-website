const _ = require('lodash');
const pagesService = require('../services/pages.service');

const getHomePage = async (req, res) => {
  const result = await pagesService.homePageService();
  res.render("index", {
    advertiseCards: result.advertiseCards,
    questions: result.questions,
    isLoggedInNow: req.flash('isLoggedInNow')[0] ?? false,
    login_state: req.login_state,
    user: req.user ? {
      first_name: req.user.first_name
    } : null
  });
};

const getProductPage = (req, res) => {
  res.render("product", {
    login_state: req.login_state,
    user: req.user ? {
      first_name: req.user.first_name
    } : null
  });
}

const getProductsPage = (req, res) => {
  res.render("products", {
    login_state: req.login_state,
    user: req.user ? {
      first_name: req.user.first_name
    } : null
  });
};

const getCartPage = (req, res) => {
  res.render("cart", {
    login_state: req.login_state,
    user: req.user ? {
      first_name: req.user.first_name
    } : null
  });
};

const getFavoritesPage = (req, res) => {
  res.render("favorites", {
    login_state: req.login_state,
    user: req.user ? {
      first_name: req.user.first_name
    } : null
  });
};

const getAboutUsPage = (req, res) => {
  res.render("about-us", {
    login_state: req.login_state,
    user: req.user ? {
      first_name: req.user.first_name
    } : null
  });
};

const getSupportPage = (req, res) => {
  res.render("support", {
    login_state: req.login_state,
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
