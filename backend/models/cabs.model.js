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
        type: {
            policy_number: { type: String, required: true },
            company: { type: String, required: true },
            expires: { type: Date, required: true },
            next_payment: { type: Date, required: true },
            amount: { type: Number, required: true },
        },
        required: false
    },
    pollution: {
        type: {
            id: { type: String, required: true },
            expires: { type: Date, required: true },
        }, required: false
    },
    odometer: {
        type: Number,
        required: true
    }, image: {
        type: String,
        required: true
    }
}));

module.exports = Cab_collection;