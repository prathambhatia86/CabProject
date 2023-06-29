const snapShot = require('mongodb-snapshot');
const MongoTransferer = snapShot.MongoTransferer, MongoDBDuplexConnector = snapShot.MongoDBDuplexConnector, LocalFileSystemDuplexConnector = snapShot.LocalFileSystemDuplexConnector
const logger = require('./logger');

async function dumpMongo2Localfile() {
    const mongo_connector = new MongoDBDuplexConnector({
        connection: {
            uri: `mongodb://127.0.0.1:27017/`,
            dbname: 'CabManager',
        },
    });

    const localfile_connector = new LocalFileSystemDuplexConnector({
        connection: {
            path: './backups/backup.tar',
        },
    });

    const transferer = new MongoTransferer({
        source: mongo_connector,
        targets: [localfile_connector],
    });

    logger.info("Starting backup Now");
}

module.exports = dumpMongo2Localfile;