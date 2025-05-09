const { dataBase } = require('../core/db');
const UserModel = require('./../sequelize/models/user.model');
const User = UserModel(dataBase);

module.exports = new (class {
    async findByEmail(email, returnWithPassword = false) {
        const userFound = await User.findOne({
            where: {
                email: email
            }
        });

        return userFound ? returnWithPassword ? {
            id: userFound.id,
            email: userFound.email,
            first_name: userFound.first_name,
            last_name: userFound.last_name,
            password: userFound.password
        } : {
            id: userFound.id,
            email: userFound.email,
            first_name: userFound.first_name,
            last_name: userFound.last_name,
        } : null;
    }

    async findById(id, returnWithPassword = false) {
        const userFound = await User.findByPk(id);

        return userFound ? returnWithPassword ? {
            id: userFound.id,
            email: userFound.email,
            first_name: userFound.first_name,
            last_name: userFound.last_name,
            password: userFound.password
        } : {
            id: userFound.id,
            email: userFound.email,
            first_name: userFound.first_name,
            last_name: userFound.last_name,
        } : null; 
    }

    async createUser(email, first_name, last_name, password, returnWithPassword = false) {
        const newUser = await User.create({ 
            email: email,
            first_name: first_name,
            last_name: last_name,
            password: password
        });

        return returnWithPassword ? {
            id: newUser.id,
            email: newUser.email,
            first_name: newUser.first_name,
            last_name: newUser.last_name,
            password: newUser.password
        } : {
            id: newUser.id,
            email: newUser.email,
            first_name: newUser.first_name,
            last_name: newUser.last_name,
        };
    }
})();