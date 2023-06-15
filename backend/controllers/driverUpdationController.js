const driverCollection = require('../models/drivers.model');
const getNames=async(req,res)=>{
   const data= await driverCollection.find({});

    res.json(data);
}
const driverUpdate=async(req,res)=>{
    const filter = { _id: req.body.id };
    console.log(req.body);
const update = { $set: req.body }; 
    await driverCollection.updateOne(filter, update);
}
module.exports={
    getNames,
    driverUpdate
}
