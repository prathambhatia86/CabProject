const mongoose = require('mongoose');
const logger = require('../logger');
const mongoURI = 'mongodb://127.0.0.1:27017/CabManager';
const connectToMongo = async () => {
    mongoose.connect(mongoURI).then(() => {
        logger.info('Connected to mongoose Success');
    }).catch(err => {
        logger.error("Connection to mongodb failed with error code: " + err.code);
    })
}
module.exports = connectToMongo;