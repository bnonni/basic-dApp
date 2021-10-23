const debug = require('../utils/debug');
const STRING_MUTATIONS_COLLECTION = process.env.STRING_MUTATIONS_COLLECTION
const stringMutations = global.db.collection(STRING_MUTATIONS_COLLECTION)
debug.info(`Connected to collection ${global.DB_NAME}.${STRING_MUTATIONS_COLLECTION}`)
module.exports = { stringMutations };