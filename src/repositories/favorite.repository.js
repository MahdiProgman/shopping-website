const { models } = require('../core/db');

module.exports = new (class {
    constructor () {
        this.Favorite = models.Favorite;
        this.Product = models.Product;
    }

    async addToFavorites(user_id, product_id) {
        const newFavorite = new this.Favorite({
            user_id: user_id,
            product_id: product_id
        });

        await newFavorite.save();
    }

    async removeFromFavorites(user_id, product_id) {
        await this.Favorite.destroy({
            where: {
                user_id: user_id,
                product_id: product_id
            }
        });
    }

    async isProductInFavorites(user_id, product_id) {
        const favoriteFound = await this.Favorite.findOne({
            where: {
                user_id: user_id,
                product_id: product_id
            }
        });

        return favoriteFound ? true : false;
    }

    async getCountOfFavoritesInAccount(user_id) {
        const count = await this.Favorite.count({
            where: {
                user_id: user_id
            }
        });

        return count;
    }

    async findAllFavoritesOfUserByUserId(user_id) {
        const favorites = await this.Favorite.findAll({
            where: {
                user_id: user_id
            },
            include: [
                {
                    model: this.Product,
                    as: 'product',
                    attributes: ['product_code', 'image', 'title', 'rate', 'price_fa']
                }
            ]
        });

        if(favorites.length == 0) return null;

        return favorites.map(favorite => ({
            product_code: favorite.product.product_code,
            image: favorite.product.image,
            title: favorite.product.title,
            rate: favorite.product.rate,
            price_fa: favorite.product.price_fa
        }));
    }
})();