const logger = require('../logger');
const driverCollection = require('../models/drivers.model');
const getNames = async (req, res) => {
    if (!req.userFromToken || !req.userFromToken.isAuth || req.userFromToken.email != 'ADMIN') {
        res.send(401).json({ message: "User Not authorised" });
    }
    try {
        //Fetch all documents from the database
        const data = await driverCollection.find({});
        res.json(data);
    } catch (err) {
        logger.error('Error when getting Names for Updating driver', { error: err });
    }
}

const driverUpdate = async (req, res) => {
    //Here both admin and the driver with that Email will be allowed to make a change to the data.
    if (!req.userFromToken || !req.userFromToken.isAuth || (req.userFromToken.email != 'ADMIN' && req.userFromToken.email != req.body.email)) {
        res.send(401).json({ message: "User Not authorised" });
    }
    try {
        if (req.userFromToken.email == 'ADMIN') {
            //Select document with specific id, update it to details recieved in the request.
            const filter = { _id: req.body.id };
            const update = { $set: req.body };
            const response = await driverCollection.updateOne(filter, update);
            res.send(response);
        } else {
            //Here the driver is only allowed to make a limited number of changes so we will only allow those changes.
            const filter = { _id: req.body.id };
            const whatToSet = {
                name: req.body.name,
                contact: req.body.contact
            }
            const update = { $set: whatToSet };
            const response = await driverCollection.updateOne(filter, update);
            res.send(response);
        }
    } catch (err) {
        logger.error('When updating driver with email: ' + req.body.email + ' by user: ' + req.userFromToken.email + ' Some error was encountered', { error: err });
    }
}

const deleteDriver = async (req, res) => {
    if (!req.userFromToken || !req.userFromToken.isAuth || (req.userFromToken.email != 'ADMIN')) {
        res.send(401).json({ message: "User Not authorised" });
    }
    try {
        //Select document with specific id, delete it from the database
        const filter = { _id: req.body.id };
        const data = await driverCollection.deleteOne(filter);
        //If the document was deleted send back status OK else if no deletion occured send no resource found
        res.status(data ? 200 : 404).json({
            message: data.deletedCount ? "User deleted" : "User Not found",
        });
    } catch (e) {
        //Log the error
        logger.error('Deleting driver ' + req.body.email + ' failed due to error', { error: e });
        //Send internal server error code  and message in case of any error.
        res.status(500).json({
            result: e.toString(),
        });
    }
}
module.exports = {
    getNames,
    driverUpdate,
    deleteDriver
}
