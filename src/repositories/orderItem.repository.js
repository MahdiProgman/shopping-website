const { models } = require('../core/db');

module.exports = new (class {
  constructor () {
    this.OrderItem = models.OrderItem;
    this.Order = models.Order;
    this.Product = models.Product;
  }

  async findOrderItemsByOrderId (order_id) {
    const orderItems = await this.OrderItem.findAll({
      where: {
        order_id: order_id
      },
      include: [
        {
          model: this.Product,
          attributes: ['product_code', 'image', 'title'],
          as: 'product'
        }
      ],
      limit
    });

    if(orderItems.length == 0) return null;

    return orderItems.map(orderItem => ({
      product_code: orderItem.product.product_code,
      image: orderItem.product.iamge,
      title: orderItem.product.title
    }));
  }

  async findUserRecentlyPurchasedProductsByUserId (user_id, limit = 4) {
    const recentlyPurchasedProducts = await this.OrderItem.findAll({
    include: [
      {
        model: this.Order,
        as: 'order',
        where: {
          user_id: user_id
        },
          attributes: ['createdAt']
        },
        {
          model: this.Product,
          as: 'product',
          attributes: ['product_code', 'title', 'image']
        }
      ],
      order: [[{ model: this.Order, as: 'order' }, 'createdAt', 'DESC']],
      limit: limit
    });

    if(recentlyPurchasedProducts.length === 0) return null;

    return recentlyPurchasedProducts.map(recentlyPurchasedProduct => ({
      product_code: recentlyPurchasedProduct.product.product_code,
      image: recentlyPurchasedProduct.product.image,
      title: recentlyPurchasedProduct.product.title
    }));
  }
})();