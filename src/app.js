const express = require("express");
const path = require("path");
const session = require('express-session');
const flash = require('connect-flash')
const config = require('./core/config');
const cookieParser = require("cookie-parser");
const authRouter = require("./routers/auth.router");
const pagesRouter = require('./routers/pages.router');
const setHelpersMiddleware = require("./middlewares/setHelpers.middleware");

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

app.use('/', pagesRouter);
app.use("/auth", authRouter);

module.exports = app;
