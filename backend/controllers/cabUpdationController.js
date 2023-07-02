const logger = require('../logger');
const Assignment_collection = require('../models/assignment.model');
const cabCollection = require('../models/cabs.model');
const CURRENT_FILE = 'cabUpdationController.js'


const getNames = async (req, res) => {
    if (!req.userFromToken || !req.userFromToken.isAuth || req.userFromToken.email != 'ADMIN') {
        res.status(401).json({ message: "User Not authorised" });
    }
    try {
        //Fetch all documents from the database
        let data = await cabCollection.find({}).select('registration_no insurance pollution').exec();
        data = (data.filter((elem) => {
            return elem.insurance && elem.pollution;
        }));
        res.json(data);
    } catch (err) {
        res.status(500);
        logger.error("Encountered an error when retrieving all cab names", { error: err, fileName: CURRENT_FILE });
    }
}

const getCabDataWithoutImages = async (req, res) => {
    if (!req.userFromToken || !req.userFromToken.isAuth || req.userFromToken.email != 'ADMIN') {
        res.status(401).json({ message: "User Not authorised" });
    }
    try {
        //Fetch all documents from the database
        const data = await cabCollection.find({}, { image: 0 });
        res.json(data);
    } catch (err) {
        res.status(500);
        logger.error("Encountered an error when retrieving all cab names", { error: err, fileName: CURRENT_FILE });
    }
}
const cabImage = async (req, res) => {
    const filter = { _id: req.body.id };
    if (!req.userFromToken || !req.userFromToken.isAuth || req.userFromToken.email != 'ADMIN') {
        res.status(401).json({ message: "User Not authorised" });
    }
    try {
        //Fetch all documents from the database
        const data = await cabCollection.find(filter, { image: 1 });
        res.json(data);
    } catch (err) {
        res.status(500);
        logger.error("Encountered an error when retrieving all cab names", { error: err, fileName: CURRENT_FILE });
    }
}
const getNonAssignedNames = async (req, res) => {
    if (!req.userFromToken || !req.userFromToken.isAuth || req.userFromToken.email != 'ADMIN') {
        res.status(401).json({ message: "User Not authorised" });
    }
    try {
        //Fetch all documents from the database
        const assigned = (await Assignment_collection.find({})).map(a => { return a.registration_no });
        let data = await cabCollection.find({ registration_no: { $nin: assigned } }).select('registration_no insurance pollution').exec();
        data = data.filter((elem) => {
            return elem.insurance && elem.pollution;
        });
        res.json(data);
    } catch (err) {
        res.status(500);
        logger.error("Encountered an error when retrieving all non-assigned cab names", { error: err, fileName: CURRENT_FILE });
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
        res.status(500);
        logger.error("Encountered an error when retrieving the cab " + req.body.registration_no, { error: err, fileName: CURRENT_FILE });
    }
}
const updateCab = async (req, res) => {
    if (!req.userFromToken || !req.userFromToken.isAuth || (req.userFromToken.email != 'ADMIN')) {
        res.status(401).json({ message: "User Not authorised" });
        return;
    }
    const filter = { _id: req.body.id };
    const update = { $set: req.body };
    try {
        const response = await cabCollection.updateOne(filter, update);
        res.send(response);
    }
    catch
    (err) {
        res.status(500);
        logger.error("Encountered an error when updating the cab ", { error: err, fileName: CURRENT_FILE });
    }


}
const deleteCab = async (req, res) => {
    if (!req.userFromToken || !req.userFromToken.isAuth || (req.userFromToken.email != 'ADMIN')) {
        res.status(401).json({ message: "User Not authorised" });
    }
    try {

        const filter = { _id: req.body.id };
        data = await cabCollection.deleteOne(filter);
        //If the document was deleted send back status OK else if no deletion occured send no resource found
        res.status(data ? 200 : 404).json({
            message: data.deletedCount ? "User deleted" : "User Not found",
        });
    } catch (e) {
        //Log the error
        logger.error('Deleting cab ' + ' failed due to error', { error: e, fileName: CURRENT_FILE });
        //Send internal server error code  and message in case of any error.
        res.status(500).json({
            result: e.toString(),
        });
    }
}
const cabDataForDeletion = async (req, res) => {
    if (!req.userFromToken || !req.userFromToken.isAuth || req.userFromToken.email != 'ADMIN') {
        res.status(401).json({ message: "User Not authorised" });
    }
    try {
        //Fetch all documents from the database
        const data = await cabCollection.find({}, { image: 0, insurance: 0, pollution: 0 });
        res.json(data);
    } catch (err) {
        res.status(500);
        logger.error("Encountered an error when retrieving all cab names", { error: err, fileName: CURRENT_FILE });
    }
}
module.exports = {
    getNames,
    getNonAssignedNames,
    getCab,
    getCabDataWithoutImages,
    updateCab,
    deleteCab,
    cabDataForDeletion,
    cabImage
}
