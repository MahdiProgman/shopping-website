const UserModel = require('./user.model');
const ProductModel = require('./product.model');
const ProductCommentModel = require('./productComment.model');
const RefreshTokenModel = require('./refreshToken.model');
const CategoryModel = require('./category.model');
const QuestionModel = require('./question.model');
const AdvertiseCardModel = require('./advertiseCard.model');
const WebsiteDataModel = require('./websiteData.model');
const UserCartProductModel = require('./userCartProduct.model');

const loadModels = (sequelize) => {
    const User = UserModel(sequelize);
    const Product = ProductModel(sequelize);
    const ProductComment = ProductCommentModel(sequelize);
    const RefreshToken = RefreshTokenModel(sequelize);
    const Category = CategoryModel(sequelize);
    const Question = QuestionModel(sequelize);
    const AdvertiseCard = AdvertiseCardModel(sequelize);
    const WebsiteData = WebsiteDataModel(sequelize);
    const UserCartProduct = UserCartProductModel(sequelize);

    return {
        User,
        Product,
        ProductComment,
        RefreshToken,
        Category,
        Question,
        AdvertiseCard,
        WebsiteData,
        UserCartProduct
    };
};

module.exports = { loadModels };