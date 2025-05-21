const advertiseCardRepo = require("../repositories/advertiseCard.repository");
const questionRepo = require("../repositories/question.repository");
const websiteDataRepo = require("../repositories/websiteData.repository");
const supportCardRepo = require("../repositories/supportCard.repository");
const featureCardRepo = require("../repositories/featureCard.repository");
const categoryRepo = require("../repositories/category.repository");
const productRepo = require("../repositories/product.repository");

const homePageService = async () => {
    const advertiseCardsFound = await advertiseCardRepo.findAllAdvertiseCards();
    const questionsFound = await questionRepo.findAllQuestions();
    const categoriesFound = await categoryRepo.findAllCategories();
    const bestSellProductsFound = await productRepo.findBestSellProducts();
    const mostVisitedProductsFound = await productRepo.findMostVisitedProducts();

    return {
        advertiseCards: advertiseCardsFound,
        bestSellProducts: bestSellProductsFound,
        categories: categoriesFound,
        mostVisitedProducts: mostVisitedProductsFound,
        questions: questionsFound
    };
};

const productPageService = async (product_code) => {
    const productFound = await productRepo.findByProductCode(product_code);

    if(!productFound) return null;

    const productsInThisCategoryFound = await productRepo.findAllProductsOfCategoryById(productFound.category_id);

    return {
        product: productFound,
        productsInThisCategory: productsInThisCategoryFound
    };
}

const searchResultsPageService = async (text) => {
    const productsFound = await productRepo.findProductsByTitleStartsWith(text);

    return {
        products: productsFound
    };
}

const productsPageService = async (category, orderBy, page) => {
    const categoriesFound = await categoryRepo.findAllCategories();
    const productsFound = await productRepo.findAllProducts(
        category ? category : 'all',
        orderBy ? orderBy : 'buyers-suggestions',
        8,
        page ? page : 1
    );

    return {
        categories: categoriesFound,
        products: productsFound
    };
}

const aboutUsPageService = async () => {
    const featureCardsFound = await featureCardRepo.findAllFeatureCards();
    const aboutUsTextFound = await websiteDataRepo.findByName('about-us-text');

    return {
        aboutUsText: aboutUsTextFound,
        featureCards: featureCardsFound
    };
}

const supportPageService = async () => {
    const supportCardsFound = await supportCardRepo.findAllSupportCards();
    const supportTextFound = await websiteDataRepo.findByName('support-text');

    return {
        supportCards: supportCardsFound,
        supportText: supportTextFound
    };
}


module.exports = { 
    homePageService,
    productPageService,
    productsPageService,
    aboutUsPageService,
    supportPageService ,
    searchResultsPageService
};