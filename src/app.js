const express = require("express");
const path = require("path");
const authRouter = require("./routers/auth.router");
const pagesRouter = require('./routers/pages.router');

const app = express();

app.use(express.static(path.join(__dirname, "..", "public")));
app.use(express.urlencoded({ extended: true }));

app.set("view engine", "ejs");

app.use('/', pagesRouter);
app.use("/auth", authRouter);

module.exports = app;
