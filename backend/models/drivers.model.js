const Schema = require('mongoose').Schema;
const Driver_collection = require('mongoose').model("Drivers", new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    }, 
    password: {
        type: String,
        required: true
    }, 
    contact: {
        type: Number,
        required: true
    }
}));

module.exports = Driver_collection;