const userSearchRepo = require("../repositories/userSearch.repository");
const websiteDataRepo = require("../repositories/websiteData.repository");

const globalPageService = async (user_id) => {
    const footerDataFound = await websiteDataRepo.findFooterData();

    if(user_id) {
        const recentSearchesFound = await userSearchRepo.findSearchesOfUserByUserId(user_id);

        return {
            footerData: footerDataFound,
            recentSearches: recentSearchesFound
        };
    }

    return {
        footerData: footerDataFound,
        recentSearches: null
    };
};

module.exports = async (req, res, next) => {
    const globalData = await globalPageService(req.user ? req.user.id : null);

    res.locals.login_state = req.login_state;
    res.locals.user = req.user ? req.user : null;
    res.locals.footerData = globalData.footerData;
    res.locals.recentSearches = globalData.recentSearches;

    if(req.path == '/search') res.locals.text = req.query.q;
    else res.locals.text = '';

    return next();
}