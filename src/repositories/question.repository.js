const { dataBase } = require('../core/db');
const QuestionModel = require('../sequelize/models/question.model');
const Question = QuestionModel(dataBase);

module.exports = new (class {
    async findAllQuestions() {
        const questions = await Question.findAll();

        if(questions.length == 0) return null;

        return questions.map(question => ({
            question: question.question,
            answer: question.answer
        }));
    }
})();