const { models } = require('../core/db');

module.exports = new (class {
    constructor () {
        this.Favorite = models.Favorite;
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
})();