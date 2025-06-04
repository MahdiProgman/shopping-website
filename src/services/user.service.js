const favoriteRepo = require("../repositories/favorite.repository");
const orderRepo = require("../repositories/order.repository");
const orderItemRepo = require("../repositories/orderItem.repository");
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

module.exports = {
  dashboardPageService
}