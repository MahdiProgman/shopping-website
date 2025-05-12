const getHomePage = (req, res) => {
  res.render("index", {
    isLoggedInNow: req.flash('isLoggedInNow')[0] ?? false
  });
};

const getProductPage = (req, res) => {
  res.render("product");
}

const getProductsPage = (req, res) => {
  res.render("products");
};

const getCartPage = (req, res) => {
  res.render("cart");
};

const getFavoritesPage = (req, res) => {
  res.render("favorites");
};

const getAboutUsPage = (req, res) => {
  res.render("about-us");
};

const getSupportPage = (req, res) => {
  res.render("support");
};

module.exports = {
  getHomePage,
  getProductPage,
  getProductsPage,
  getCartPage,
  getFavoritesPage,
  getAboutUsPage,
  getSupportPage
};
