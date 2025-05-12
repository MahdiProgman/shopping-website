const { dataBase } = require('../core/db');
const SupportCardModel = require('../sequelize/models/supportCard.model');
const SupportCard = SupportCardModel(dataBase);

module.exports = new (class {
    async findAllSupportCards() {
        const supportCardsFound = await SupportCard.findAll();

        if(supportCardsFound.length == 0) return null;

        return supportCardsFound.map(supportCard => ({
            image: supportCard.image,
            title: supportCard.title,
            description: supportCard.description
        }));
    }
})();