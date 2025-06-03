const getDashboardPage = (req, res) => {
  res.render('user-panel/dashboard');
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