import { MongoTransferer, MongoDBDuplexConnector, LocalFileSystemDuplexConnector } from 'mongodb-snapshot';

async function restoreLocalfile2Mongo() {
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
        source: localfile_connector,
        targets: [mongo_connector],
    });

    for await (const { total, write } of transferer) {
        console.log(`remaining bytes to write: ${total - write}`);
    }
}