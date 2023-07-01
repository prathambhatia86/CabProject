const Driver_collection = require('../models/drivers.model');
const jwt = require('jsonwebtoken');
const logger = require('../logger');
const bcrypt = require('bcrypt');
const mailgen = require('mailgen');
const passwordMaker = require('generate-password');
const nodemailer = require("nodemailer");
const CURRENT_FILE = 'loginController.js';

const adminLogin = async (req, res) => {
    if (req.body.email === process.env.ADMIN_EMAIL && req.body.password === process.env.ADMIN_PASSWORD) {
        //If Email and Password Match send OK along with the jwt token
        const payload = {
            TokenContent: {
                email: "ADMIN",
                isAuth: true
            },
        };
        const token = jwt.sign(
            payload,
            process.env.JWT_SECRET,
            { expiresIn: '7 days' }
        );
        res.status(200).json({ user: { isAuth: true, token: token } });
    } else {
        //Else respond with unauthorized error
        res.status(401).json({ message: "The entered credentials are Invalid!" });
    }
}

const driverLogin = async (req, res) => {
    Driver_collection.findOne({ email: req.body.email })
        .then(async (data) => {
            if (!data) {
                //If the user with this email has not been added by the admin
                res.status(401).json({ message: "The user has not been added to the system!" });
                return;
            }
            const isMatch = await bcrypt.compare(req.body.password, data.password);
            //Respond with the user data appended with 'isAuth' property set to true and a token containing the user email
            if (req.body.email === data.email && isMatch) {
                const payload = {
                    TokenContent: {
                        isAuth: true,
                        email: req.body.email
                    },
                };
                const token = jwt.sign(
                    payload,
                    process.env.JWT_SECRET,
                    { expiresIn: '7 days' }
                );
                res.status(200).json({ user: { ...[data._doc][0], isAuth: true, token: token } });
            } else {
                //Respond with unauthorised error if password does not match.
                res.status(401).json({ message: "The entered credentials are Invalid!" });
            }
        })
        .catch(err => {
            res.status(500);
            logger.error("Encountered an error when driver " + req.body.email + " tried to log in", { error: err, fileName: CURRENT_FILE });
        });
}

const forgotPassword = async (req, res) => {
    try {
        var password = passwordMaker.generate({
            length: 6,
            numbers: true
        });
        let config = {
            service: 'gmail',
            auth: {
                user: '',
                pass: ''
            }
        }
        let transporter = nodemailer.createTransport(config);
        let mail_generator = new mailgen({
            theme: "default",
            product: {
                name: "Mailgen",
                link: 'https://mailgen.js'
            }
        })
        let response = {
            body: {
                intro: "Your password has been reset your new password is: " + password,
            }
        }
        let mail = mail_generator.generate(response);
        let message = {
            from: '',
            to: req.body.email,
            html: mail
        }
        console.log(password);
        transporter.sendMail(message);
        const hashedPasswd = await bcrypt.hash(password, 10);
        let result = await Driver_collection.updateOne({ email: req.body.email }, { $set: { password: hashedPasswd } });
        if (result.modifiedCount) res.send(true);
        else res.send(false);
    } catch (err) {
        logger.error("Error when updating password for driver " + req.body.email, { error: err, fileName: CURRENT_FILE });
    }
}
module.exports = {
    adminLogin, driverLogin, forgotPassword
}