const { check } = require("express-validator");
const categoryRepo = require("../repositories/category.repository");

module.exports = new (class {
    productsPageValidation() {
        return [
            check('category').optional().custom(async category => {
                if(category != 'all') {
                    const categoryFound = await categoryRepo.findByName(category);

                    if(!categoryFound) {
                        throw new Error();
                    }
    
                    return true;
                }

                return true;
            }),
            check('orderBy').optional().isIn(['most-visited', 'best-seller', 'newest', 'most-expensive', 'the-cheapest', 'buyers-suggestions']),
            check('page').optional().isNumeric()
        ];
    }
    commentValidation() {
        return [
            check('comment_text').not().isEmpty().withMessage('متن نظر نباید خالی باشد'),
            check('comment_text').isLength({ min: 10, max: 300 }).withMessage('طول متن نظر باید بین ۱۰ تا ۳۰۰ کاراکتر باشد'),
            check('rate').not().not().isEmpty().withMessage('امتیاز نباید خالی باشد'),
            check('rate').isIn(['1', '2', '3', '4', '5']).withMessage('امتیاز باید بین ۱ تا ۵ باشد'),
        ];
    }
})();