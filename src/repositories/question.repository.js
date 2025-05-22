const { models } = require('../core/db');
module.exports = new (class {
    constructor () {
        this.Question = models.Question;
    }

    async findAllQuestions() {
        const questions = await this.Question.findAll();

        if(questions.length == 0) return null;

        return questions.map(question => ({
            question: question.question,
            answer: question.answer
        }));
    }
})();