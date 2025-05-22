const UserModel = require('./user.model');
const ProductModel = require('./product.model');
const ProductCommentModel = require('./productComment.model');
const RefreshTokenModel = require('./refreshToken.model');
const CategoryModel = require('./category.model');
const QuestionModel = require('./question.model');
const AdvertiseCardModel = require('./advertiseCard.model');
const WebsiteDataModel = require('./websiteData.model');
const UserCartProductModel = require('./userCartProduct.model');
const FeatureCardModel = require('./featureCard.model');
const SupportCardModel = require('./supportCard.model');

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
    const FeatureCard = FeatureCardModel(sequelize);
    const SupportCard = SupportCardModel(sequelize);

    Product.hasMany(ProductComment, {
        foreignKey: 'product_id',
        as: 'productComments'
    });
    ProductComment.belongsTo(Product, {
        foreignKey: 'product_id',
        as: 'product'
    });

    User.hasOne(RefreshToken, {
        foreignKey: 'user_id',
        as: 'refreshToken'
    });
    RefreshToken.belongsTo(User, {
        foreignKey: 'user_id',
        as: 'user'
    });

    Category.hasMany(Product, {
        foreignKey: 'category_id',
        as: 'products'
    });
    Product.belongsTo(Category, {
        foreignKey: 'category_id',
        as: 'category'
    });

    User.hasMany(UserCartProduct, {
        foreignKey: 'user_id',
        as: 'userCartProducts'
    });
    UserCartProduct.belongsTo(User, {
        foreignKey: 'user_id',
        as: 'user'
    });

    Product.hasMany(UserCartProduct, {
        foreignKey: 'product_id',
        as: 'userCartProducts'
    });
    UserCartProduct.belongsTo(Product, {
        foreignKey: 'product_id',
        as: 'product'
    });

    return {
        User,
        Product,
        ProductComment,
        RefreshToken,
        Category,
        Question,
        AdvertiseCard,
        WebsiteData,
        UserCartProduct,
        FeatureCard,
        SupportCard
    };
};

module.exports = { loadModels };