const { models } = require('../core/db');

module.exports = new (class {
    constructor () {
        this.UserSearch = models.UserSearch;
    }

    async findSearchesOfUserByUserId(user_id, limit = 6) {
        const searchesFound = await this.UserSearch.findAll({
            where: {
                user_id: user_id
            },
            order: [
                ['updatedAt', 'DESC']
            ],
            limit: limit
        });

        if(searchesFound.length == 0) return null;

        return searchesFound.map(search => ({
            query: search.query
        }));
    }

    async addNewSearch(user_id, query) {
        const searchFound = await this.UserSearch.findOne({
            where: {
                user_id: user_id,
                query: query
            }
        });

        if (searchFound) {
            await searchFound.update({
                count: searchFound.count + 1
            });
        } else {
            const newSearch = new this.UserSearch({
                user_id: user_id,
                query: query,
                count: 1
            });

            await newSearch.save();
        }
    }
})();