const driverCollection = require('../models/drivers.model');
const getNames = async (req, res) => {
    //Fetch all documents from the database
    const data = await driverCollection.find({});
    res.json(data);
}

const driverUpdate = async (req, res) => {
    //Select document with specific id, update it to details recieved in the request.
    const filter = { _id: req.body.id };
    const update = { $set: req.body };
    await driverCollection.updateOne(filter, update);
}

const deleteDriver = async (req, res) => {
    try {
        //Select document with specific id, delete it from the database
        const filter = { _id: req.body.id };
        console.log(await driverCollection.findOne(filter));
        console.log(filter);
        const data = await driverCollection.deleteOne(filter);

        //If the document was deleted send back status OK else if no deletion occured send no resource found
        res.status(data ? 200 : 404).json({
            result: data,
            message: 'User deleted',
        });
    } catch (e) {
        //Send internal server error code  and message in case of any error.
        res.status(500).json({
            result: e.toString(),
        });
    }
}
module.exports = {
    getNames,
    driverUpdate,
    deleteDriver
}
