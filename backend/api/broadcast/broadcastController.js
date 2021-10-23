const broadcastService = require('./broadcastService');
const debug = require('../../utils/debug');

const broadcaster = async (req, res) => {
  try {
    const stringData = req.body.stringData
    const mutationType = req.body.mutationType.toLowerCase();
    const response = await broadcastService.broadcastString(stringData, mutationType);
    debug.info(`Response: ${JSON.stringify(response)}`);
    if (!response.success) {
      res.status(500).json(response);
    } else {
      res.status(200).json(response);
    }
  } catch (error) {
    debug.error(error.stack);
    res.status(500).json({message: error.message, error: error.stack});
  }
};

module.exports = {
  broadcaster
};