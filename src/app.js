const express = require("express");
const path = require("path");
const session = require('express-session');
const flash = require('connect-flash')
const config = require('./core/config');
const cookieParser = require("cookie-parser");
const authRouter = require("./routers/auth.router");
const pagesRouter = require('./routers/pages.router');
const userRouter = require('./routers/user.router');
const pagesController = require('./controllers/pages.controller');
const setHelpersMiddleware = require("./middlewares/setHelpers.middleware");
const setValidationDataMiddleware = require("./middlewares/setValidationData.middleware");

const app = express();

app.use(cookieParser(config.getAppConfig().cookie_secret));
app.use(session({
    secret: config.getAppConfig().session_secret,
    resave: false,
    saveUninitialized: true,
    cookie: {
        secure: false
    }
}));
app.use(flash());
app.use(express.static(path.join(__dirname, "..", "public")));
app.use(express.urlencoded({ extended: true }));

app.set("view engine", "ejs");

app.use(setHelpersMiddleware);
app.use(setValidationDataMiddleware);

app.use("/auth", authRouter);
app.use('/', pagesRouter);
app.use('/user', userRouter);

app.use(pagesController.getNotFoundPage);

module.exports = app;
