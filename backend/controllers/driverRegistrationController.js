const driverCollection = require('../models/drivers.model');
const driverRegistration = async (req, res) => {
    await driverCollection.insertMany(req.body);
    res.send(true);
}
const checkLogin = async (req, res) => {
    let check = await driverCollection.findOne({ email: req.body.email })
    if (check == null)
        res.send(false);
    else
        res.send(true);
}
module.exports = {
    driverRegistration,
    checkLogin,

}