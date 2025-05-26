const advertiseCardRepo = require("../repositories/advertiseCard.repository");
const questionRepo = require("../repositories/question.repository");
const websiteDataRepo = require("../repositories/websiteData.repository");
const supportCardRepo = require("../repositories/supportCard.repository");
const featureCardRepo = require("../repositories/featureCard.repository");
const categoryRepo = require("../repositories/category.repository");
const productRepo = require("../repositories/product.repository");
const productCommentRepo = require("../repositories/productComment.repository");
const userCartProductRepo = require("../repositories/userCartProduct.repository");

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

const productPageService = async (product_code, user_id = null) => {
    const productFound = await productRepo.findByProductCode(product_code);

    if(!productFound) return null;

    const productsInThisCategoryFound = await productRepo.findAllProductsOfCategoryById(productFound.category_id);

    if(user_id) {
        const isUserCommentedBefore = await productCommentRepo.hasUserCommentedBefore(user_id, productFound.id);
        const isProductInCart = await userCartProductRepo.isProductInCart(user_id, productFound.id);

        return {
            product: productFound,
            productsInThisCategory: productsInThisCategoryFound,
            isUserCommentedBefore: isUserCommentedBefore,
            isProductInCart: isProductInCart
        };
    }

    return {
        product: productFound,
        productsInThisCategory: productsInThisCategoryFound,
        isUserCommentedBefore: false,
        isProductInCart: false
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

const addCommentActionService = async (commentText, positivePoints, negetivePoints, rate, productCode, user_id) => {
    const productFound = await productRepo.findByProductCode(productCode);
    if(!productFound) return 'PRODUCT_NOT_FOUND';
    
    const isCommentUnique = !(await productCommentRepo.hasUserCommentedBefore(user_id, productFound.id));

    if(!isCommentUnique) return 'USER_COMMENTED_BEFORE';

    await productCommentRepo.createComment(commentText, positivePoints, negetivePoints, rate, productFound.id, user_id);
    await productRepo.updateRateOfProductByProductCode(productCode);
}

const addToCartActionService = async (user_id, product_code) => {
    const productFound = await productRepo.findByProductCode(product_code);

    if(!productFound) return 'PRODUCT_IS_NOT_EXISTS';

    const isProductInCart = await userCartProductRepo.isProductInCart(user_id, productFound.id);

    if(isProductInCart) return 'PRODUCT_IS_EXISTS_IN_CART';

    await userCartProductRepo.addToCart(user_id, productFound.id);
}

const removeFromCartActionService = async (user_id, product_code) => {
    const productFound = await productRepo.findByProductCode(product_code);
    const isProductInCart = await userCartProductRepo.isProductInCart(user_id, productFound.id);

    if(!isProductInCart) return 'PRODUCT_IS_NOT_EXISTS_IN_CART';

    await userCartProductRepo.removeFromCart(user_id, productFound.id);
}

module.exports = { 
    homePageService,
    productPageService,
    productsPageService,
    aboutUsPageService,
    supportPageService,
    searchResultsPageService,
    addCommentActionService,
    addToCartActionService,
    removeFromCartActionService
};