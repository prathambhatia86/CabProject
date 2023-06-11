const driverCollection = require('../models/drivers.model');
const driverRegistration=async(req,res)=>{
    await driverCollection.insertMany(req.body);
}
module.exports={
    driverRegistration,
}