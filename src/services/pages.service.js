const advertiseCardRepo = require("../repositories/advertiseCard.repository");
const questionRepo = require("../repositories/question.repository");
const websiteDataRepo = require("../repositories/websiteData.repository");
const supportCardRepo = require("../repositories/supportCard.repository");

const globalPageService = async () => {
    const footerDataFound = await websiteDataRepo.findFooterData();

    return {
        footerData: footerDataFound
    };
}

const homePageService = async () => {
    const advertiseCardsFound = await advertiseCardRepo.findAllAdvertiseCards();
    const questionsFound = await questionRepo.findAllQuestions();
    const globalData = await globalPageService();

    return {
        advertiseCards: advertiseCardsFound,
        questions: questionsFound,
        footerData: globalData.footerData
    };
};

const productPageService = async () => {
    const globalData = await globalPageService();

    return {
        footerData: globalData.footerData
    };
}

const productsPageService = async () => {
    const globalData = await globalPageService();

    return {
        footerData: globalData.footerData
    };
}

const cartPageService = async () => {
    const globalData = await globalPageService();

    return {
        footerData: globalData.footerData
    };
}

const favoritesPageService = async () => {
    const globalData = await globalPageService();

    return {
        footerData: globalData.footerData
    };
}

const aboutUsPageService = async () => {
    const globalData = await globalPageService();

    return {
        footerData: globalData.footerData
    };
}

const supportPageService = async () => {
    const globalData = await globalPageService();
    const supportCardsFound = await supportCardRepo.findAllSupportCards();
    return {
        supportCards: supportCardsFound,
        footerData: globalData.footerData
    };
}


module.exports = { 
    homePageService,
    productPageService,
    productsPageService,
    cartPageService,
    favoritesPageService,
    aboutUsPageService,
    supportPageService 
};