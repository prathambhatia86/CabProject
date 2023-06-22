const express = require('express');
const app = express();
const cookieParser = require("cookie-parser");
const path = require('path');
const loginController = require('./controllers/loginController');
const driverRegistrationController = require('./controllers/driverRegistrationController')
const driverUpdationController = require('./controllers/driverUpdationController');
const cabAddController = require('./controllers/cabAddController');
const db = require('./config/db');
const fs=require("fs")
const cors = require('cors');
const logger = require('./logger')
const https=require('https');
const helmet=require("helmet")
db();
require('dotenv').config({ path: path.resolve(__dirname, "./config/config.env") });

//MiddleWares used
app.use(helmet());
app.use(express.json({ limit: "50mb" }))
app.use(cors());
app.use(express.urlencoded({ extended: false, limit: "50mb" }))
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')))

//Logical Controllers for requests.
app.post('/adminlogin', loginController.adminLogin);
app.post('/driverlogin', loginController.driverLogin);

app.post('/driverRegistration', driverRegistrationController.driverRegistration);
app.post('/checkDriverLogin', driverRegistrationController.checkLogin);
app.get('/driverNames', driverUpdationController.getNames);
app.post('/driverUpdate', driverUpdationController.driverUpdate);
app.delete('/deleteDriver', driverUpdationController.deleteDriver);

app.post('/addCab', cabAddController.addCab);
app.post('/checkCabExists', cabAddController.checkCabExists);
const key_path=path.join(__dirname,'config','key.pem');
const cert_path=path.join(__dirname,'config','cert.pem');
const port = 5000;
https.createServer({
    key:fs.readFileSync(key_path),
    cert:fs.readFileSync(cert_path),
  },app).listen(port,()=>{
    logger.info(`App backend listening on port : ${port}!`);
  })