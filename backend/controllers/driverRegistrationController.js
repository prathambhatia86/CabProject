const logger = require('../logger');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const driverCollection = require('../models/drivers.model');

const driverRegistration = async (req, res) => {
    //Insert the new Driver into the database
    logger.info('Recieved Driver Add request for driver ', { driverID: req.body.email, driverName: req.body.name });
    if (!req.userFromToken || !req.userFromToken.isAuth || req.userFromToken.email != 'ADMIN') {
        res.send(401).json({ message: "User Not authorised" });
    }
    try {
        {
            //Revalidating data recieved is in correct format
            let user = await driverCollection.findOne({ email: req.body.email });
            if (user) {
                return res.status(400).json({ error: 'Email already exists' });
            }
            //[TODO]Add all the other validations also.
        }
        const hashedPasswd = await bcrypt.hash(req.body.password, 10);
        req.body.password = hashedPasswd;
        const response = await driverCollection.insertMany(req.body);
        if (response.length > 0) res.send(true);
        else res.send(false);
    } catch (err) {
        logger.error("While adding the driver an error occured", { driverID: req.body.email, driverName: req.body.name, error: err });
        res.status(500).json({ error: "internal server error" });
    }
}
const checkLogin = async (req, res) => {
    if (!req.userFromToken || !req.userFromToken.isAuth || req.userFromToken.email != 'ADMIN') {
        res.send(401).json({ message: "User Not authorised" });
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
        logger.error("While Checking for duplicacy in driver an error occured", { driverID: req.body.email, driverName: req.body.name, error: err });
    }
}
module.exports = {
    driverRegistration,
    checkLogin,

}