const advertiseCardRepo = require("../repositories/advertiseCard.repository");
const questionRepo = require("../repositories/question.repository");
const websiteDataRepo = require("../repositories/websiteData.repository");
const supportCardRepo = require("../repositories/supportCard.repository");
const featureCardRepo = require("../repositories/featureCard.repository");
const categoryRepo = require("../repositories/category.repository");
const productRepo = require("../repositories/product.repository");

const globalPageService = async () => {
    const footerDataFound = await websiteDataRepo.findFooterData();

    return {
        footerData: footerDataFound
    };
}

const homePageService = async () => {
    const advertiseCardsFound = await advertiseCardRepo.findAllAdvertiseCards();
    const questionsFound = await questionRepo.findAllQuestions();
    const categoriesFound = await categoryRepo.findAllCategories();
    const globalData = await globalPageService();
    const bestSellProductsFound = await productRepo.findBestSellProducts();
    const mostVisitedProductsFound = await productRepo.findMostVisitedProducts();

    return {
        advertiseCards: advertiseCardsFound,
        bestSellProducts: bestSellProductsFound,
        categories: categoriesFound,
        footerData: globalData.footerData,
        mostVisitedProducts: mostVisitedProductsFound,
        questions: questionsFound,
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
    const categoriesFound = await categoryRepo.findAllCategories();

    return {
        categories: categoriesFound,
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
    const featureCardsFound = await featureCardRepo.findAllFeatureCards();
    const aboutUsTextFound = await websiteDataRepo.findByName('about-us-text');

    return {
        aboutUsText: aboutUsTextFound,
        featureCards: featureCardsFound,
        footerData: globalData.footerData
    };
}

const supportPageService = async () => {
    const globalData = await globalPageService();
    const supportCardsFound = await supportCardRepo.findAllSupportCards();
    const supportTextFound = await websiteDataRepo.findByName('support-text');

    return {
        supportCards: supportCardsFound,
        supportText: supportTextFound,
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