const { models } = require('../core/db');

module.exports = new (class {
    constructor () {
        this.User = models.User;
    }

    async findByEmail(email, returnWithPassword = false) {
        const userFound = await this.User.findOne({
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
        const userFound = await this.User.findByPk(id);

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
        const newUser = await this.User.create({ 
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