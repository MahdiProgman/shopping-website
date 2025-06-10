const favoriteRepo = require("../repositories/favorite.repository");
const orderRepo = require("../repositories/order.repository");
const orderItemRepo = require("../repositories/orderItem.repository");
const productRepo = require("../repositories/product.repository");
const userCartProductRepo = require("../repositories/userCartProduct.repository");
const userRepo = require('../repositories/user.repository');
const moment = require('jalali-moment');

const dashboardPageService = async (user_id) => {
  const countOfOrdersInAccount = await orderRepo.getCountOfOrdersInAccount(user_id);
  const countOfProductsInAccountCart = await userCartProductRepo.getCountOfProductsInAccountCart(user_id);
  const countOfFavoritesInAccount = await favoriteRepo.getCountOfFavoritesInAccount(user_id);
  const recentOrders = await orderItemRepo.findUserRecentlyPurchasedProductsByUserId(user_id);

  return {
    counts: {
      countOfOrdersInAccount,
      countOfProductsInAccountCart,
      countOfFavoritesInAccount
    },
    recentOrders: recentOrders
  }
}

const ordersPageService = async (user_id) => {
  const userOrders = await orderRepo.findUserOrdersByUserId(user_id);

  if (userOrders) {
    userOrders.forEach(order => {
      order.createdAt = moment(order.createdAt).locale('fa').format('D MMM YYYY');
    });
  }

  return {
    userOrders
  }
}

const cartPageService = async (user_id) => {
  const userCart = await userCartProductRepo.findAllProductsOfUserCartByUserId(user_id);
  
  if (userCart) {
    let totalPrice = 0;

    userCart.forEach(product => {
      totalPrice += product.price;
    });

    return {
      userCart,
      totalPrice
    }
  } else {
    return {
      userCart,
      totalPrice: null
    }
  }
}

const favoritesPageService = async (user_id) => {
  const userFavorites = await favoriteRepo.findAllFavoritesOfUserByUserId(user_id);

  return {
    userFavorites
  }
}

const removeFromFavoritesActionService = async (user_id, product_code) => {
    const productFound = await productRepo.findByProductCode(product_code);

    if(!productFound) return 'PRODUCT_IS_NOT_EXISTS';

    const isProductInFavorites = await favoriteRepo.isProductInFavorites(user_id, productFound.id);

    if(!isProductInFavorites) return 'PRODUCT_IS_NOT_EXISTS_IN_FAVORITES';

    await favoriteRepo.removeFromFavorites(user_id, productFound.id);
}

const removeFromCartActionService = async (user_id, product_code) => {
    const productFound = await productRepo.findByProductCode(product_code);
    const isProductInCart = await userCartProductRepo.isProductInCart(user_id, productFound.id);

    if(!isProductInCart) return 'PRODUCT_IS_NOT_EXISTS_IN_CART';

    await userCartProductRepo.removeFromCart(user_id, productFound.id);
}

const placeOrderActionService = async (user_id) => {
  const userCart = await userCartProductRepo.findAllProductsOfUserCartByUserId(user_id);
  const productIds = userCart.map(product => product.id);
  let totalPrice = 0;

  userCart.forEach(product => {
    totalPrice += product.price;
  });

  await orderRepo.createOrderWithItems(user_id, productIds, totalPrice, 'تحویل داده شده', '#70c970');
  await productRepo.reduceInventoryOfProducts(productIds);
  await userCartProductRepo.deleteAllOfProductsFromUserCartWithUserId(user_id);
}

const changeInfoActionService = async (user_id, first_name, last_name, email) => {
  await userRepo.updateUserById(user_id, first_name, last_name, email);
}

module.exports = {
  dashboardPageService,
  ordersPageService,
  cartPageService,
  favoritesPageService,
  removeFromFavoritesActionService,
  removeFromCartActionService,
  placeOrderActionService,
  changeInfoActionService
}