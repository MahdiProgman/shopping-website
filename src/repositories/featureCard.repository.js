const { dataBase } = require('../core/db');
const FeatureCardModel = require('../sequelize/models/featureCard.model');
const FeatureCard = FeatureCardModel(dataBase);

module.exports = new (class {
    async findAllFeatureCards() {
        const featureCardsFound = await FeatureCard.findAll();

        if(featureCardsFound.length == 0) return null;

        return featureCardsFound.map(featureCard => ({
            image: featureCard.image,
            title: featureCard.title,
            description: featureCard.description
        }));
    }
})();