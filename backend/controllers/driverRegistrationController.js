const logger = require('../logger')
const driverCollection = require('../models/drivers.model');

const driverRegistration = async (req, res) => {
    //Insert the new Driver into the database
    logger.info('Recieved Driver Add request for driver ', { driverID: req.body.email, driverName: req.body.name });
    try {
        const response = await driverCollection.insertMany(req.body);
        res.send(response);
    } catch (err) {
        logger.error("While adding the driver an error occured", { driverID: req.body.email, driverName: req.body.name, error: err });
    }
}
const checkLogin = async (req, res) => {
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