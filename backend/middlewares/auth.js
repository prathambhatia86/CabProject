const jwt = require('jsonwebtoken');
const logger = require('../logger');
const CURRENT_FILE = 'auth.js';

module.exports = function (req, res, next) {
    // Get token from header
    const token = req.header('x-auth-token');
    // Check if no token
    if (!token) {
        return res.status(401).json({ message: 'No token, authorization denied' });
    }
    // Verify token
    try {
        jwt.verify(token, process.env.JWT_SECRET, (error, decoded) => {
            if (error) {
                return res.status(401).json({ msg: 'Token is not valid' });
            } else {
                req.userFromToken = decoded.TokenContent;
                next();
            }
        });
    } catch (err) {
        logger.error('something wrong with auth middleware', { fileName: CURRENT_FILE });
        res.status(500).json({ msg: 'Server Error' });
    }
};