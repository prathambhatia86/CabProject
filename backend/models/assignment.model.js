const Schema = require('mongoose').Schema;
const Assignment_collection = require('mongoose').model("Assignments", new Schema({
    email: {
        type: String, required: true, unique: true
    },
    registration_no: {
        type: String, required: true, unique: true
    }
    , date: {
        type: Date,
        default: Date.now,
        required: true
    }
}));

module.exports = Assignment_collection;