const UserModel = require('./user.model');
const ProductModel = require('./product.model');

const loadModels = (sequelize) => {
    const User = UserModel(sequelize);
    const Product = ProductModel(sequelize);

    return {
        User,
        Product
    };
};

module.exports = { loadModels };