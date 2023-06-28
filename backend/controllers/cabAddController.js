const logger = require('../logger')
const Cab_collection = require('../models/cabs.model');
const CURRENT_FILE = 'cabAddController.js';

const addCab = async (req, res) => {
    //Insert the new Cab into the database.
    logger.info('Recieved Cab Add request for cab ' + req.body.registration_no);
    if (!req.userFromToken || !req.userFromToken.isAuth || req.userFromToken.email != 'ADMIN') {
        res.status(401).json({ message: "User Not authorised" });
    }
    try {
        await Cab_collection.insertMany(req.body);
        res.send(true);
    } catch (err) {
        res.status(500);
        logger.error("Encountered an error when adding a new cab", { error: err, fileName: CURRENT_FILE });
    }
}
const checkCabExists = async (req, res) => {
    if (!req.userFromToken || !req.userFromToken.isAuth || req.userFromToken.email != 'ADMIN') {
        res.status(401).json({ message: "User Not authorised" });
    }
    try {
        let check = await Cab_collection.findOne({ registration_no: req.body.registration_no })
        if (check == null)
            res.send(false);
        else
            res.send(true);
    } catch (err) {
        res.status(500);
        logger.error("Encountered an error when checking existence of cab " + req.body.registration_no, { error: err, fileName: CURRENT_FILE });
    }
}

module.exports = {
    addCab, checkCabExists
}