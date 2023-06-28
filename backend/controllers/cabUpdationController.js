const logger = require('../logger');
const Assignment_collection = require('../models/assignment.model');
const cabCollection = require('../models/cabs.model');
const getNames = async (req, res) => {
    if (!req.userFromToken || !req.userFromToken.isAuth || req.userFromToken.email != 'ADMIN') {
        res.status(401).json({ message: "User Not authorised" });
    }
    try {
        //Fetch all documents from the database
        const data = await cabCollection.find({}).select('registration_no').exec();
        res.json(data);
    } catch (err) {
        logger.error('Error when getting Names for All cabs', { error: err });
    }
}

const getNonAssignedNames = async (req, res) => {
    if (!req.userFromToken || !req.userFromToken.isAuth || req.userFromToken.email != 'ADMIN') {
        res.status(401).json({ message: "User Not authorised" });
    }
    try {
        //Fetch all documents from the database
        const assigned = (await Assignment_collection.find({})).map(a => { return a.registration_no });
        const data = await cabCollection.find({ registration_no: { $nin: assigned } });
        res.json(data);
    } catch (err) {
        logger.error('Error when getting Names for All cabs', { error: err });
    }
}

const getCab = async (req, res) => {
    if (!req.userFromToken || !req.userFromToken.isAuth || req.userFromToken.email != 'ADMIN') {
        res.status(401).json({ message: "User Not authorised" });
    }
    try {
        //Fetch all documents from the database
        const data = await cabCollection.findOne({ registration_no: req.body.registration_no });
        res.json(data);
    } catch (err) {
        logger.error('Error when getting Names for All cabs', { error: err });
    }
}

module.exports = {
    getNames,
    getNonAssignedNames,
    getCab
}
