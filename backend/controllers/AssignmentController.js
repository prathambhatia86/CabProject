const logger = require('../logger')
const Assignment_collection = require('../models/assignment.model');
const Cab_collection = require('../models/cabs.model');
const Driver_collection = require('../models/drivers.model');
const CURRENT_FILE = 'AssignmentController.js';

const checkCabAssigned = async (req, res) => {
    if (!req.userFromToken || !req.userFromToken.isAuth || (req.userFromToken.email != 'ADMIN' && req.body.email != req.userFromToken.email)) {
        res.status(401).json({ message: "User Not authorised" });
        return;
    }
    try {
        let check = await Assignment_collection.findOne({ email: req.body.email });
        if (check)
            res.send(true);
        else
            res.send(false);
    } catch (err) {
        res.status(500);
        logger.error("Encountered an error when checking for assigned cab to the driver " + req.body.email, { error: err, fileName: CURRENT_FILE });
    }
}

const assignCab = async (req, res) => {
    if (!req.userFromToken || !req.userFromToken.isAuth || req.userFromToken.email != 'ADMIN') {
        res.status(401).json({ message: "User Not authorised" });
        return;
    }
    try {
        //If any other cab is already assigned, delete it and do the current assignment.
        let deletePrevious = await Assignment_collection.deleteOne({ email: req.body.email });
        let check = await Assignment_collection.insertMany({ email: req.body.email, registration_no: req.body.registration_no });
        if (check == null)
            res.send(false);
        else
            res.send(true);
    } catch (err) {
        res.status(500);
        logger.error("Encountered an error when assigning the cab " + req.body.registration_no + " to the driver " + req.body.email, { error: err, fileName: CURRENT_FILE });
    }
}

const getAssignedCab = async (req, res) => {
    if (!req.userFromToken || !req.userFromToken.isAuth || (req.userFromToken.email != 'ADMIN' && req.body.email != req.userFromToken.email)) {
        res.status(401).json({ message: "User Not authorised" });
        return;
    }
    try {
        //Retrieved the assigned cab from assignments collection and then retrieve its data.
        let check = await Assignment_collection.findOne({ email: req.body.email });
        if (check) {
            let cabAssigned = await Cab_collection.findOne({ registration_no: check.registration_no });
            res.status(200).json(cabAssigned);
            return;
        }
        res.status(401).json({ message: "No cab assigned" });
        return;
    } catch (err) {
        res.status(500);
        logger.error("Encountered an error when retrieving assigned cab to the driver " + req.body.email, { error: err, fileName: CURRENT_FILE });
    }
}
const deassignCab = async (req, res) => {
    if (!req.userFromToken || !req.userFromToken.isAuth || req.userFromToken.email != 'ADMIN') {
        res.status(401).json({ message: "User Not authorised" });
        return;
    }
    try {
        //Delete the assignment key-value pair from the assignment collection
        let check = await Assignment_collection.deleteOne({ email: req.body.email, registration_no: req.body.registration_no });
        if (check) res.send(true);
        else res.send(false);
    } catch (err) {
        res.status(500);
        logger.error("Encountered an error when deassigning cab for the driver " + req.body.email, { error: err, fileName: CURRENT_FILE });
    }

}


const checkDriverAssigned = async (req, res) => {
    if (!req.userFromToken || !req.userFromToken.isAuth || req.userFromToken.email != 'ADMIN') {
        res.status(401).json({ message: "User Not authorised" });
        return;
    }
    try {
        let check = await Assignment_collection.findOne({ registration_no: req.body.registration_no });
        if (check)
            res.send(true);
        else
            res.send(false);
    } catch (err) {
        res.status(500);
        logger.error("Encountered an error when checking for assigned driver to the cab " + req.body.registration_no, { error: err, fileName: CURRENT_FILE });
    }
}

const getAssignedDriver = async (req, res) => {
    if (!req.userFromToken || !req.userFromToken.isAuth || req.userFromToken.email != 'ADMIN') {
        res.send(401).json({ message: "User Not authorised" });
        return;
    }
    try {
        let check = await Assignment_collection.findOne({ registration_no: req.body.registration_no });
        if (check) {
            let driverAssigned = await Driver_collection.findOne({ email: check.email });
            res.status(200).json(driverAssigned);
            return;
        }
        res.status(401).json({ message: "No driver assigned" });
        return;
    } catch (err) {
        res.status(500);
        logger.error("Encountered an error when getting assigned driver for the cab " + req.body.email, { error: err, fileName: CURRENT_FILE });
    }
}

const assignDriver = async (req, res) => {
    if (!req.userFromToken || !req.userFromToken.isAuth || req.userFromToken.email != 'ADMIN') {
        res.send(401).json({ message: "User Not authorised" });
        return;
    }
    try {
        //Delete previous assignment before doing the new assignment.
        let deletePrevious = await Assignment_collection.deleteOne({ registration_no: req.body.registration_no });
        let check = await Assignment_collection.insertMany({ email: req.body.email, registration_no: req.body.registration_no });
        if (check == null)
            res.send(false);
        else
            res.send(true);
    } catch (err) {
        res.status(500);
        logger.error("Encountered an error when deassigning driver for the cab " + req.body.email, { error: err, fileName: CURRENT_FILE });
    }
}

module.exports = {
    checkCabAssigned, assignCab, getAssignedCab, deassignCab,
    checkDriverAssigned, getAssignedDriver, assignDriver
}