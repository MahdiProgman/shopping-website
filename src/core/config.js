require('dotenv').config();
const Joi = require("joi");

const configValidation = Joi.object({
    app: Joi.object({
        port: Joi.number().required()
    }),
});

module.exports = new (class {
    constructor() {
        this.config = {
            app: {
                port: process.env.APP_PORT,
            }
        };
        
        const  { error } = configValidation.validate(this.config);
        
        if(error)
            throw new Error(`Invalid Configuration: ${error}`);
    }

    getAppConfig() {
        return this.config.app;
    }

})();