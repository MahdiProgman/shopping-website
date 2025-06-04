const userService = require('../services/user.service');

const getDashboardPage = async (req, res) => {
  const result = await userService.dashboardPageService(res.locals.user.id);

  res.render('user-panel/dashboard', result);
}

const getOrdersPage = (req, res) => {
  res.render('user-panel/orders');
}

const getCartPage = (req, res) => {
  res.render('user-panel/cart');
}

const getFavoritesPage = async (req, res) => {
  const result = await userService.favoritesPageService(res.locals.user.id);

  const isFavoriteRemoved = req.flash('isFavoriteRemoved')[0];

  res.render('user-panel/favorites', {
    ...result,
    isFavoriteRemoved: isFavoriteRemoved ? isFavoriteRemoved : false
  });
}

const getChangeInfoPage = (req, res) => {
  res.render('user-panel/change-info');
}

const removeFromFavoritesAction = async (req, res) => {
  const { product_code } = req.params;
  const result = await userService.removeFromFavoritesActionService(res.locals.user.id, product_code);

  if(result == 'PRODUCT_IS_NOT_EXISTS_IN_FAVORITES' || result == 'PRODUCT_IS_NOT_EXISTS') return res.redirect('/');

  req.flash('isFavoriteRemoved', true);
  res.redirect('/user/favorites');
}

module.exports = {
  getDashboardPage,
  getOrdersPage,
  getCartPage,
  getFavoritesPage,
  getChangeInfoPage,
  removeFromFavoritesAction
}