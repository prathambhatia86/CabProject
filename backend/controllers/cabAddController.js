const logger = require('../logger')
const Cab_collection = require('../models/cabs.model');

const addCab = async (req, res) => {
    //Insert the new Cab into the database.
    logger.info('Recieved Cab Add request for cab ' + req.body.registration_no);
    await Cab_collection.insertMany(req.body);
    res.send(true);
}
const checkCabExists = async (req, res) => {
    let check = await Cab_collection.findOne({ registration_no: req.body.registration_no })
    if (check == null)
        res.send(false);
    else
        res.send(true);
}

module.exports = {
    addCab, checkCabExists
}