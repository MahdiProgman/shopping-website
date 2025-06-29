const { models } = require("../core/db");

module.exports = new (class {
    constructor () {
        this.Category = models.Category;
    }

    async findAllCategories() {
        const categoriesFound = await this.Category.findAll();

        if(categoriesFound.length == 0) return null;

        return categoriesFound.map(category => ({
            name: category.name,
            name_fa: category.name_fa,
            short_explanation: category.short_explanation,
            boxColor: category.boxColor,
            image: category.image
        }));
    }

    async findByName(categoryName) {
        const category = await this.Category.findOne({
            where: {
                name: categoryName
            }
        });

        return category ? {
            id: category.id,
            name: category.name,
            name_fa: category.name_fa,
            short_explanation: category.short_explanation,
            boxColor: category.boxColor,
            image: category.image
        } : null;
    }

    async findById(category_id) {
        const category = await this.Category.findOne({
            where: {
                id: category_id
            }
        });

        return category ? {
            id: category.id,
            name: category.name,
            name_fa: category.name_fa,
            short_explanation: category.short_explanation,
            boxColor: category.boxColor,
            image: category.image
        } : null;
    }
})();