const mongoose = require('mongoose');

const mongoURI = 'mongodb://127.0.0.1:27017/CabManager';
const connectToMongo = () => {
    mongoose.connect(mongoURI).then(() => {
        console.log('Connected to mongoose Success');
    }).catch(err => {
        console.log("Connection to mongodb failed with error code: " + err.code);
    })
}
module.exports = connectToMongo;