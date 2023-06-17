const Driver_collection = require('../models/drivers.model');

const adminLogin = (req, res) => {
    if (req.body.email === process.env.ADMIN_EMAIL && req.body.password === process.env.ADMIN_PASSWORD) {
        //If Email and Password Match send OK
        res.status(200).json({ isAuth: true });
    } else {
        //Else respond with unauthorized error
        res.status(401).json({ message: "The entered credentials are Invalid!" });
    }
}

const driverLogin = (req, res) => {
    Driver_collection.findOne({ email: req.body.email })
        .then(data => {
            if (!data) {
                //If the user with this email has not been added by the admin
                res.status(401).json({ message: "The user has not been added to the system!" });
                return;
            }
            //Respond with the user data appended with 'isAuth' property set to true
            if (req.body.email === data.email && req.body.password === data.password) {
                res.status(200).json({ user: { ...[data._doc][0], isAuth: true } });
            } else {
                //Respond with unauthorised error if password does not match.
                res.status(401).json({ message: "The entered credentials are Invalid!" });
            }
        })
        .catch(err => console.log(err));
}

module.exports = {
    adminLogin, driverLogin
}