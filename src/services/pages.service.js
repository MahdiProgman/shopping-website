const advertiseCardRepo = require("../repositories/advertiseCard.repository");
const questionRepo = require("../repositories/question.repository");

const homePageService = async () => {
    const advertiseCardsFound = await advertiseCardRepo.findAllAdvertiseCards();
    const questionsFound = await questionRepo.findAllQuestions();

    return {
        advertiseCards: advertiseCardsFound,
        questions: questionsFound
    };
};

module.exports = { homePageService };