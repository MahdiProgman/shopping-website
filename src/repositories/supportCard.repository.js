const { models } = require("../core/db");

module.exports = new (class {
    constructor () {
        this.SupportCard = models.SupportCard;
    }
    
    async findAllSupportCards() {
        const supportCardsFound = await this.SupportCard.findAll();

        if(supportCardsFound.length == 0) return null;

        return supportCardsFound.map(supportCard => ({
            image: supportCard.image,
            title: supportCard.title,
            description: supportCard.description
        }));
    }
})();