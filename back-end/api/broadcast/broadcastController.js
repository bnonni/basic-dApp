const broadcastService = require('./broadcastService');

const broadcaster = async (req, res) => {
  try {
    const stringData = req.body.stringData
    const mutationType = req.body.mutationType;
    const response = await broadcastService.broadcastString(stringData, mutationType);
    console.log(`Response: ${JSON.stringify(response)}`);
    if (!response.success) {
      res.status(500).json(response);
    } else {
      res.status(200).json(response);
    }
  } catch (error) {
    console.log(error.stack);
    res.status(500).json({message: error.message, error: error.stack});
  }
};

module.exports = {
  broadcaster
};