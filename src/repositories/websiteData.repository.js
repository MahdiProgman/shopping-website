const { Op } = require('sequelize');
const { dataBase } = require('../core/db');
const WebsiteDataModel = require('../sequelize/models/websiteData.model');
const WebsiteData = WebsiteDataModel(dataBase);

module.exports = new (class {
    async findFooterData() {
        const result = await WebsiteData.findAll({
            where: {
                name: {
                    [Op.in]: ['brand_slogan', 'footer_text', 'phone_number']
                }
            }
        });

        if(result.length == 0) return null;

        return result.map(footerData => ({
            name: footerData.name,
            value: footerData.value
        }));
    }

    async findByName(name) {
        const result = await WebsiteData.findOne({
            where: {
                name: name
            }
        });

        return result ? {
            name: result.name,
            value: result.value
        } : null;
    }
})();