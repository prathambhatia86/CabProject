const logger = require('../logger');
const Assignment_collection = require('../models/assignment.model');
const driverCollection = require('../models/drivers.model');
const bcrypt = require('bcrypt');
const CURRENT_FILE = 'driverUpdationController.js';

const getNames = async (req, res) => {
    if (!req.userFromToken || !req.userFromToken.isAuth || req.userFromToken.email != 'ADMIN') {
        res.status(401).json({ message: "User Not authorised" });
    }
    try {
        //Fetch all documents from the database
        const data = await driverCollection.find({});
       
        res.json(data);
    } catch (err) {
        res.status(500);
        logger.error("Encountered an error when retrieving all driver names", { error: err, fileName: CURRENT_FILE });
    }
}

const driverUpdate = async (req, res) => {
    //Here both admin and the driver with that Email will be allowed to make a change to the data.
    if (!req.userFromToken || !req.userFromToken.isAuth || (req.userFromToken.email != 'ADMIN' && req.userFromToken.email != req.body.email)) {
        res.status(401).json({ message: "User Not authorised" });
        return;
    }
    try {
        if (req.userFromToken.email == 'ADMIN') {
            //Select document with specific id, update it to details recieved in the request.
            const filter = { _id: req.body.id };
            const update = { $set: req.body };
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
                return res.status(400).json({ error: 'Invalid Update' });
            }
            const response = await driverCollection.updateOne(filter, update);
            res.send(response);
        } else {
            //Here the driver is only allowed to make a limited number of changes so we will only allow those changes.
            const filter = { email: req.body.email };
            const whatToSet = {
                name: req.body.name,
                contact: req.body.contact
            }
            const update = { $set: whatToSet };
            let contact = req.body.contact;
            let name = req.body.name;
            let ok = true;
            //Name must have non-zero length
            if (name.trim().length == 0) ok = false;
            //Contact length must be 10 digits
            if (contact.trim().length != 10) ok = false;
            if (!ok) {
                return res.status(400).json({ error: 'Invalid Update' });
            }
            const response = await driverCollection.updateOne(filter, update);
            res.send(response);
        }
    } catch (err) {
        res.status(500);
        logger.error("Encountered an error when updating the driver " + req.body.email, { error: err, fileName: CURRENT_FILE });
    }
}

const deleteDriver = async (req, res) => {
    if (!req.userFromToken || !req.userFromToken.isAuth || (req.userFromToken.email != 'ADMIN')) {
        res.status(401).json({ message: "User Not authorised" });
    }
    try {
        //Select document with specific id, delete it from the database
        const filter = { _id: req.body.id };
        let data = await Assignment_collection.deleteOne({ email: req.body.email });
        if (!data) res.status(404).json({
            message: "Unable to delete now",
        });
        data = await driverCollection.deleteOne(filter);
        //If the document was deleted send back status OK else if no deletion occured send no resource found
        res.status(data ? 200 : 404).json({
            message: data.deletedCount ? "User deleted" : "User Not found",
        });
    } catch (e) {
        //Log the error
        logger.error('Deleting driver ' + req.body.email + ' failed due to error', { error: e, fileName: CURRENT_FILE });
        //Send internal server error code  and message in case of any error.
        res.status(500).json({
            result: e.toString(),
        });
    }
}

const getNonAssignedNames = async (req, res) => {
    if (!req.userFromToken || !req.userFromToken.isAuth || req.userFromToken.email != 'ADMIN') {
        res.status(401).json({ message: "User Not authorised" });
    }
    try {
        //Fetch all documents from the database
        const assigned = (await Assignment_collection.find({})).map(a => { return a.email });
        const data = await driverCollection.find({ email: { $nin: assigned } });
        res.json(data);
    } catch (err) {
        res.status(500);
        logger.error("Encountered an error when retrieving all non assigned driver names", { error: err, fileName: CURRENT_FILE });
    }
}

const changePassword = async (req, res) => {
    //Only allow driver to do this update
    if (!req.userFromToken || !req.userFromToken.isAuth || req.userFromToken.email != req.body.email) {
        res.status(401).json({ message: "User Not authorised" });
        return;
    }
    try {
        //Here the driver is only allowed to make a limited number of changes so we will only allow those changes.
        const filter = { email: req.body.email };
        //Check password matches format
        if (req.body.new.trim().length < 6) {
            res.status(401).json({ message: "Password Too Small" });
            return;
        }
        //Confirm old password is correct.
        const data = await driverCollection.findOne({ email: req.body.email });
        const isMatch = await bcrypt.compare(req.body.old, data.password);
        if (!isMatch) {
            res.status(401).json({ message: "User Not authorised" });
            return;
        }
        //Create new hashed password
        const hashedPasswd = await bcrypt.hash(req.body.new, 10);
        const whatToSet = {
            password: hashedPasswd
        }
        const update = { $set: whatToSet };
        const response = await driverCollection.updateOne(filter, update);
        res.send(response);

    } catch (err) {
        res.status(500);
        logger.error("Encountered an error when updating the password of driver driver " + req.body.email, { error: err, fileName: CURRENT_FILE });
    }
}

module.exports = {
    getNames,
    driverUpdate,
    deleteDriver,
    getNonAssignedNames,
    changePassword
}
