const logger = require('../logger')
const Assignment_collection = require('../models/assignment.model');
const Cab_collection = require('../models/cabs.model');

const checkCabAssigned = async (req, res) => {
    if (!req.userFromToken || !req.userFromToken.isAuth || req.userFromToken.email != 'ADMIN') {
        res.send(401).json({ message: "User Not authorised" });
    }
    try {
        let check = await Assignment_collection.findOne({ email: req.body.email });
        if (check)
            res.send(true);
        else
            res.send(false);
    } catch (err) {
        logger.error("When checking for assigned cab ", { error: err });
    }

}

const assignCab = async (req, res) => {
    if (!req.userFromToken || !req.userFromToken.isAuth || req.userFromToken.email != 'ADMIN') {
        res.send(401).json({ message: "User Not authorised" });
    }
    try {
        let deletePrevious = await Assignment_collection.deleteOne({ email: req.body.email });
        let check = await Assignment_collection.insertMany({ email: req.body.email, registration_no: req.body.registration_no });
        if (check == null)
            res.send(false);
        else
            res.send(true);
    } catch (err) {
        logger.error("When assigning a cab ", { error: err });
    }

}

const getAssignedCab = async (req, res) => {
    if (!req.userFromToken || !req.userFromToken.isAuth || req.userFromToken.email != 'ADMIN') {
        res.send(401).json({ message: "User Not authorised" });
    }
    try {
        let check = await Assignment_collection.findOne({ email: req.body.email });
        if (check) {
            let cabAssigned = await Cab_collection.findOne({ registration_no: check.registration_no });
            res.status(200).json(cabAssigned);
            return;
        }
        res.status(401).json({ message: "No cab assigned" });
        return;
    } catch (err) {
        logger.error("When retrieving an assigned cab ", { error: err });
    }
}
const deassignCab = async (req, res) => {
    if (!req.userFromToken || !req.userFromToken.isAuth || req.userFromToken.email != 'ADMIN') {
        res.send(401).json({ message: "User Not authorised" });
    }
    try {
        let check = await Assignment_collection.deleteOne({ email: req.body.email, registration_no: req.body.registration_no });
        if (check) res.send(true);
        else res.send(false);
    } catch (err) {
        logger.error("When deassigning a cab ", { error: err });
    }

}

module.exports = {
    checkCabAssigned, assignCab, getAssignedCab, deassignCab
}