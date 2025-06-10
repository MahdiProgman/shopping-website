const { models } = require('../core/db');
const orderItemRepo = require('./orderItem.repository');

module.exports = new (class {
  constructor () {
    this.Order = models.Order;
    this.OrderItem = models.OrderItem;
    this.Product = models.Product;
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

  async findUserOrdersByUserId(user_id) {
    const orders = await this.Order.findAll({
      where: {
        user_id: user_id
      },
      include: [
        {
          model: this.OrderItem,
          as: 'orderItems',
          include: [
            {
              model: this.Product,
              as: 'product',
              attributes: ['product_code', 'image']
            }
          ]
        }
      ],
      order: [['createdAt', 'DESC']]
    });

    if (orders.length === 0) return null;

    return orders.map(order => ({
      order_code: order.order_code,
      status: order.status,
      status_color: order.status_color,
      total_price: order.total_price,
      createdAt: order.createdAt,
      orderItems: order.orderItems.map(item => ({
        product_code: item.product.product_code,
        image: item.product.image
      }))
    }));
  }
})();