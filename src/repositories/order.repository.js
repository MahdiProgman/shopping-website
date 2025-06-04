const { models } = require('../core/db');
const orderItemRepo = require('./orderItem.repository');

module.exports = new (class {
  constructor () {
    this.Order = models.Order;
    this.OrderItem = models.OrderItem;
  }

  async getCountOfOrdersInAccount(user_id) {
    const count = await this.Order.count({
      where: {
        user_id: user_id
      }
    });

    return count;
  }

  async createOrderWithItems(user_id, productIds, totalPrice, status, status_color) {
    const countOfOrdersInDB = await this.Order.count();
    const newOrder = await this.Order.create({
      order_code: `swo-${countOfOrdersInDB + 1}`,
      status: status,
      status_color: status_color,
      total_price: totalPrice,
      user_id: user_id
    });

    const orderItems = productIds.map(product_id => ({
      order_id: newOrder.id,
      product_id: product_id
    }));

    await this.OrderItem.bulkCreate(orderItems);
  }
})();