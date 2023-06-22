const winston = require('winston');
const logger = winston.createLogger({
    level: 'debug',
    format: winston.format.combine(
        winston.format.timestamp(),
        winston.format.json()
    ),
    transports: [
        new winston.transports.Console({ level: 'debug' }),
        new winston.transports.File({ filename: 'combined.log', level: 'info' }),
        new winston.transports.File({ filename: 'onlyError.log', level: 'error' })
    ],
});
module.exports = logger;