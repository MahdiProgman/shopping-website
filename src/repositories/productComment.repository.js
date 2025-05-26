const { dataBase } = require('../core/db');
const ProductCommentModel = require('../sequelize/models/productComment.model');
const ProductComment = ProductCommentModel(dataBase);

module.exports = new (class {
    async findAllCommentsOfProductByProductId(product_id) {
        const commentsOfProduct = await ProductComment.findAll({
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