const { dataBase } = require('../core/db');
const AdvertiseCardModel = require('../sequelize/models/advertiseCard.model');
const AdvertiseCard = AdvertiseCardModel(dataBase);

module.exports = new (class {
    async findAllAdvertiseCards() {
        const advertiseCards = await AdvertiseCard.findAll();

        if(advertiseCards.length < 0) return null;

        return advertiseCards.map(advertiseCard => ({
            title: advertiseCard.title,
            short_explanation: advertiseCard.short_explanation,
            image: advertiseCard.image
        }));
    }
})();