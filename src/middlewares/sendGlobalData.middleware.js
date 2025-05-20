const websiteDataRepo = require("../repositories/websiteData.repository");

const globalPageService = async () => {
    const footerDataFound = await websiteDataRepo.findFooterData();

    return {
        footerData: footerDataFound
    };
};

module.exports = async (req, res, next) => {
    const globalData = await globalPageService();

    res.locals.login_state = req.login_state;
    res.locals.user = req.user ? req.user : null;
    res.locals.footerData = globalData.footerData;

    if(req.path == '/search') res.locals.text = req.query.q;
    else res.locals.text = '';

    return next();
}