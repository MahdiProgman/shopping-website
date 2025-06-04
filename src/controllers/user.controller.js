const userService = require('../services/user.service');

const getDashboardPage = async (req, res) => {
  const result = await userService.dashboardPageService(res.locals.user.id);

  res.render('user-panel/dashboard', result);
}

const getOrdersPage = async (req, res) => {
  const result = await userService.ordersPageService(res.locals.user.id);

  res.render('user-panel/orders', result);
}

const getCartPage = async (req, res) => {
  const result = await userService.cartPageService(res.locals.user.id);

  const isProductRemovedFromCart = req.flash('isProductRemovedFromCart')[0];
  const didOrderPlace = req.flash('didOrderPlace')[0];

  res.render('user-panel/cart', {
    ...result,
    isProductRemovedFromCart: isProductRemovedFromCart ? isProductRemovedFromCart : false,
    didOrderPlace: didOrderPlace ? didOrderPlace : false
  });
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
  const isUserUpdated = req.flash('isUserUpdated')[0];
  const isPasswordNotMatch = req.flash('isPasswordNotMatch')[0];
  const isNewPasswordMatch = req.flash('isNewPasswordMatch')[0];
  const isNewPasswordSet = req.flash('isNewPasswordSet')[0]

  res.render('user-panel/change-info', {
    isUserUpdated: isUserUpdated ? isUserUpdated : false,
    isPasswordNotMatch: isPasswordNotMatch ? isPasswordNotMatch : false,
    isNewPasswordMatch: isNewPasswordMatch ? isNewPasswordMatch : false,
    isNewPasswordSet: isNewPasswordSet ? isNewPasswordSet : false
  });
}

const removeFromFavoritesAction = async (req, res) => {
  const { product_code } = req.params;
  const result = await userService.removeFromFavoritesActionService(res.locals.user.id, product_code);

  if(result == 'PRODUCT_IS_NOT_EXISTS_IN_FAVORITES' || result == 'PRODUCT_IS_NOT_EXISTS') return res.redirect('/');

  req.flash('isFavoriteRemoved', true);
  res.redirect('/user/favorites');
}

const removeFromCartAction = async (req, res) => {
  const { product_code } = req.params;
  
  const result = await userService.removeFromCartActionService(res.locals.user.id, product_code);

  if(result == 'PRODUCT_IS_EXISTS_IN_CART' || result == 'PRODUCT_IS_NOT_EXISTS') return res.redirect('/');

  req.flash('isProductRemovedFromCart', true);
  res.redirect('/user/cart');
}

const placeOrderAction = async (req, res) => {
  await userService.placeOrderActionService(res.locals.user.id);

  req.flash('didOrderPlace', true);
  res.redirect('/user/cart');
}

const changeInfoAction = async (req, res) => {
  const { first_name, last_name, email } = req.body;

  await userService.changeInfoActionService(res.locals.user.id, first_name, last_name, email);

  req.flash('isUserUpdated', true);
  res.redirect('/user/change-info');
}

const changePasswordAction = async (req, res) => {
  const { current_password, new_password } = req.body;

  const result = await userService.changePasswordActionService(res.locals.user.id, current_password, new_password);

  if(result == 'PASSWORD_IS_WRONG') req.flash('isPasswordNotMatch', true);
  else if(result == 'NEW_PASSWORD_IS_MATCH_WITH_CURRENT_PASSWORD') req.flash('isNewPasswordMatch', true);
  else req.flash('isNewPasswordSet', true);

  res.redirect('/user/change-info');
}

module.exports = {
  getDashboardPage,
  getOrdersPage,
  getCartPage,
  getFavoritesPage,
  getChangeInfoPage,
  removeFromFavoritesAction,
  removeFromCartAction,
  placeOrderAction,
  changeInfoAction,
  changePasswordAction
}