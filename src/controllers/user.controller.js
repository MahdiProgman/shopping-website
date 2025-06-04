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

const getFavoritesPage = (req, res) => {
  res.render('user-panel/favorites');
}

const getChangeInfoPage = (req, res) => {
  res.render('user-panel/change-info');
}

module.exports = {
  getDashboardPage,
  getOrdersPage,
  getCartPage,
  getFavoritesPage,
  getChangeInfoPage
}