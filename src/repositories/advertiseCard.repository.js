const { models } = require("../core/db");

module.exports = new (class {
    constructor () {
        this.AdvertiseCard = models.AdvertiseCard;
    }

    async findAllAdvertiseCards() {
        const advertiseCards = await this.AdvertiseCard.findAll();

        if(advertiseCards.length < 0) return null;

        return advertiseCards.map(advertiseCard => ({
            title: advertiseCard.title,
            short_explanation: advertiseCard.short_explanation,
            image: advertiseCard.image
        }));
    }
})();