const getRegisterPage = (req, res) => {
    res.render('register');
};

const getLoginPage = (req, res) => {
    res.render('login');
};

module.exports = { getRegisterPage, getLoginPage };