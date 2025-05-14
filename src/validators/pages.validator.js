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
})();