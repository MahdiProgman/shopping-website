const { Op } = require('sequelize');
const { dataBase } = require('../core/db');
const ProductModel = require('./../sequelize/models/product.model');
const categoryRepo = require('./category.repository');
const productCommentRepo = require('./productComment.repository');
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

    async findByProductCode(product_code) {
        const product = await Product.findOne({
            where: { product_code }
        });

        if (!product) return null;

        const comments = await productCommentRepo.findAllCommentsOfProductByProductId(product.id);
        const categoryFound = await categoryRepo.findById(product.category_id);

        return product ? {
            id: product.id,
            product_code: product.product_code,
            title: product.title,
            category_id: categoryFound.id,
            category: categoryFound.name,
            category_fa: categoryFound.name_fa,
            image: product.image,
            images: product.images,
            views: product.views,
            rate: product.rate,
            specifications: product.specifications,
            description: product.description,
            price_fa: product.price_fa,
            comments: comments,
            inventory: product.inventory
        } : null;
    }

    async findAllProductsOfCategoryById(category_id) {
        const products = await Product.findAll({
            where: {
                category_id : category_id
            }
        });

        if(products.length == 0) return null;
        
        return products.map(product => ({
            product_code: product.product_code,
            image: product.image,
            title: product.title,
            rate: product.rate,
            price_fa: product.price_fa
        }));
    }

    async findAllProducts(category = 'all', orderBy = 'buyers-suggestions', limit = 8, page = 1) {
        const whereClause = {};
        const orderClause = [];

        if (category !== 'all') {
            const categoryFound = await categoryRepo.findByName(category);
            whereClause.category_id = categoryFound.id;
        }

        switch (orderBy) {
            case 'buyers-suggestions':
                orderClause.push(['rate', 'DESC']);
                break;
            case 'most-visited':
                orderClause.push(['views', 'DESC']);
                break;
            case 'best-seller':
                orderClause.push(['sells', 'DESC']);
                break;
            case 'most-expensive':
                orderClause.push(['price', 'DESC']);
                break;
            case 'the-cheapest':
                orderClause.push(['price', 'ASC']);
                break;
            case 'newest':
                orderClause.push(['createdAt', 'DESC']);
                break;
        }

        const { count, rows } = await Product.findAndCountAll({
            where: whereClause,
            order: orderClause,
            limit,
            offset: (page - 1) * limit
        });

        if(rows.length === 0) return null;

        return {
            page,
            pages: Math.ceil(count / limit),
            products: rows.map(product => ({
                product_code: product.product_code,
                title: product.title,
                image: product.image,
                rate: product.rate,
                price_fa: product.price_fa
            }))
        };
    }

    async findProductsByTitleStartsWith(text) {
        const products = await Product.findAll({
            where: {
                title: {
                    [Op.startsWith] : text
                }
            }
        });

        if(products.length == 0) return null;

        return products.map(product => ({
            product_code: product.product_code,
            image: product.image,
            title: product.title,
            rate: product.rate,
            price_fa: product.price_fa
        }));
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
