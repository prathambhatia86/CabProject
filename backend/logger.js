const winston = require('winston');
require('winston-daily-rotate-file');
const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, "./config/config.env") });


const normalRotatingLog = new winston.transports.DailyRotateFile({
    filename: 'combined-%DATE%.log',
    datePattern: 'YYYY-MM-DD',
    maxFiles: '14d',
    level: 'info'
});
const errorRotatingLog = new winston.transports.DailyRotateFile({
    filename: 'error-%DATE%.log',
    datePattern: 'YYYY-MM-DD',
    maxFiles: '14d',
    level: 'error'
});
const logger = winston.createLogger({
    level: 'debug',
    format: winston.format.combine(
        winston.format.timestamp(),
        winston.format.json(),
    ),
    transports: [
        process.env.NODE_ENV == 'development' ? new winston.transports.Console({ level: 'debug' }) : normalRotatingLog,
        errorRotatingLog,
    ],
});
module.exports = logger;