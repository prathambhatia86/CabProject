const Schema = require('mongoose').Schema;
const Cab_collection = require('mongoose').model("Cabs", new Schema({
    registration_no: {
        type: String,
        required: true
    },
    model: {
        type: String,
        required: true
    },
    color: {
        type: String,
        required: true
    },
    insurance: {
        policy_number: String,
        company: String,
        expires: Date,
        next_payment: Date,
        amount: Number
    },
    pollution: {
        id: String,
        expires: Date
    },
    odometer: {
        type: Number,
        required: true
    }
}));

module.exports = Cab_collection;