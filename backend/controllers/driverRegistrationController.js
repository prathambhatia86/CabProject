const logger = require('../logger');
const bcrypt = require('bcrypt');
const driverCollection = require('../models/drivers.model');
const CURRENT_FILE = 'driverRegistrationController.js';

const driverRegistration = async (req, res) => {
    //Insert the new Driver into the database
    logger.info('Recieved Driver Add request for driver ', { driverID: req.body.email, driverName: req.body.name, fileName: CURRENT_FILE });
    if (!req.userFromToken || !req.userFromToken.isAuth || req.userFromToken.email != 'ADMIN') {
        res.status(401).json({ message: "User Not authorised" });
    }
    try {
        {
            //Revalidating data recieved is in correct format
            let user = await driverCollection.findOne({ email: req.body.email });
            if (user) {
                return res.status(400).json({ error: 'Email already exists' });
            }
            let email = req.body.email;
            let password = req.body.password;
            let contact = req.body.contact;
            let name = req.body.name;
            let ok = true;
            //Match the email regex.
            let pattern = /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/;
            if (!email.match(pattern)) ok = false;
            //Minimum password length is 6
            if (password.trim().length < 6) ok = false;
            //Name must have non-zero length
            if (name.trim().length == 0) ok = false;
            //Contact length must be 10 digits
            if (contact.trim().length != 10) ok = false;
            if (!ok) {
                return res.status(400).json({ error: 'Invalid Details' });
            }
        }
        const hashedPasswd = await bcrypt.hash(req.body.password, 10);
        req.body.password = hashedPasswd;
        const response = await driverCollection.insertMany(req.body);
        if (response.length > 0) res.send(true);
        else res.send(false);
    } catch (err) {
        res.status(500);
        logger.error("Encountered an error when adding a new Driver", { error: err, fileName: CURRENT_FILE });
    }
}
const checkLogin = async (req, res) => {
    if (!req.userFromToken || !req.userFromToken.isAuth || req.userFromToken.email != 'ADMIN') {
        res.status(401).json({ message: "User Not authorised" });
    }
    try {
        //Find if the document with same email id exists.
        let check = await driverCollection.findOne({ email: req.body.email })
        if (check == null)
            res.send(false);
        else
            res.send(true);
    } catch (err) {
        //If any error occurs log it.
        res.status(500);
        logger.error("Encountered an error when checking existence of driver", { error: err, fileName: CURRENT_FILE });
    }
}
module.exports = {
    driverRegistration,
    checkLogin,

}