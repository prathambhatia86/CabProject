const express = require('express');
const app = express();
const cookieParser = require("cookie-parser");
const path = require('path');
const loginController = require('./controllers/loginController');
const driverRegistrationController = require('./controllers/driverRegistrationController')
const driverUpdationController = require('./controllers/driverUpdationController');
const cabUpdationController = require('./controllers/cabUpdationController');
const AssignmentController = require('./controllers/AssignmentController');
const cabAddController = require('./controllers/cabAddController');
const db = require('./config/db');
const fs = require("fs");
const dumpMongo2Localfile = require('./backup.js');

const cors = require('cors');
require('dotenv').config({ path: path.resolve(__dirname, "./config/config.env") });
const logger = require('./logger')
const https = require('https');
const helmet = require("helmet");
const auth = require('./middlewares/auth');
db();

//cache for heavy requests.
const cache = require('./middlewares/cache');

//Create a backup every 2 days.
setInterval(() => {
    dumpMongo2Localfile();
}, 2 * 24 * 60 * 1000);


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

app.post('/driverRegistration', auth, driverRegistrationController.driverRegistration);
app.post('/checkDriverLogin', auth, driverRegistrationController.checkLogin);
app.get('/driverNames', [auth, cache(10)], driverUpdationController.getNames);
app.get('/driverNonAssignedNames', [auth, cache(10)], driverUpdationController.getNonAssignedNames);
app.post('/driverUpdate', auth, driverUpdationController.driverUpdate);
app.post('/changePassword', auth, driverUpdationController.changePassword);
app.delete('/deleteDriver', auth, driverUpdationController.deleteDriver);

app.post('/addCab', auth, cabAddController.addCab);
app.post('/checkCabExists', auth, cabAddController.checkCabExists);
app.get('/cabNames', [auth, cache(10)], cabUpdationController.getNames);
app.get('/cabNonAssignedNames', [auth, cache(10)], cabUpdationController.getNonAssignedNames);
app.post('/getCab', auth, cabUpdationController.getCab);
app.get('/cabDataWithoutImages', [auth, cache(10)], cabUpdationController.getCabDataWithoutImages);
app.get('/cabDataForDeletion', [auth, cache(10)], cabUpdationController.cabDataForDeletion);
app.post('/updateCab', [auth, cache(10)], cabUpdationController.updateCab);
app.post('/deleteCab', [auth, cache(10)], cabUpdationController.deleteCab);
app.post('/checkCabAssigned', auth, AssignmentController.checkCabAssigned);
app.post('/checkDriverAssigned', auth, AssignmentController.checkDriverAssigned);
app.post('/assignCab', auth, AssignmentController.assignCab);
app.post('/assignDriver', auth, AssignmentController.assignDriver);
app.post('/getAssignedCab', auth, AssignmentController.getAssignedCab);
app.post('/getAssignedDriver', auth, AssignmentController.getAssignedDriver);
app.post('/deassignCab', auth, AssignmentController.deassignCab);


const key_path = path.join(__dirname, 'config', 'key.pem');
const cert_path = path.join(__dirname, 'config', 'cert.pem');
const port = 5000;
const test_port = 8000;
const server = https.createServer({
    key: fs.readFileSync(key_path),
    cert: fs.readFileSync(cert_path),
}, app).listen(port, () => {
    logger.info(`App backend listening on port : ${port}!`);
})
const server_test = app.listen(test_port);
module.exports = {
    server_test
}