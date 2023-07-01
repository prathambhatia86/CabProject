const mongoose = require('mongoose');
const logger = require('../logger');
const mongoURI = 'mongodb://127.0.0.1:27017/CabManager'; //for database on local machine
const atlasURI=`mongodb+srv://cab-api:${process.env.database_password}@cluster0.e2jv8iy.mongodb.net/?retryWrites=true&w=majority`
const connectToMongo = async () => {
    mongoose.connect(atlasURI).then(() => {
        logger.info('Connected to mongoose Success');
     
    }).catch(err => {
        logger.error("Connection to mongodb failed with error code: " + err.code);
    })
}
module.exports = connectToMongo;