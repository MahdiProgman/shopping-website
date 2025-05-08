require('dotenv').config();
const express = require('express');
const path = require('path');
const app = express();

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: true }));

app.set('view engine', 'ejs');

app.get('/', (req, res) => {
    res.render('index');
});

const port = process.env.APP_PORT || 8080;

app.listen(port, ()=> {
    console.log(`THE APP is listen on port ${port}`);
});