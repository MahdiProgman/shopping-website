const { Op } = require('sequelize');
const { models } = require('../core/db');

module.exports = new (class {
    constructor () {
        this.WebsiteData = models.WebsiteData;
    }
    async findFooterData() {
        const result = await this.WebsiteData.findAll({
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
        const result = await this.WebsiteData.findOne({
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