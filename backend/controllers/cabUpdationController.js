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
        const data = await cabCollection.find({}).select('registration_no').exec();
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
        const data = await cabCollection.find({},{image:0});
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
        const data = await cabCollection.find({ registration_no: { $nin: assigned } }).select('registration_no').exec();
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
const updateCab=async(req,res)=>{
    console.log(req.body);
    if (!req.userFromToken || !req.userFromToken.isAuth || (req.userFromToken.email != 'ADMIN' )) {
        res.status(401).json({ message: "User Not authorised" });
        return;
    }
    console.log(req.body);
        const filter = { _id: req.body.id };
        const update = { $set: req.body };
        try
        {
            const response = await cabCollection.updateOne(filter, update);
            res.send(response);
        }
        catch
        (err) {
            res.status(500);
            logger.error("Encountered an error when updating the cab " , { error: err, fileName: CURRENT_FILE });
        }
    

}
module.exports = {
    getNames,
    getNonAssignedNames,
    getCab,
    getCabDataWithoutImages,
    updateCab
}
