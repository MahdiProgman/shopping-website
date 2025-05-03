const { dataBase } = require('../core/db');
const ProductModel = require('./../sequelize/models/product.model');
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

    async createProduct({
        title,
        image,
        category_id,
        rate = 5,
        rate_fa = '۵.۰',
        views = 0,
        comments_number = 0,
        price,
        price_fa,
        inventory,
        description
    }) {
        await Product.create({
            title,
            image,
            category_id,
            rate,
            rate_fa,
            views,
            comments_number,
            price,
            price_fa,
            inventory,
            description
        });
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
