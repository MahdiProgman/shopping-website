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
})();