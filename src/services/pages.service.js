const advertiseCardRepo = require("../repositories/advertiseCard.repository")

const homePageService = async () => {
    const advertiseCardsFound = await advertiseCardRepo.findAllAdvertiseCards();

    return {
        advertiseCards: advertiseCardsFound
    };
}

module.exports = { homePageService };