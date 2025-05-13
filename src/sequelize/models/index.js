const UserModel = require('./user.model');

const loadModels = (sequelize) => {
    const User = UserModel(sequelize);
    
    return {
        User
    };
};

module.exports = { loadModels };