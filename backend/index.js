const express = require('express');
const app = express();
const cookieParser = require("cookie-parser");
const path = require('path');
const loginController = require('./controllers/loginController');
const db = require('./config/db');
db();
require('dotenv').config({ path: path.resolve(__dirname, "./config/config.env") });
app.use(express.json())
app.use(function (req, res, next) {
    res.header('Access-Control-Allow-Origin', 'http://localhost:3001');
    res.header(
        'Access-Control-Allow-Headers',
        'Origin, X-Requested-With, Content-Type, Accept'
    );
    next();
});

app.use(express.urlencoded({ extended: false }))
app.use(cookieParser());

app.post('/adminlogin', loginController.adminLogin);

const port = 5000;
app.listen(port, () => console.log(`App backend listening on port : ${port}!`));