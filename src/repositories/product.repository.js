const { dataBase } = require('../core/db');
const ProductModel = require('./../sequelize/models/product.model');
const categoryRepo = require('./category.repository');
const Product = ProductModel(dataBase);

module.exports = new (class {
    async findById(id) {
        const product = await Product.findByPk(id);
        return product;
    }

    async findByTitle(title) {
        const product = await Product.findOne({
            where: { title }
        });
        return product;
    }

    async findBestSellProducts() {
        const products = await Product.findAll({
            order: [['sells', 'DESC']],
            limit: 8
        });

        if(products.length == 0 || products[0].sells == 0) return null;

        return products.map(product => ({
            product_code: product.product_code,
            image: product.image,
            title: product.title,
            rate: product.rate,
            price_fa: product.price_fa
        }));
    }

    async findMostVisitedProducts() {
        const products = await Product.findAll({
            order: [['views', 'DESC']],
            limit: 8
        });

        if(products.length == 0 || products[0].views == 0) return null;

        return products.map(product => ({
            product_code: product.product_code,
            image: product.image,
            title: product.title,
            rate: product.rate,
            price_fa: product.price_fa
        }));
    }

    async deleteProduct(id) {
        return await Product.destroy({
            where: { id }
        });
    }

    async getAllProducts() {
        return await Product.findAll();
    }

    async updateProduct(id, data) {
        await Product.update(data, {
            where: { id }
        });
    }
})();
