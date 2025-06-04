const favoriteRepo = require("../repositories/favorite.repository");
const orderRepo = require("../repositories/order.repository");
const orderItemRepo = require("../repositories/orderItem.repository");
const productRepo = require("../repositories/product.repository");
const userCartProductRepo = require("../repositories/userCartProduct.repository");

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

module.exports = {
  dashboardPageService,
  cartPageService,
  favoritesPageService,
  removeFromFavoritesActionService
}