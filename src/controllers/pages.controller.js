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
  const result = await pagesService.productPageService(product_code, res.locals.user.id ? res.locals.user.id : null);

  if(!result) return next();

  const newCommentSubmitted = req.flash('newCommentSubmitted')[0];
  const isCommentBoxOpen = req.flash('isCommentBoxOpen')[0];
  const error = req.flash('error')[0];

  res.render("product", {
    product: result.product,
    productsInThisCategory: result.productsInThisCategory,
    newCommentSubmitted: newCommentSubmitted ? newCommentSubmitted : false,
    isCommentBoxOpen: isCommentBoxOpen ? isCommentBoxOpen : false,
    isUserCommentedBefore: result.isUserCommentedBefore,
    error: error ? error : null
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

const addCommentAction = async (req, res) => {
  const { product_code } = req.params;
  const { comment_text, rate, positive_points, negetive_points } = req.body;

  const result = await pagesService.addCommentActionService(
    comment_text,
    positive_points ? positive_points : [],
    negetive_points ? negetive_points : [],
    parseInt(rate),
    product_code,
    res.locals.user.id
  );

  if(result == 'PRODUCT_NOT_FOUND') res.redirect('/');
  else if(result == 'USER_COMMENTED_BEFORE') {
    req.flash('error', 'کاربر گرامی شما فقط میتوانید یک نظر در هر محصول داشته باشید');
    res.redirect(`/product/${product_code}`);
  }
  else {
    req.flash('newCommentSubmitted', true);
    res.redirect(`/product/${product_code}`);
  }
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
  getSearchResultsPage,
  addCommentAction
};
