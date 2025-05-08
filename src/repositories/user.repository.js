const { dataBase } = require('../core/db');
const UserModel = require('./../sequelize/models/user.model');
const User = UserModel(dataBase);

module.exports = new (class {
    async findByEmail(email) {
        const userFound = await User.findOne({
            where: {
                email: email
            }
        });

        return userFound;
    }

    async findById(id) {
        const userFound = await User.findByPk(id);

        return userFound;
    }

    async createUser(email, first_name, last_name, password) {
        const newUser = await User.create({ 
            email: email,
            first_name: first_name,
            last_name: last_name,
            password: password
        });

        return {
            id: newUser.id,
            email: newUser.email,
            first_name: newUser.first_name,
            last_name: newUser.last_name
        };
    }
})();