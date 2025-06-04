const { models } = require('../core/db');

module.exports = new (class {
    constructor () {
        this.UserCartProduct = models.UserCartProduct;
        this.Product = models.Product;
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

    async getCountOfProductsInAccountCart(user_id) {
        const count = await this.UserCartProduct.count({
            where: {
                user_id: user_id
            }
        });

        return count;
    }

    async findAllProductsOfUserCartByUserId(user_id) {
        const cart = await this.UserCartProduct.findAll({
            where: {
                user_id: user_id
            },
            include: [
                {
                    model: this.Product,
                    as: 'product',
                    attributes: ['id', 'product_code', 'image', 'title', 'rate', 'price', 'price_fa']
                }
            ]
        });

        if(cart.length === 0) return null;

        return cart.map(product => ({
            id: product.product.id,
            product_code: product.product.product_code,
            image: product.product.image,
            title: product.product.title,
            rate: product.product.rate,
            price: product.product.price,
            price_fa: product.product.price_fa
        }));
    }

    async deleteAllOfProductsFromUserCartWithUserId(user_id) {
        await this.UserCartProduct.destroy({
            where: {
                user_id: user_id
            }
        });
    }
})();