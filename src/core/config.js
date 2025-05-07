require('dotenv').config();
const Joi = require("joi");

const configValidation = Joi.object({
    app: Joi.object({
        port: Joi.number().required(),
        session_secret: Joi.string().required(),
        refresh_token_secret: Joi.string().required(),
        access_token_secret: Joi.string().required()
    }),
    db: Joi.object({
        username: Joi.string().required(),
        password: Joi.string().allow(''),
        database: Joi.string().required(),
        host: Joi.string().required(),
        dialect: Joi.string().required(),
        port: Joi.number().required(),
        pool: Joi.object({
            max: Joi.number().required(),
            min: Joi.number().required(),
            acquire: Joi.number().required(),
            idle: Joi.number().required()
        })
    })
});

module.exports = new (class {
    constructor() {
        this.config = {
            app: {
                port: process.env.APP_PORT,
                session_secret: process.env.SESSION_SECRET,
                refresh_token_secret: process.env.REFRESH_TOKEN_SECRET,
                access_token_secret: process.env.ACCESS_TOKEN_SECRET
            },
            db: {
                username: process.env.DB_USERNAME,
                password: process.env.DB_PASSWORD,
                database: process.env.DB_NAME,
                host: process.env.DB_HOST,
                dialect: process.env.DB_DIALECT,
                port: process.env.DB_PORT,
                pool: {
                    min: parseInt(process.env.DB_POOL_MIN),
                    max: parseInt(process.env.DB_POOL_MAX),
                    acquire: parseInt(process.env.DB_POOL_ACQUIRE),
                    idle: parseInt(process.env.DB_POOL_IDLE)
                }
            }
        };
        
        const  { error } = configValidation.validate(this.config);
        
        if(error)
            throw new Error(`Invalid Configuration: ${error}`);
    }

    getAppConfig() {
        return this.config.app;
    }
    
    getDBConfig() {
        return this.config.db;
    }

})();