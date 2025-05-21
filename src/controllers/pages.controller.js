const _ = require('lodash');
const pagesService = require('../services/pages.service');

const getHomePage = async (req, res) => {
  const result = await pagesService.homePageService();

  res.render("index", {
    advertiseCards: result.advertiseCards,
    bestSellProducts: result.bestSellProducts,
    categories: result.categories,
    isLoggedInNow: req.flash('isLoggedInNow')[0] ?? false,
    questions: result.questions,
    mostVisitedProducts: result.mostVisitedProducts
  });
};

const getProductPage = async (req, res, next) => {
  const { product_code } = req.params;
  const result = await pagesService.productPageService(product_code);

  if(!result) return next();

  res.render("product", {
    product: result.product,
    productsInThisCategory: result.productsInThisCategory
  });
}

const getProductsPage = async (req, res) => {
  const { category, orderBy, page } = req.query;
  const result = await pagesService.productsPageService(category, orderBy, page);

  res.render("products", {
    categories: result.categories,
    settings: {
      category: category ? category : 'all',
      orderBy: orderBy ? orderBy : 'buyers-suggestions',
      page: page ? page : 1
    },
    products: result ? result.products : null
  });
};

const getCartPage = async (req, res) => {
  res.render("cart");
};

const getFavoritesPage = async (req, res) => {
  res.render("favorites");
};

const getAboutUsPage = async (req, res) => {
  const result = await pagesService.aboutUsPageService();

  res.render("about-us", {
    aboutUsText: result.aboutUsText,
    featureCards: result.featureCards
  });
};

const getSearchResultsPage = async (req, res) => {
  const { q } = req.query;
  const result = await pagesService.searchResultsPageService(q);

  res.render('search-results', {
    products: result.products
  });
}

const getSupportPage = async (req, res) => {
  const result = await pagesService.supportPageService();

  res.render("support", {
    footerData: result.footerData,
    supportCards: result.supportCards,
    supportText: result.supportText
  });
};

const getNotFoundPage = async (req, res) => {
  res.render("404");
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
