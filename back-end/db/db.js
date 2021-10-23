const { MongoClient } = require('mongodb');
const client = new MongoClient(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });
const initMongo = async () => {
    await client.connect();
    global.db = client.db('decentLabs');
    global.DB_NAME = global.db.s.namespace.db;
    return global.db.s.namespace.db;
}

module.exports = { initMongo }