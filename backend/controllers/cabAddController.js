const logger = require('../logger')
const Cab_collection = require('../models/cabs.model');

const addCab = async (req, res) => {
    //Insert the new Cab into the database.
    logger.info('Recieved Cab Add request for cab ' + req.body.registration_no);
    if (!req.userFromToken || !req.userFromToken.isAuth || req.userFromToken.email != 'ADMIN') {
        res.send(401).json({ message: "User Not authorised" });
    }
    try {
        await Cab_collection.insertMany(req.body);
        res.send(true);
    } catch (err) {
        res.send(false);
        logger.error('When adding cab an error occured', { error: err });
    }
}
const checkCabExists = async (req, res) => {
    if (!req.userFromToken || !req.userFromToken.isAuth || req.userFromToken.email != 'ADMIN') {
        res.send(401).json({ message: "User Not authorised" });
    }
    try {
        let check = await Cab_collection.findOne({ registration_no: req.body.registration_no })
        if (check == null)
            res.send(false);
        else
            res.send(true);
    } catch (err) {
        logger.error("When checking for duplicacy for cab ", { error: err });
    }

}

module.exports = {
    addCab, checkCabExists
}