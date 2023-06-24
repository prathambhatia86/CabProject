const logger = require('../logger')
const Assignment_collection = require('../models/assignment.model');
const Cab_collection = require('../models/cabs.model');

const checkCabAssigned = async (req, res) => {
    if (!req.userFromToken || !req.userFromToken.isAuth || req.userFromToken.email != 'ADMIN') {
        res.send(401).json({ message: "User Not authorised" });
    }
    try {
        let check = await Assignment_collection.findOne({ email: req.body.email });
        if (check == null)
            res.send(false);
        else
            res.send(true);
    } catch (err) {
        logger.error("When checking for cab Assignment ", { error: err });
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
        logger.error("When checking for cab Assignment ", { error: err });
    }

}

const getAssignedCab = async (req, res) => {
    if (!req.userFromToken || !req.userFromToken.isAuth || req.userFromToken.email != 'ADMIN') {
        res.send(401).json({ message: "User Not authorised" });
    }
    try {
        let check = await Assignment_collection.findOne({ email: req.body.email });
        let cabAssigned = await Cab_collection.findOne({ registration_no: check.registration_no });
        res.status(200).json(cabAssigned);
    } catch (err) {
        logger.error("When checking for cab Assignment ", { error: err });
    }

}

module.exports = {
    checkCabAssigned, assignCab, getAssignedCab
}