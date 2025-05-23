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
            },
            include: [
                {
                    model: this.UserModel,
                    as: 'user',
                    attributes: ['id', 'first_name', 'last_name']
                }
            ]
        });

        if(commentsOfProduct.length == 0) return null;

        return commentsOfProduct.map(commentOfProduct => ({
            id: commentOfProduct.id,
            commentText: commentOfProduct.commentText,
            positivePoints: commentOfProduct.positivePoints,
            negitivePoints: commentOfProduct.negitivePoints,
            rate: commentOfProduct.rate,
            user: commentOfProduct.user
        }));
    }

    async createComment(commentText, positivePoints, negetivePoints, rate, product_id, user_id) {
        const newComment = new this.ProductCommentModel({
            commentText: commentText,
            positivePoints: JSON.stringify(positivePoints),
            negetivePoints: JSON.stringify(negetivePoints),
            rate: rate,
            product_id: product_id,
            user_id: user_id
        });

        await newComment.save();
    }

    async hasUserCommentedBefore(user_id, product_id) {
        const commentFound = await this.ProductCommentModel.findOne({
            where: {
                user_id: user_id,
                product_id: product_id
            }
        });

        return commentFound ? true : false;
    }

})();