const { models } = require('../core/db');

module.exports = new (class {
    constructor () {
        this.ProductCommentModel = models.ProductComment;
        this.UserModel = models.User;
    }

    async findAllCommentsOfProductByProductId(product_id) {
        const commentsOfProduct = await this.ProductCommentModel.findAll({
            where: {
                product_id: product_id
            }
        });

        if(commentsOfProduct.length == 0) return null;

        return commentsOfProduct.map(commentOfProduct => ({
            id: commentOfProduct.id,
            commentText: commentOfProduct.commentText,
            positivePoints: commentOfProduct.positivePoints,
            negitivePoints: commentOfProduct.negitivePoints,
            rate: commentOfProduct.rate
        }));
    }
})();