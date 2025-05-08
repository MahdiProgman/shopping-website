const UserModel = require('./user.model');
const ProductModel = require('./product.model');
const ProductCommentModel = require('./productComment.model');
const RefreshTokenModel = require('./refreshToken.model');
const CategoryModel = require('./category.model');
const QuestionModel = require('./question.model');
const AdvertiseCardModel = require('./advertiseCard.model');
const WebsiteDataModel = require('./websiteData.model');
const UserCartProductModel = require('./userCartProduct.model');

const loadModels = async (sequelize) => {
    const User = UserModel(sequelize);
    const Product = ProductModel(sequelize);
    const ProductComment = ProductCommentModel(sequelize);
    const RefreshToken = RefreshTokenModel(sequelize);
    const Category = CategoryModel(sequelize);
    const Question = QuestionModel(sequelize);
    const AdvertiseCard = AdvertiseCardModel(sequelize);
    const WebsiteData = WebsiteDataModel(sequelize);
    const UserCartProduct = UserCartProductModel(sequelize);

    await Product.hasMany(ProductComment, {
        foreignKey: 'product_id',
        as: 'productComments'
    });
    await ProductComment.belongsTo(Product, {
        foreignKey: 'product_id',
        as: 'product'
    });

    await User.hasOne(RefreshToken, {
        foreignKey: 'user_id',
        as: 'refreshToken'
    });
    await RefreshToken.belongsTo(User, {
        foreignKey: 'user_id',
        as: 'user'
    });

    await Category.hasMany(Product, {
        foreignKey: 'category_id',
        as: 'products'
    });
    await Product.belongsTo(Category, {
        foreignKey: 'category_id',
        as: 'category'
    });

    await User.hasMany(UserCartProduct, {
        foreignKey: 'user_id',
        as: 'userCartProducts'
    });
    await UserCartProduct.belongsTo(User, {
        foreignKey: 'user_id',
        as: 'user'
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
        UserCartProduct
    };
};

module.exports = { loadModels };