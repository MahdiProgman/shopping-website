const { models } = require("../core/db");

module.exports = new (class {
    constructor () {
        this.FeatureCard = models.FeatureCard;
    }
    async findAllFeatureCards() {
        const featureCardsFound = await this.FeatureCard.findAll();

        if(featureCardsFound.length == 0) return null;

        return featureCardsFound.map(featureCard => ({
            image: featureCard.image,
            title: featureCard.title,
            description: featureCard.description
        }));
    }
})();