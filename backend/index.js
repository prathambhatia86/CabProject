const express = require('express');
const app = express();
const cookieParser = require("cookie-parser");
const path = require('path');
const loginController = require('./controllers/loginController');
const driverRegistrationController=require('./controllers/driverRegistrationController')
const db = require('./config/db');
const cors = require('cors');
db();
require('dotenv').config({ path: path.resolve(__dirname, "./config/config.env") });
app.use(express.json())
app.use(cors());

app.use(express.urlencoded({ extended: false }))
app.use(cookieParser());
app.use(express.static(path.join(__dirname,'public')))
app.post('/adminlogin', loginController.adminLogin);
app.post('/driverlogin', loginController.driverLogin);
app.post('/driverRegistration',driverRegistrationController.driverRegistration);
const port = 5000;
app.listen(port, () => console.log(`App backend listening on port : ${port}!`));