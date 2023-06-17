const Cab_collection = require('../models/cabs.model');

const addCab = async (req, res) => {
    //Insert the new Cab into the database.
    await Cab_collection.insertMany(req.body);
    res.send(true);
}

module.exports = {
    addCab
}