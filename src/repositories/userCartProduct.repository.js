const { models } = require('../core/db');

module.exports = new (class {
    constructor () {
        this.UserCartProduct = models.UserCartProduct;
    }

    async addToCart(user_id, product_id) {
        const newProduct = new this.UserCartProduct({
            user_id: user_id,
            product_id: product_id
        });

        await newProduct.save();
    }

    async removeFromCart(user_id, product_id) {
        await this.UserCartProduct.destroy({
            where: {
                user_id: user_id,
                product_id: product_id
            }
        });
    }

    async isProductInCart(user_id, product_id) {
        const productFound = await this.UserCartProduct.findOne({
            where: {
                user_id: user_id,
                product_id: product_id
            }
        });

        return productFound ? true : false;
    }
})();