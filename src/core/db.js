const { Sequelize } = require('sequelize');
const config = require('./config');
const { loadModels } = require('../sequelize/models');


const dataBase = new Sequelize({
    ...config.getDBConfig(),
    logging: false
});
const connectToDB = async () => {
    try {
        await dataBase.authenticate();
        loadModels(dataBase);
        await dataBase.sync({ force: false });
        console.log("THE APP connected to DB successfully!");
    } catch (e) {
        console.log("THE APP could'nt connect to DB and had a error : ", e);
    }
};

module.exports = { dataBase, connectToDB };